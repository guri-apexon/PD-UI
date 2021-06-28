import React from "react";
import { render } from "../../../../test-utils/test-utils";
import "@testing-library/jest-dom/extend-expect";

import FollowedProtocols from "../FollowedProtocols";

describe("Followed Protocol component with Empty Data", () => {
  const state = {
    initialState: {
      dashboard: {
        protocols: [],
        setSelectedProtocols: [],
        followedProtocols: [],
      },
    },
  };

  test("should render ProtocolTable", () => {
    render(<FollowedProtocols />, state);
  });
});
describe("Followed Protocol component with Data", () => {
  const state = {
    initialState: {
      dashboard: {
        followedProtocols: [
          {
            id: "2a5111a6-5465-46f5-b133-a85724bae4ef",
            amendment: "Y",
            amendmentNumber: null,
            approvalDate: null,
            completenessOfDigitization: null,
            digitizedConfidenceInterval: null,
            documentFilePath:
              "\\\\quintiles.net\\enterprise\\Services\\protdigtest\\pilot_iqvxml\\2a5111a6-5465-46f5-b133-a85724bae4ef\\Protocol-2020-04-09-VER-000001.pdf",
            documentStatus: "final",
            draftVersion: null,
            errorCode: null,
            errorReason: null,
            fileName: "Protocol-2020-04-09-VER-000001.pdf",
            indication: "ABCC6 deficiency",
            moleculeDevice: "test",
            percentComplete: "100",
            phase: "I",
            projectId: "",
            protocol: "JBT101-RIS-001",
            protocolTitle:
              "A Phase 1, 2-part, Single-dose, Non-Randomized, Open-label, Parallel-group Study to Assess the Pharmacokinetics and Safety of Lenabasum in Subjects with Renal Impairment Compared with Matched Controls",
            sponsor: "Corbus Pharmaceuticals",
            status: "PROCESS_COMPLETED",
            uploadDate: "2021-04-08T09:51:34.077000",
            userId: "1020640",
            versionNumber: "10.1",
            qcActivity: "QC_IN_PROGRESS",
          },
        ],
        setSelectedProtocols: [],
      },
    },
  };

  test("should render ProtocolTable", () => {
    render(<FollowedProtocols />, state);
  });
});
