import { Block } from '../core/Block';

export function render(query: string, block: Block) {
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
