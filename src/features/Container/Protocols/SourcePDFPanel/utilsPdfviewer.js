export const panelHandle = (e, changeScale) => {
  const { className } = e.target;
  if (
    className.toString().includes('Panel-handle') ||
    className.toString().includes('Panel-handleContainer')
  )
    document.addEventListener('mousemove', changeScale, false);
};

export const abc = () => {
  console.log('abc function');
};
