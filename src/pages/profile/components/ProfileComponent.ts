import { BaseProps, Block } from '../../../core';

interface IUserInfo {
  key: string;
  value: string;
  inputName: string;
  type: string;
}

type ProfileProps = {
  name?: string;
  userInfo?: Array<IUserInfo>;
  changeProfileButton: Block;
  changePasswordButton: Block;
  logoutButton: Block;
} & BaseProps;

class ProfileComponent extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    super('section', { ...props, attrs: { ...props.attrs, class: 'profile' } });
  }

  render(): DocumentFragment {
    return this.compile(
      `
    <header class="profile-header">
            <div class="profile-header__avatar"></div>
            <h2>{{name}}</h2>
        </header>
        <dl>
            {{#each userInfo}}
                <div class="user-info__container">
                    <dt>{{key}}</dt>
                    <dd>{{value}}</dd>
                </div>
            {{/each}}
        </dl>
        {{{changeProfileButton}}}
        {{{changePasswordButton}}}
        {{{logoutButton}}}
    `,
      this.props,
    );
  }
}

export { ProfileComponent };
