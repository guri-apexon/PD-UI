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

export const currentPageFun = (refs, currentPage) => {
  if (refs[currentPage]?.current) {
    refs[currentPage]?.current?.scrollIntoView({ behavior: 'instant' });
  }
  setTimeout(() => {
    if (document.getElementById('pdfDocument')) {
      document.getElementById('pdfDocument').scrollTop = 0;
    }
  }, 100);
};
