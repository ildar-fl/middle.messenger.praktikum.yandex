import { BaseProps, Block } from '../../core';
import { CenteredPage } from '../../layouts';
import { Button, Input } from '../../ui';
import {
  ConfigType,
  INPUT_CONFIGS,
  prepareForm,
  useValidator,
} from '../../utils';
import { ProfileContainer, ProfileInput } from './components';

const EDIT_PROFILE_CONFIG: ConfigType = {
  login: INPUT_CONFIGS.login,
  email: INPUT_CONFIGS.email,
  first_name: INPUT_CONFIGS.name,
  second_name: INPUT_CONFIGS.name,
  phone: INPUT_CONFIGS.phone,
};

type EditProfileProps = {
  avatarInput: Block;
  saveProfileButton: Block;
  inputs: Block[];
} & BaseProps;

class EditProfileComponent extends Block<EditProfileProps> {
  constructor(props: EditProfileProps) {
    super('form', {
      ...props,
      attrs: { ...props.attrs, name: 'editProfileForm', class: 'profile' },
    });
  }

  render(): DocumentFragment {
    return this.compile(
      `
        <header class="profile-header">
            {{{avatarInput}}}
        </header>
        <dl>
          {{#each inputs}}
            {{{this}}}
          {{/each}}
        </dl>
        {{{saveProfileButton}}}
    `,
      this.props,
    );
  }
}

class EditProfile extends CenteredPage {
  constructor() {
    const avatarInput = new Input({
      attrs: {
        name: 'avatar',
        type: 'file',
        accept: 'image/*',
        class: 'profile-header__avatar',
      },
    });

    const emailInput = new ProfileInput({
      label: 'Почта',
      name: 'email',
      type: 'email',
      value: 'ildaryxa@gmail.com',
    });

    const nameInput = new ProfileInput({
      name: 'first_name',
      type: 'text',
      value: 'Ильдар',
      label: 'Имя',
    });

    const secondInput = new ProfileInput({
      name: 'second_name',
      type: 'text',
      value: 'Фасхетдинов',
      label: 'Фамилия',
    });

    const loginInput = new ProfileInput({
      label: 'Логин',
      name: 'login',
      type: 'text',
      value: 'ildaryxa',
    });

    const displayInput = new ProfileInput({
      label: 'Имя в чате',
      name: 'display_name',
      type: 'text',
      value: 'Ильдар',
    });

    const phoneInput = new ProfileInput({
      label: 'Телефон',
      name: 'phone',
      type: 'phone',
      value: '+79124897471',
    });

    const saveProfileButton = new Button({
      text: 'Сохранить',
      attrs: {
        type: 'submit',
        style: { width: '280px' },
        class: ['m__l-auto', 'm__r-auto'],
      },
    });

    const { checkData } = useValidator(EDIT_PROFILE_CONFIG, {
      init: ({ checkInput }) => {
        const eventsObject = {
          events: { blur: checkInput, focus: checkInput },
        };
        loginInput.input.setProps(eventsObject);
        emailInput.input.setProps(eventsObject);
        nameInput.input.setProps(eventsObject);
        secondInput.input.setProps(eventsObject);
        phoneInput.input.setProps(eventsObject);
      },
      inputs: {
        login: errorMessage => {
          loginInput.setProps({
            error: errorMessage,
          });
        },
        email: errorMessage => {
          emailInput.setProps({
            error: errorMessage,
          });
        },
        first_name: errorMessage => {
          nameInput.setProps({
            error: errorMessage,
          });
        },
        second_name: errorMessage => {
          secondInput.setProps({
            error: errorMessage,
          });
        },
        phone: errorMessage => {
          phoneInput.setProps({
            error: errorMessage,
          });
        },
      },
    });

    const handleSubmitEditProfile = (event: SubmitEvent) => {
      event.preventDefault();
      const formData = prepareForm(event.target as HTMLFormElement);
      checkData(formData);
    };

    const editProfile = new EditProfileComponent({
      avatarInput,
      saveProfileButton,
      inputs: [
        emailInput,
        nameInput,
        secondInput,
        loginInput,
        displayInput,
        phoneInput,
      ],
      events: {
        submit: handleSubmitEditProfile,
      },
    });

    const profileContainer = new ProfileContainer({
      content: editProfile,
    });

    super({
      content: profileContainer,
    });
  }
}

export { EditProfile };
