export const getInputValue = (id: string) => {
  if (!window?.document) throw new Error('Client-side *only* function, shoo.');
  return (window.document.getElementById(id) as HTMLInputElement)?.value;
};
