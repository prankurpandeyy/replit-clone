import React, { useState } from "react";
import { Editor } from "@monaco-editor/react";

const ScreenOne = ({ code, onChange }) => {
  return (
    <div className="bg-blue-400 p-4 h-full">
      <h2 className="text-xl text-green-400 font-semibold mb-4">Code Input</h2>
      <Editor
        height="80vh"
        defaultLanguage="javascript"
        value={code}
        onChange={onChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
};

export default ScreenOne;
