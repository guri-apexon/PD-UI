export const htmlString = `
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th>ColIndex</th>
      <th>1.0</th>
      <th>2.0</th>
      <th>3.0</th>
      <th>4.0</th>
      <th>5.0</th>
      <th>6.0</th>
      <th>7.0</th>
      <th>8.0</th>
      <th>9.0</th>
      <th>10.0</th>
      <th>11.0</th>
      <th>12.0</th>
      <th>13.0</th>
      <th>14.0</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Study Period</td>
      <td></td>
      <td></td>
      <td>Treatment Period</td>
      <td>Treatment Period</td>
      <td>Treatment Period</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>Follow-up Period</td>
      <td>Follow-up Period</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>1</th>
      <td>Visit Number</td>
      <td>V2 <sup>a</sup></td>
      <td>TC</td>
      <td>V3</td>
      <td>V4</td>
      <td>V5</td>
      <td>V6</td>
      <td>V7</td>
      <td>V8</td>
      <td>V9</td>
      <td>TC</td>
      <td>TC</td>
      <td>LRTI</td>
      <td>Skin Reaction</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Procedure /  Study Day</td>
      <td>D1</td>
      <td>D8 (± 2 days)</td>
      <td>D15 (± 2 days)</td>
      <td>D31 (± 2 days)</td>
      <td>D61 (± 2 days)</td>
      <td>D91 (± 2 days)</td>
      <td>D121 (± 2 days)</td>
      <td>D151 (± 7 days)</td>
      <td>D361 (± 7 days)</td>
      <td>D1-151 Q2W (± 5 days)</td>
      <td>D152-361 monthly (± 5 days)</td>
      <td>D1-361  as needed</td>
      <td>D1-361  as needed</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Medical history update</td>
      <td>X</td>
      <td></td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>4</th>
      <td>Physical examination</td>
      <td>X</td>
      <td></td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>5</th>
      <td>Weight</td>
      <td>X</td>
      <td></td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>6</th>
      <td>Vital signs</td>
      <td>X <sup>b</sup></td>
      <td></td>
      <td>X</td>
      <td>X</td>
      <td>X <sup></sup></td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>7</th>
      <td>Blood sample for PK, ADA</td>
      <td>X <sup>c</sup></td>
      <td></td>
      <td>X<sup> (PK only)</sup></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>X</td>
      <td>X</td>
      <td></td>
      <td></td>
      <td>X <sup>d</sup></td>
      <td></td>
    </tr>
    <tr>
      <th>8</th>
      <td>Assessment of AEs/SAEs, AESIs, NOCDs</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
    </tr>
    <tr>
      <th>9</th>
      <td>Concomitant medications</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
    </tr>
    <tr>
      <th>10</th>
      <td>Verify eligibility criteria</td>
      <td>X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>11</th>
      <td>Randomization</td>
      <td>X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>12</th>
      <td>IP administration</td>
      <td>X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>13</th>
      <td>Assessment of LRTI or any respiratory infection that requires hospitalization</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>X <sup>d</sup></td>
      <td></td>
    </tr>
    <tr>
      <th>14</th>
      <td>Nasal swab collection</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>X <sup>d</sup></td>
      <td></td>
    </tr>
    <tr>
      <th>15</th>
      <td>Assessment of skin reaction</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>X <sup>e</sup></td>
    </tr>
    <tr>
      <th>16</th>
      <td>Telephone  contact <sup>f</sup></td>
      <td></td>
      <td>X</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>X</td>
      <td>X</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>17</th>
      <td>HRU <sup>g</sup></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>X</td>
      <td></td>
    </tr>
  </tbody>
</table>
`;
