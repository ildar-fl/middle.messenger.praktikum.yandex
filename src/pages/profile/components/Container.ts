import { Block } from '../../../core';
import { ROUTS } from '../../../common/constants';

type ProfileContainerProps = {
  content: Block;
};

class ProfileContainer extends Block<ProfileContainerProps> {
  constructor(props: ProfileContainerProps) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(
      `
    <a class="profile-page__back-button" href="${ROUTS.CHATS}">Назад</a>
    <section class="profile-page__user">
        {{{content}}}
    </section>
    `,
      this.props,
    );
  }
}

export { ProfileContainer };
