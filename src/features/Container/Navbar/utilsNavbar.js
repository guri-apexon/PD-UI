// eslint-disable-next-line import/prefer-default-export
export const createFullMarkupFun = (str, replaceall, redaction) => {
  if (str) {
    return {
      __html: replaceall(
        redaction.text,
        `<span class="blur">${redaction.text}</span>`,
        str,
      ),
    };
  }
  return {
    __html: str,
  };
};
