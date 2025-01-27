import React from "react";

const FileExplorer = ({ files, onFileSelect, currentFile }) => {
  return (
    <div className="w-64 bg-gray-800 p-4 h-full">
      <h2 className="text-xl text-white font-semibold mb-4">Files</h2>
      <div className="space-y-2">
        {files.length === 0 ? (
          <div className="text-gray-400 text-sm">No files yet</div>
        ) : (
          files.map((file) => (
            <div
              key={file.name}
              className={`cursor-pointer p-2 rounded text-white
                ${
                  currentFile?.name === file.name
                    ? "bg-blue-600"
                    : "hover:bg-gray-700"
                }`}
              onClick={() => onFileSelect(file)}
            >
              {file.isDirectory ? "📁 " : "📄 "}
              {file.name}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FileExplorer;
