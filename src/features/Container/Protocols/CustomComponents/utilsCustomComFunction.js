// eslint-disable-next-line import/prefer-default-export
export const contentFun = (setImg, content, setIsEdit) => {
  setImg(content);
  if (content !== '') {
    setIsEdit(false);
  }
};

export const valueFun = (value, getBase64image) => {
  if (value.length > 0) {
    getBase64image(value[0]);
  }
};
