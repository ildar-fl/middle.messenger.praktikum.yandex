import { Block } from './Block';

export function getRoot(query: string): Element | never {
  const root = document.querySelector(query);

  if (!root) {
    throw new Error(`ROOT ${query} not found!`);
  }

  return root;
}

export function renderByNode(root: Element, block: Block): Element {
  const content = block.getContent();

  if (content) {
    root.appendChild(content);
    block.dispatchComponentDidMount();
  }

  return root;
}

export function render(query: string, block: Block): Element | never {
  const root = getRoot(query);

  return renderByNode(root, block);
}
