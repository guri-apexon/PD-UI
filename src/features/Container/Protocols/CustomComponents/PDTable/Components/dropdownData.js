export const tableOperations = {
  addRowAbove: 'ADD_ROW_ABOVE',
  addRowBelow: 'ADD_ROW_BELOW',
  addColumnRight: 'ADD_COLUMN_RIGHT',
  addColumnLeft: 'ADD_COLUMN_LEFT',
  deleteRow: 'DELETE_ROW',
  deleteColumn: 'DELETE_COLUMN',
  swapRow: 'SWAP_ROW',
  swapColumn: 'SWAP_COLUMN',
};
export const columnHoverData = [
  {
    text: 'Add Column to left',
    image: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                                <path
                                  transform="matrix(0 1 1 0 2.514 2.046)"
                                  d="M8.728-.038l.01.012 2.52 3.503a.895.895 0 01.169.568v.067a.894.894 0 01-.249.632l-.01.012-3.064 3.093a.9.9 0 01-1.29-1.254l.011-.012 1.877-1.896c-1.824-.204-3.232.063-4.242.767-1.279.892-2.035 2.571-2.222 5.112a.901.901 0 01-1.796-.132C.666 7.399 1.647 5.222 3.43 3.978c1.342-.936 3.072-1.296 5.173-1.11L7.276 1.027A.9.9 0 018.719-.05l.01.012z"
                                ></path>
                              </svg>`,
    id: tableOperations.addColumnLeft,
  },
  {
    text: 'Add Column to Right',
    image: `<svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                              >
                                <path
                                  fill="#1D202B"
                                  d="M13.552 10.774l-.012.01-3.503 2.52a.895.895 0 01-.568.169h-.067a.894.894 0 01-.632-.249l-.012-.01-3.093-3.064a.9.9 0 011.254-1.29l.012.011 1.896 1.877c.204-1.824-.063-3.232-.767-4.242-.892-1.279-2.571-2.035-5.112-2.222a.901.901 0 01.132-1.796c3.035.224 5.212 1.205 6.456 2.988.936 1.342 1.296 3.072 1.11 5.173l1.841-1.327a.9.9 0 011.077 1.443l-.012.01z"
                                ></path>
                              </svg>`,
    id: tableOperations.addColumnRight,
  },
  {
    text: 'Delete Column',
    image: `<svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                              >
                                <path d="M12.277 3.763a.9.9 0 010 1.273L9.293 8.018l2.984 2.986a.9.9 0 01-1.273 1.272L8.02 9.291l-2.984 2.985a.9.9 0 01-1.273-1.272l2.984-2.986-2.984-2.982a.9.9 0 011.273-1.273L8.02 6.745l2.984-2.982a.9.9 0 011.273 0z"></path>
                              </svg>`,
    id: tableOperations.deleteColumn,
  },
];

export const rowHoverData = [
  {
    text: 'Add row above',
    image: `<svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                          >
                            <path
                              fill="#1D202B"
                              d="M10.808 2.442l.01.012 2.52 3.503a.895.895 0 01.169.568v.067a.894.894 0 01-.249.632l-.01.012-3.064 3.093a.9.9 0 01-1.29-1.254l.011-.012 1.877-1.896c-1.824-.204-3.232.063-4.242.767-1.279.892-2.035 2.571-2.222 5.112a.901.901 0 01-1.796-.132c.224-3.035 1.205-5.212 2.988-6.456 1.342-.936 3.072-1.296 5.173-1.11L9.356 3.507a.9.9 0 011.443-1.076l.01.012z"
                            ></path>
                          </svg>`,
    id: tableOperations.addRowAbove,
  },
  {
    text: 'Add row below',
    image: `<svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                          >
                            <path
                              fill="#1D202B"
                              d="M10.808 13.518l.01-.012 2.52-3.503a.895.895 0 00.169-.568v-.067a.894.894 0 00-.249-.632l-.01-.012-3.064-3.093a.9.9 0 00-1.29 1.254l.011.012 1.877 1.896c-1.824.204-3.232-.063-4.242-.767-1.279-.892-2.035-2.571-2.222-5.112a.901.901 0 00-1.796.132c.224 3.035 1.205 5.212 2.988 6.456 1.342.936 3.072 1.296 5.173 1.11l-1.327 1.841a.9.9 0 001.443 1.076l.01-.012z"
                            ></path>
                          </svg>`,
    id: tableOperations.addRowBelow,
  },
  {
    text: 'Delete row',
    image: `<svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                          >
                            <path d="M12.277 3.763a.9.9 0 010 1.273L9.293 8.018l2.984 2.986a.9.9 0 01-1.273 1.272L8.02 9.291l-2.984 2.985a.9.9 0 01-1.273-1.272l2.984-2.986-2.984-2.982a.9.9 0 011.273-1.273L8.02 6.745l2.984-2.982a.9.9 0 011.273 0z"></path>
                          </svg>`,
    id: tableOperations.deleteRow,
  },
];
