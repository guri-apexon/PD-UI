import React from "react";
import { fireEvent, render } from "../../../../test-utils/test-utils";
import "@testing-library/jest-dom/extend-expect";
import QCProtocolView from "../QCProtocolView/QCProtocolView";

describe("QC Protocol View container component", () => {
  const state = {
    initialState: {
      qc: {
        protocols: [
          {
            protocolTitle: "Title",
            protocol: "12344",
            projectId: "Project1",
            sponsor: "Astella",
            uploadDate: "aa",
            id: 1,
          },
        ],
        tableError: false,
        loader: false,
      },
      protocol: {
        view: {
          iqvdataSoa: [],
          iqvdataSummary: {
            index: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
            columns: ["field_name", "field_value", "field_header"],
            data: [["protocol_name", "", "<b>Protocol Name</b>"]],
          },
          iqvdataToc: {
            data: [],
          },
          loader: false,
          tocSections: [
            {
              section: "section",
              id: "TOC-24",
            },
          ],
          soaSections: [
            {
              section: "Study of Assessments(Schedule of Assessment)",
              id: "SOA-4",
            },
          ],
          download: {
            id: "12222",
            iqvdataToc: "sss",
          },
        },
      },
    },
  };
  test("should render for QC1 send QC2", () => {
    const protocolId = "212121";
    const filePath = "//path";
    const type = "QC1";
    const container = render(
      <QCProtocolView protId={protocolId} path={filePath} userType={type} />,
      state
    );
    //sendQC2-button
    let sendQC2 = container.getByTestId("sendQC2-button");
    fireEvent.click(sendQC2);
  });
  test("should render for QC1 send QC2 with confirm window", () => {
    const protocolId = "212121";
    const filePath = "//path";
    const type = "QC1";
    window.confirm = jest.fn().mockImplementation(() => true);
    const container = render(
      <QCProtocolView protId={protocolId} path={filePath} userType={type} />,
      state
    );
    //sendQC2-button
    let sendQC2 = container.getByTestId("sendQC2-button");
    fireEvent.click(sendQC2);
  });
  test("should render for QC1approve button click without confirm window", () => {
    const protocolId = "212121";
    const filePath = "//path";
    const type = "QC1";
    const container = render(
      <QCProtocolView protId={protocolId} path={filePath} userType={type} />,
      state
    );
    //sendQC2-button
    let approve = container.getByTestId("approve-button");
    fireEvent.click(approve);
  });
  test("should render for QC1 approve with confirm window", () => {
    const protocolId = "212121";
    const filePath = "//path";
    const type = "QC1";
    window.confirm = jest.fn().mockImplementation(() => true);
    const container = render(
      <QCProtocolView protId={protocolId} path={filePath} userType={type} />,
      state
    );
    //sendQC2-button
    let approve = container.getByTestId("approve-button");
    fireEvent.click(approve);
  });
  test("should render for QC2 and Click Reject button with confirm window", () => {
    const protocolId = "212121";
    const filePath = "//path";
    const type = "QC2";
    window.confirm = jest.fn().mockImplementation(() => true);
    const container = render(
      <QCProtocolView protId={protocolId} path={filePath} userType={type} />,
      state
    );
    let rejectButton = container.getByTestId("reject-button");
    fireEvent.click(rejectButton);
  });
  test("should render for QC2 and Click Reject button", () => {
    const protocolId = "212121";
    const filePath = "//path";
    const type = "QC2";

    const container = render(
      <QCProtocolView protId={protocolId} path={filePath} userType={type} />,
      state
    );
    let rejectButton = container.getByTestId("reject-button");
    fireEvent.click(rejectButton);
  });

  test("should render for QC1 and Choos file button", async () => {
    const protocolId = "212121";
    const filePath = "//path";
    const type = "QC1";

    const container = render(
      <QCProtocolView protId={protocolId} path={filePath} userType={type} />,
      state
    );
    const file = new File(["(⌐□_□)"], "chucknorris.json", {
      type: "application/json",
    });
    let chooseFile = container.getByTestId("choose-file-upload");
    let UploadFile = container.getByTestId("upload-file-button");
    await fireEvent.change(chooseFile, { target: { files: [file] } });
    expect(chooseFile.files[0]);
    fireEvent.click(UploadFile);
  });
  test("should render for QC1 and upload without File", async () => {
    const protocolId = "212121";
    const filePath = "//path";
    const type = "QC1";

    const container = render(
      <QCProtocolView protId={protocolId} path={filePath} userType={type} />,
      state
    );
    let UploadFile = container.getByTestId("upload-file-button");
    fireEvent.click(UploadFile);
  });
  test("should render for QC1 and upload without File", async () => {
    const protocolId = "212121";
    const filePath = "//path";
    const type = "QC1";

    const container = render(
      <QCProtocolView protId={protocolId} path={filePath} userType={type} />,
      state
    );
    let downloadButton = container.getByTestId("download-button");
    fireEvent.click(downloadButton);
    let downloadJsonButton = container.getByTestId("download-json-button");
    fireEvent.click(downloadJsonButton);
  });
});
describe("QC Protocol View container component Laoder", () => {
  const state = {
    initialState: {
      protocol: {
        view: {
          iqvdataSoa: [],
          iqvdataSummary: {},
          iqvdataToc: {
            data: [],
          },
          loader: true,
          tocSections: [
            {
              section: "section",
              id: "TOC-24",
            },
          ],
          soaSections: [
            {
              section: "Study of Assessments(Schedule of Assessment)",
              id: "SOA-4",
            },
          ],
        },
      },
    },
  };
  test("should render QC Loader", () => {
    const protocolId = "212121";
    const filePath = "//path";
    const type = "QC1";

    render(
      <QCProtocolView protId={protocolId} path={filePath} userType={type} />,
      state
    );
  });
  test("should render QC", () => {
    const protocolId = "212121";
    const filePath = "//path";
    const type = "QC2";

    render(
      <QCProtocolView protId={protocolId} path={filePath} userType={type} />,
      state
    );
  });
});

describe("QC Protocol View container component Error", () => {
  const state = {
    initialState: {
      protocol: {
        view: {
          iqvdataSoa: [],
          iqvdataSummary: {},
          iqvdataToc: {
            data: [],
          },
          loader: false,
          err: "Error",
        },
      },
    },
  };
  test("should render QC with Error", () => {
    const protocolId = "212121";
    const filePath = "//path";
    const type = "QC1";

    render(
      <QCProtocolView protId={protocolId} path={filePath} userType={type} />,
      state
    );
  });
  test("should render QC", () => {
    const protocolId = "212121";
    const filePath = "//path";
    const type = "QC2";
    render(
      <QCProtocolView protId={protocolId} path={filePath} userType={type} />,
      state
    );
  });
});
