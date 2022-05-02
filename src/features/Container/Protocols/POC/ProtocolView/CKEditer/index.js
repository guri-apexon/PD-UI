import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// const editorConfiguration = {
//   toolbar: ["bold", "italic"],
// };
class CKEditorComp extends Component {
  render() {
    return (
      <div className="App">
        <h2>Using CKEditor 5 build in React</h2>
        <CKEditor
          // config={editorConfiguration}
          editor={ClassicEditor}
          data={`<div id="TITLE" class="accordion-parent-detail" style="width: 100%;"><div class="App">
                <div><div class="option-content-container"><div><p id="CPT_section-3" class="text-para" style="font-size: 12px; font-weight: bold;">A Phase I, Open-label Study to Evaluate the Pharmacokinetics of Tezepelumab in Children ≥ 5 to 11 Years of Age with Mild, Moderate, or Severe Asthma</p></div></div></div><div><div class="option-content-container"><div><p id="CPT_section-4" class="text-para" style="font-size: 12px;"><b>Sponsor Name:</b> AstraZeneca</p></div></div></div><div><div class="option-content-container"><div><p id="CPT_section-5" class="text-para" style="font-size: 12px;">Legal Registered Address: AstraZeneca AB, 151 85 SÃ¶dertÃ¤lje, Sweden</p></div></div></div><div><div class="option-content-container"><div><p id="CPT_section-6" class="text-para" style="font-size: 12px; font-weight: bold;">Regulatory Agency Identifier Number(s):</p></div></div></div><div><div class="option-content-container"><div><p id="CPT_section-7" class="text-para" style="font-size: 12px;">2020-000554-97 (EudraCT)</p></div></div></div><div><div class="option-content-container"><div></div></div></div><div><div class="option-content-container"><div><div class="option-content-container"><div><p id="CPT_section-33" class="text-para" style="font-size: 12px;">This Clinical Study Protocol has been subject to a peer review according to AstraZeneca Standard procedures. The Clinical Study Protocol is publicly registered, and the results are disclosed and/or published according to the AstraZeneca Global Policy on Bioethics and in compliance with prevailing laws and regulations.</p></div></div></div><div><div class="option-content-container"><div></div></div></div><div><div class="option-content-container"><div><p id="CPT_section-35" class="text-para" style="font-size: 12px; font-weight: bold;">Protocol Number: D5180C00025</p></div></div></div><div><div class="option-content-container"><div><p id="CPT_section-36" class="text-para" style="font-size: 12px;">Amendment Number: Not Applicable (N/A)</p></div></div></div><div><div class="option-content-container"><div><p id="CPT_section-37" class="text-para" style="font-size: 12px;">Study Intervention: Tezepelumab</p></div></div></div><div><div class="option-content-container"><div><p id="CPT_section-38" class="text-para" style="font-size: 12px;">Study Phase: Phase I</p></div></div></div><div><div class="option-content-container"><div><p id="CPT_section-39" class="text-para" style="font-size: 12px; font-weight: bold;">Short Title: A Study to Evaluate the Pharmacokinetics of Tezepelumab in Children ≥ 5 to 11 Years of Age with Asthma</p></div></div></div><div><div class="option-content-container"><div><p id="CPT_section-40" class="text-para" style="font-size: 12px; font-weight: bold;">Medical Monitor Name and Contact Information will be provided separately</p></div></div></div><div><div class="option-content-container"><div><p id="CPT_section-41" class="text-para" style="font-size: 12px; font-weight: bold;">National Co-ordinating Investigator: Dr Jonathan Grigg Department of Respiratory Medicine Royal London Hospital United Kingdom</p></div></div></div><div><div class="option-content-container"><div></div></div></div></div>`}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
    );
  }
}

export default CKEditorComp;
