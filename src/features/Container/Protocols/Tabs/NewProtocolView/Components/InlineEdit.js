import React, { useRef } from "react";
import { createReactEditorJS } from "react-editor-js";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Header from "@editorjs/header";

export const EDITOR_JS_TOOLS = {
  table: Table,
  list: List,
  image: Image,
  header: Header,
};

const InlineEditor = ({ data }) => {
  const ReactEditorJS = createReactEditorJS();
  const editorCore = useRef(null);

  const handleInitialize = (instance) => {
    editorCore.current = instance;
  };

  // const handleSave = async () => {
  //   const savedData = await editorCore.current.save();
  //   console.log(savedData);
  // };
  return (
    <div className="react-editor">
      {/* <button onClick={handleSave}>Save</button> */}
      <ReactEditorJS
        instanceRef={(instance) => (editorCore.current = instance)}
        onInitialize={handleInitialize}
        data={{
          blocks: data,
        }}
        tools={EDITOR_JS_TOOLS}
      />
    </div>
  );
};

export default React.memo(InlineEditor);
