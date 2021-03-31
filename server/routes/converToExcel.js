const ExcelJS = require("exceljs");
const {
  headerStyle,
  topHeaderStyle,
  topHeaderTextStyle,
  textColors,
} = require("../constants/excelStyleConst");
const {
  compareColorCode,
  codeMeanings,
  colunmHeder,
  textType,
} = require("../constants/excelConst");

module.exports = function (app) {
  app.all("/create-excel", (req, res) => {
    console.log(req.body);

    const reqBody = req.body;
    const compareData = reqBody.iqvdata;

    //------------------------------------- Excel Create --------------------------------------
    const workbook = new ExcelJS.Workbook();

    const sheet = workbook.addWorksheet("New Test Sheet", {
      views: [{ showGridLines: false, state: "frozen", xSplit: 1, ySplit: 1 }],
    });
    sheet.columns = [
      { header: reqBody.protocolNumber, key: "1", width: 70 },
      { header: "", key: "2", width: 10 },
      { header: reqBody.protocolNumber2, key: "3", width: 70 },
    ];

    //---------------------------------- Add Data to excel ----------------------------------
    compareData.data.map((item) => {
      const itemTextType = item[2];
      const diff = item[3];

      const columnText1 = item[4];
      const columnText2 = item[5];

      const diffArray = item[6];
      //------------------------------ Header Style Handled -----------------------------
      if (itemTextType === textType.header) {
        if (diff === 2 || diff === 3) {
          sheet.addRow("", "", "");
          sheet
            .addRow([columnText1.toUpperCase(), "", columnText2.toUpperCase()])
            .eachCell((cell, i) => {
              cell.fill = headerStyle;
              if (i === 3) {
                cell.font = {
                  color: { argb: textColors.updated },
                };
              }
            });
          sheet.addRow("", "", "");
        } else if (diff === 1) {
          sheet.addRow("", "", "");
          sheet
            .addRow([columnText1.toUpperCase(), "", columnText2.toUpperCase()])
            .eachCell((cell, i) => {
              cell.fill = headerStyle;
              if (i === 1) {
                cell.font = {
                  color: { argb: textColors.deleted },
                };
              }
            });
          sheet.addRow("", "", "");
        } else {
          sheet.addRow("", "", "");
          sheet
            .addRow([columnText1.toUpperCase(), "", columnText2.toUpperCase()])
            .eachCell((cell, i) => {
              cell.fill = headerStyle;
            });
          sheet.addRow("", "", "");
        }

        //---------------------------------- All Text Style ----------------------------------
      } else if (itemTextType === textType.text) {
        console.log("----------------------------------------------");
        if (diff === 2) {
          sheet.addRow([columnText1, "", columnText2]).eachCell((cell, i) => {
            if (i === 3) {
              const arrStr = handleHighlight(item, cell);
              console.log("blue if");
              let richTextArr = [];
              for (let a = 0; a < arrStr.length; a++) {
                if (a === 0 || a % 2 === 0) {
                  console.log("even");
                  if (arrStr[a]) {
                    let obj = {
                      font: {
                        color: { argb: textColors.primary },
                      },
                      text: arrStr[a],
                    };
                    richTextArr.push(obj);
                  }
                } else if (a % 2 !== 0) {
                  if (arrStr[a]) {
                    let obj = {
                      font: {
                        color: { argb: textColors.updated },
                        bold: true,
                      },
                      text: arrStr[a],
                    };
                    richTextArr.push(obj);
                  }
                }
              }
              console.log(JSON.stringify(richTextArr));
              cell.value = {
                richText: richTextArr,
              };
            }
            cell.alignment = {
              wrapText: true,
              vertical: "middle",
              horizontal: "left",
            };
          });
        } else if (diff === 3) {
          sheet.addRow([columnText1, "", columnText2]).eachCell((cell, i) => {
            if (i === 3) {
              cell.font = {
                color: { argb: textColors.updated },
                bold: true,
              };
            }
            cell.alignment = {
              wrapText: true,
              vertical: "middle",
              horizontal: "left",
            };
          });
        } else if (diff === 1) {
          sheet.addRow([columnText1, "", columnText2]).eachCell((cell, i) => {
            if (i === 1) {
              cell.font = {
                color: { argb: textColors.deleted },
                bold: true,
              };
            }
            cell.alignment = {
              wrapText: true,
              vertical: "middle",
              horizontal: "left",
            };
          });
        } else {
          sheet.addRow([columnText1, "", columnText2]).eachCell((cell, i) => {
            cell.alignment = {
              wrapText: true,
              vertical: "middle",
              horizontal: "left",
            };
          });
        }
      }
    });

    sheet.getRow(1).eachCell((cell) => {
      cell.fill = topHeaderStyle;
      cell.font = topHeaderTextStyle;
    });
    let fileName = "FileName.xlsx";
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=" + fileName);

    workbook.xlsx.write(res).then(function () {
      res.end();
    });

    // workbook.xlsx.writeFile("./test.xlsx");
    // res.send("hello");
    // res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    // res.setHeader("Content-Disposition", "attachment; filename=doc.xlsx");
    // res.setHeader("Content-disposition", "attachment; filename=theDocument.txt");
    // res.setHeader("Content-type", "text/plain");
    // res.charset = "UTF-8";
    // res.write("Hello, world");
    // res.end();
  });
};

function handleHighlight(item, cell) {
  var str = item[5];
  let arr = item[6];
  let vv = [].concat(...arr);
  let i = 0;
  let str1 = vv.map((item) => {
    let res = str.slice(i, item);
    i = item;
    return res;
  });
  str1[str1.length] = str.slice(i);
  return str1;
}
