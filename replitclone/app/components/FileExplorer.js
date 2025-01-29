// import React from "react";

// // components/FileExplorer.js
// const FileExplorer = ({
//   files,
//   onFileSelect,
//   currentFile,
//   onRename,
//   onDelete,
//   onCreate,
// }) => {
//   return (
//     <div className="w-64 bg-gray-800 p-4 h-full">
//       <h2 className="text-xl text-white font-semibold mb-4">Files</h2>
//       <button
//         onClick={() => onCreate(prompt("Enter file name:"))}
//         className="mb-2 bg-blue-500 text-white p-2 rounded"
//       >
//         Create File
//       </button>
//       <div className="space-y-2">
//         {files.length === 0 ? (
//           <div className="text-gray-400 text-sm">No files yet</div>
//         ) : (
//           files.map((file) => (
//             <div key={file.name} className="flex justify-between items-center">
//               <div
//                 className={`cursor-pointer p-2 rounded text-white ${
//                   currentFile?.name === file.name
//                     ? "bg-blue-600"
//                     : "hover:bg-gray-700"
//                 }`}
//                 onClick={() => onFileSelect(file)}
//               >
//                 📄 {file.name}
//               </div>
//               <div>
//                 <button
//                   onClick={() => onRename(file.name, prompt("Enter new name:"))}
//                   className="text-yellow-400"
//                 >
//                   ✏️
//                 </button>
//                 <button
//                   onClick={() => onDelete(file.name)}
//                   className="text-red-400"
//                 >
//                   🗑️
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default FileExplorer;
// components/FileExplorer.js
import React from "react";

const FileExplorer = ({
  files,
  onFileSelect,
  currentFile,
  onRename,
  onDelete,
  onCreate,
}) => {
  return (
    <div className="w-64 bg-gray-800 p-6 h-full rounded-lg shadow-lg flex flex-col">
      <h2 className="text-2xl text-green-400 font-semibold mb-4">
        File Explorer
      </h2>

      <button
        onClick={() => onCreate(prompt("Enter file name:"))}
        className="mb-4 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        + Create File
      </button>

      <div className="space-y-4 overflow-auto">
        {files.length === 0 ? (
          <div className="text-gray-400 text-sm">No files available</div>
        ) : (
          files.map((file) => (
            <div
              key={file.name}
              className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-700 cursor-pointer"
              onClick={() => onFileSelect(file)}
            >
              <div
                className={`text-white flex items-center ${
                  currentFile?.name === file.name
                    ? "bg-blue-600 rounded-lg"
                    : "hover:bg-gray-600 rounded-lg"
                }`}
              >
                <span role="img" aria-label="file" className="mr-2">
                  📄
                </span>
                {file.name}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onRename(file.name, prompt("Enter new name:"))}
                  className="text-yellow-400 hover:text-yellow-500 transition"
                  aria-label="Rename"
                >
                  ✏️
                </button>
                <button
                  onClick={() => onDelete(file.name)}
                  className="text-red-400 hover:text-red-500 transition"
                  aria-label="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FileExplorer;
