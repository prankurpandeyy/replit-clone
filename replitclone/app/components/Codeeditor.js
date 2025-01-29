// // components/ScreenOne.js
// import React from "react";
// import { Editor } from "@monaco-editor/react";

// const ScreenOne = ({ code, onChange }) => {
//   return (
//     <div className="bg-gray-900 p-4 h-full">
//       <h2 className="text-xl text-green-400 font-semibold mb-4">Code Input</h2>
//       <Editor
//         height="80vh"
//         defaultLanguage="javascript"
//         value={code}
//         onChange={onChange}
//         theme="vs-dark"
//         options={{
//           minimap: { enabled: false },
//           scrollBeyondLastLine: false,
//         }}
//       />
//     </div>
//   );
// };

// export default ScreenOne;
// components/ScreenOne.js
import React from "react";
import { Editor } from "@monaco-editor/react";

const ScreenOne = ({ code, onChange }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg h-full flex flex-col">
      <h2 className="text-2xl text-green-400 font-semibold mb-6">Code Input</h2>

      <div className="flex-1 bg-gray-900 p-4 rounded-lg shadow-inner">
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
    </div>
  );
};

export default ScreenOne;
