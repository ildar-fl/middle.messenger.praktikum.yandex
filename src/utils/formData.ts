export function prepareForm(
  form: HTMLFormElement,
): Record<string, FormDataEntryValue> {
  if (!form) return {};

  return Object.fromEntries(new FormData(form).entries());
}
