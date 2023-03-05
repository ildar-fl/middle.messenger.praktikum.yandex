const enum ValidateMethod {
  Required = 'required',
  Email = 'email',
  CapitalSymbol = 'capitalSymbol',
  ContainDigit = 'containDigit',
  Min = 'min',
  Max = 'max',
  Login = 'login',
  NotOnlyNumerals = 'notOnlyNumerals',
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
      const emailRegExp = /^\S+@\S+\.\S+$/g;
      statusValidate = !emailRegExp.test(data);
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
    (
      Object.entries(config[fieldName]) as [ValidateMethod, SubConfigType][]
    ).forEach(([validateMethod, configForField]) => {
      const error = validate(validateMethod, value, configForField);
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    });
  });

  return errors;
}

type CheckInputType = (event: Event) => void;
type CheckDataType = (values: Record<string, FormDataEntryValue>) => void;
interface IValidatorReturnProps {
  checkInput: CheckInputType;
  checkData: CheckDataType;
}

interface IValidatorProps {
  init: (props: IValidatorReturnProps) => void;
  inputs: Record<string, (value: string) => void>;
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
  };

  const checkInput = (event: Event) => {
    const target = event.target as HTMLInputElement;

    setErrors({ [target.name]: target.value });
  };

  init({ checkInput, checkData: setErrors });

  return { checkInput, checkData: setErrors };
}

export { useValidator, validator, ValidateMethod, ConfigType };
