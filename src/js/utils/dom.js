export const createElement = (tagName, options = {}, ...children) => {
  const { className = "", text, attrs = {} } = options ?? {};
  const element = document.createElement(tagName);

  if (className) element.className = className;
  if (text !== null && text !== undefined) element.textContent = text;

  for (const [name, value] of Object.entries(attrs ?? {})) {
    if (value !== null && value !== undefined) {
      element.setAttribute(name, value);
    }
  }

  const validChildren = children
    .flat(Infinity)
    .filter((child) => child !== null && child !== undefined);

  element.append(...validChildren);

  return element;
};
