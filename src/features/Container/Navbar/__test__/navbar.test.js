import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { cleanup } from "@testing-library/react";
import { render, fireEvent, screen } from "../../../../test-utils/test-utils";
import { MemoryRouter } from "react-router-dom";

import Navbar from "../Navbar";
import { initialState } from "./data";

afterEach(cleanup);

describe("Should Render Navbar and Alert", () => {
  const mockHistoryPush = jest.fn();
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({
      push: mockHistoryPush,
    }),
  }));
  const mockData = [
    {
      id: "1190",
      protocol: "Test_Proto_01",
      aidocId: "64c3dd08-f885-49f7-a325-e72d8f221029",
      readFlag: false,
      protocolTitle: "",
      timeCreated: "2021-06-16T13:21:33.040000",
    },
    {
      id: "1190",
      protocol: "Test_Proto_01",
      aidocId: "bf7a0ddf-ff3a-4015-99e0-dc1800a4915c",
      readFlag: true,
      protocolTitle: "",
      timeCreated: "2021-06-17T08:05:56.897000",
    },
    {
      id: "1649",
      protocol: "Bimal_patra_test_email_D361BC00001TC01",
      aidocId: "61232fdd-26d5-4e7c-8e86-624341910038",
      readFlag: false,
      protocolTitle: "",
      timeCreated: "2021-06-18T11:05:54.950000",
    },
    {
      id: "1649",
      protocol: "Bimal_patra_test_email_D361BC00001TC01",
      aidocId: "953e212b-6d25-4614-ab80-0160a1abe660",
      readFlag: false,
      protocolTitle:
        "Capivasertib + Abiraterone as Treatment for Patients with Metastatic Hormone-Sensitive Prostate Cancer Characterised by PTEN deficiency.",
      timeCreated: "2021-06-18T09:38:59.113000",
    },
    {
      id: "1807",
      protocol: "ARJ868TC23",
      aidocId: "ccca752d-840b-429b-b53a-42262cf212bb",
      readFlag: false,
      protocolTitle:
        "A Multicentre, Randomised, Double-blind, Parallel Group, Placebocontrolled, Phase 3 Efficacy and Safety Study of Benralizumab (MEDI-563) Added to Medium to High-dose Inhaled Corticosteroid Plus Long-acting ß2 Agonist in Patients with Uncontrolled Asthma",
      timeCreated: "2021-06-24T07:50:04.747000",
    },
    {
      id: "1808",
      protocol: "BRPROTO3",
      aidocId: "ea39f739-a1a0-4994-a98b-08c298b662fd",
      readFlag: false,
      protocolTitle:
        "PHASE 3, RANDOMIZED, OPEN-LABEL, ACTIVE-CONTROLLED STUDY EVALUATING THE EFFICACY AND SAFETY OF ORAL VADADUSTAT FOR THE CORRECTION OF ANEMIA IN SUBJECTS WITH NON-DIALYSIS-DEPENDENT CHRONIC KIDNEY DISEASE (NDD-CKD) (PRO2TECT - CORRECTION)",
      timeCreated: "2021-06-24T11:22:10.017000",
    },
  ];
  let historymock = jest.fn();
  historymock.replace = jest.fn();
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Navbar list={mockData} />
      </MemoryRouter>,
      initialState
    );
  });
  test("Should handle Brand click", () => {
    const iqviaText = screen.getByText("IQVIA");
    fireEvent.click(iqviaText);
  });
  test("Should render navbar", () => {
    const iqviaText = screen.getByText("IQVIA");
    const pdText = screen.getByText("Protocol Library");
    expect(iqviaText).toBeInTheDocument();
    expect(pdText).toBeInTheDocument();
  });
  test("Should render list of alerts on click of bell icon", () => {
    const alertIcon = screen.getByTestId("alert-bell-icon");
    fireEvent.click(alertIcon);

    expect(screen.getByText("Test_Proto_01")).toBeInTheDocument();
  });
  test("Should render list of alerts on click of bell icon", () => {
    const alertIcon = screen.getByTestId("alert-bell-icon");
    fireEvent.click(alertIcon);
    fireEvent.click(screen.getByText("IQVIA"));
  });
  test("Should click on the list item", () => {
    const alertIcon = screen.getByTestId("alert-bell-icon");
    fireEvent.click(alertIcon);
    fireEvent.click(
      screen.getByTestId("nav-alert-list").children[0].children[1]
    );
  });
});
