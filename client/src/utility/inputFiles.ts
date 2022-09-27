export const inputFiles = (onInput: (files: FileList) => unknown) => {
  const input = document.createElement('input');
  input.type = 'file';

  input.addEventListener('change', async (e) => {
    const target = e.target as HTMLInputElement | null;
    if (target === null || target.files === null) return;
    const files = target.files;

    onInput(files);
  });

  input.click();
  return input;
};
