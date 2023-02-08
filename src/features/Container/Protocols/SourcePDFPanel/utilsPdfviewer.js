export const panelHandle = (e, changeScale) => {
  if (e) {
    const { className } = e.target;
    if (
      className.toString().includes('Panel-handle') ||
      className.toString().includes('Panel-handleContainer')
    )
      document.addEventListener('mousemove', changeScale, false);
  }
};

export const pageFun = (page, setPage) => {
  if (page) {
    setPage(page - 1);
  }
};
