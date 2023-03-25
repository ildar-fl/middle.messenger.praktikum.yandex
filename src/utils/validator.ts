const enum ValidateMethod {
  Required = 'required',
  Email = 'email',
  CapitalSymbol = 'capitalSymbol',
  ContainDigit = 'containDigit',
  Min = 'min',
  Max = 'max',
  Login = 'login',
  NotOnlyNumerals = 'notOnlyNumerals',
  Name = 'name',
  Phone = 'phone',
}

type SubConfigType = {
  value?: number;
  message: string;
};

type ConfigType = Record<string, { [p in ValidateMethod]?: SubConfigType }>;

function validate(
  validateMethod: ValidateMethod,
  data: FormDataEntryValue,
  config: SubConfigType,
) {
  let statusValidate = false;

  if (data instanceof File) {
    return undefined;
  }

  switch (validateMethod) {
    case ValidateMethod.Required: {
      statusValidate = data.trim() === '';
      break;
    }
    case ValidateMethod.Login: {
      const loginRegExp = /[\W-]+/g;
      statusValidate = loginRegExp.test(data);
      break;
    }
    case ValidateMethod.NotOnlyNumerals: {
      const notOnlyNumeralsRegExp = /^[0-9]+$/g;
      statusValidate = notOnlyNumeralsRegExp.test(data);
      break;
    }
    case ValidateMethod.Email: {
      const emailRegExp = /^[\w-]+@[\w-]+\.[\w-]+$/g;
      statusValidate = !emailRegExp.test(data);
      break;
    }
    case ValidateMethod.Name: {
      const nameRegExp = /^[A-ZА-Я][a-zа-я-]*$/g;
      statusValidate = !nameRegExp.test(data);
      break;
    }
    case ValidateMethod.Phone: {
      const phoneRegExp = /^\+?\d+$/g;
      statusValidate = !phoneRegExp.test(data);
      break;
    }
    case ValidateMethod.CapitalSymbol: {
      const capitalRegExp = /[A-Z]+/g;
      statusValidate = !capitalRegExp.test(data);
      break;
    }
    case ValidateMethod.ContainDigit: {
      const digitRegExp = /\d+/g;
      statusValidate = !digitRegExp.test(data);
      break;
    }
    case ValidateMethod.Min: {
      statusValidate = data.length < config.value!;
      break;
    }
    case ValidateMethod.Max: {
      statusValidate = data.length > config.value!;
      break;
    }
    default:
      break;
  }

  if (statusValidate) return config.message;
}

function validator(
  data: Record<string, FormDataEntryValue>,
  config: ConfigType,
) {
  const errors: Record<string, string> = {};

  Object.entries(data).forEach(([fieldName, value]) => {
    const fieldConfig = config[fieldName];

    if (fieldConfig) {
      (
        Object.entries(fieldConfig) as [ValidateMethod, SubConfigType][]
      ).forEach(([validateMethod, configForField]) => {
        const error = validate(validateMethod, value, configForField);
        if (error && !errors[fieldName]) {
          errors[fieldName] = error;
        }
      });
    }
  });

  return errors;
}

type InputsType = Record<string, (value: string) => void>;
type CheckInputType = (event: Event) => void;
type CheckDataType = (
  values: Record<string, FormDataEntryValue>,
) => Record<string, string>;
interface IValidatorReturnProps {
  checkInput: CheckInputType;
  checkData: CheckDataType;
}

interface IValidatorProps {
  init?: (props: IValidatorReturnProps) => void;
  inputs: InputsType;
}

function useValidator(
  config: ConfigType,
  { init, inputs }: IValidatorProps,
): IValidatorReturnProps {
  const setErrors = (values: Record<string, FormDataEntryValue>) => {
    const errors = validator(values, config);

    Object.keys(values).forEach(fieldName => {
      const callback = inputs[fieldName];
      if (callback) {
        callback(errors[fieldName] ?? null);
      }
    });

    return errors;
  };

  const checkInput = (event: Event) => {
    const target = event.target as HTMLInputElement;

    setErrors({ [target.name]: target.value });

    if (event instanceof FocusEvent && event.type === 'focus') {
      target.focus();
    }
  };

  if (init) {
    init({ checkInput, checkData: setErrors });
  }

  return { checkInput, checkData: setErrors };
}

const INPUT_CONFIGS = {
  login: {
    [ValidateMethod.Min]: {
      value: 3,
      message: 'Логин должен состоять минимум из 3х символов',
    },
    [ValidateMethod.Max]: {
      value: 20,
      message: 'Логин не должен состоять больше 20ти символов',
    },
    [ValidateMethod.Login]: {
      message: 'Допустимы латинские символы,цифры, дефис и _',
    },
    [ValidateMethod.NotOnlyNumerals]: {
      message: 'Логин не должен состоять только из цифр',
    },
  },
  password: {
    [ValidateMethod.Min]: {
      value: 8,
      message: 'Пароль должен состоять минимум из 8ми символов',
    },
    [ValidateMethod.Max]: {
      value: 40,
      message: 'Пароль не должен состоять больше 40ка символов',
    },
    [ValidateMethod.CapitalSymbol]: {
      message: 'Пароль должен содержать хотя бы один заглавный символ',
    },
    [ValidateMethod.ContainDigit]: {
      message: 'Пароль должен содержать хотя бы одну цифру',
    },
  },
  email: {
    [ValidateMethod.Email]: {
      message: 'Неправильный формат почты',
    },
  },
  name: {
    [ValidateMethod.Name]: {
      message:
        'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
    },
  },
  phone: {
    [ValidateMethod.Min]: {
      value: 10,
      message: 'Должен состоять минимум из 10ти символов',
    },
    [ValidateMethod.Max]: {
      value: 15,
      message: 'Не должен состоять больше 15ти символов',
    },
    [ValidateMethod.Phone]: {
      message: 'Должен состоять только из цифр, может начинаться с символа +',
    },
  },
};

export {
  useValidator,
  validator,
  INPUT_CONFIGS,
  ValidateMethod,
  ConfigType,
  InputsType,
};
