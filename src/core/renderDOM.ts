import { IBaseProps, Block } from './Block';

export function render<T extends IBaseProps>(query: string, block: Block<T>) {
  const root = document.querySelector(query);

  if (!root) {
    throw new Error(`ROOT ${query} not found!`);
  }

  const content = block.getContent();

  if (content) {
    root.appendChild(content);
    block.dispatchComponentDidMount();
  }

  return root;
}
