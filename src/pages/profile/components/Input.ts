import { BaseProps, Block } from '../../../core';
import { Input } from '../../../ui';

interface IProfileInputProps extends BaseProps {
  label: string;
  name: string;
  value?: string;
  type?: string;
}

type ProfileInputInnerProps = {
  label: string;
  input: Block;
  error?: boolean | string | null;
};

class ProfileInput extends Block<ProfileInputInnerProps> {
  input;

  constructor(props: IProfileInputProps) {
    const { name, type, label, value } = props;

    const input = new Input({
      attrs: {
        name,
        type,
        value,
        class: 'profile-edit-input',
      },
    });

    super('div', {
      label,
      input,
      attrs: { ...props.attrs, class: 'edit_user-info__container' },
    });

    this.input = input;
  }

  setProps(props: Partial<ProfileInputInnerProps>) {
    const { error } = props;

    if (typeof error !== 'undefined') {
      this.input.setProps({
        attrs: { error: !!error },
      });
    }

    super.setProps(props);
  }

  render(): DocumentFragment {
    return this.compile(
      `
      <div class='input-field'>
        <dt>{{label}}</dt>
        <dd>{{{input}}}</dd>
      </div>
      <div class='error-container' title='{{error}}'>{{error}}</div>
    `,
      this.props,
    );
  }
}

export { ProfileInput };
