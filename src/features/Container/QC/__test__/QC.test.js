/* eslint-disable */
import React from 'react';
import { render } from '../../../../test-utils/test-utils';
// import { fireEvent, screen } from "../../../../test-utils/test-utils";
import '@testing-library/jest-dom/extend-expect';
import QC from '../QC';

describe('Protocol Table container component', () => {
  const state = {
    initialState: {
      qc: {
        protocols: [
          {
            protocolTitle: 'Title',
            protocol: '12344',
            projectId: 'Project1',
            sponsor: 'Astella',
            uploadDate: 'aa',
            id: 1,
          },
        ],
        tableError: false,
        loader: false,
      },
    },
  };
  test('should render QC', () => {
    render(<QC />, state);
  });
  // test("should switch to tab QC Protocol View", () => {
  //   render(<QC />, state);

  //   fireEvent.click(screen.getByTestId("click-link-12344"));
  //   expect(screen.getByText(/12344/)).toBeInTheDocument();
  // });
  // test("should breadcrumb link be clicked", () => {
  //   render(<QC />, state);

  //   fireEvent.click(screen.getByTestId("breadcrumb-click").children[0]);
  // });
});
