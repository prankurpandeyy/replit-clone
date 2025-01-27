import React from "react";
import Editor from "@monaco-editor/react";

function CodeEditor() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Code Input</h2>
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
}

export default CodeEditor;
