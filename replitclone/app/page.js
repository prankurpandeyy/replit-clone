// "use client";
// import React, { useState, useEffect } from "react";
// import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
// import { CopilotPopup } from "@copilotkit/react-ui";
// import ScreenOne from "./components/ScreenOne";
// import FileExplorer from "./components/FileExplorer";
// import Layout from "./components/Layout";

// function Page() {
//   const [files, setFiles] = useState([]);
//   const [currentFile, setCurrentFile] = useState(null);
//   const [code, setCode] = useState("// Select or create a file");
//   const [aiResponse, setAiResponse] = useState("");

//   // Make the workspace state readable by the AI
//   useCopilotReadable({
//     name: "workspaceState",
//     description: "Current state of the workspace",
//     value: {
//       files: files.map((f) => f.name),
//       currentFile: currentFile?.name,
//       currentCode: code,
//     },
//   });

//   // Action to process and display AI responses
//   useCopilotAction({
//     name: "processFiles",
//     description: "Process and create files from the AI response",
//     parameters: [
//       {
//         name: "response",
//         type: "string",
//         description: "The AI's response containing file definitions",
//         required: true,
//       },
//     ],
//     handler: async ({ response }) => {
//       try {
//         setAiResponse(response);

//         // Split the message into file blocks
//         const fileBlocks = response.split("---");

//         for (const block of fileBlocks) {
//           // Extract filename and code using the new format
//           const fileMatch = block.match(
//             /FILE:\s*(.*?)\s*\nCODE:\s*([\s\S]*?)(?=FILE:|$)/
//           );

//           if (fileMatch) {
//             const [, filename, content] = fileMatch;
//             if (filename && content) {
//               await fetch("/api/files", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                   action: "create",
//                   filename: filename.trim(),
//                   content: content.trim(),
//                 }),
//               });
//             }
//           }
//         }

//         await fetchFiles();
//         return "Files processed successfully";
//       } catch (error) {
//         console.error("Error processing files:", error);
//         throw error;
//       }
//     },
//   });

//   // Action to update file content
//   useCopilotAction({
//     name: "updateFile",
//     description: "Update the content of an existing file",
//     parameters: [
//       {
//         name: "filename",
//         type: "string",
//         description: "Name of the file to update",
//         required: true,
//       },
//       {
//         name: "content",
//         type: "string",
//         description: "New content for the file",
//         required: true,
//       },
//     ],
//     handler: async ({ filename, content }) => {
//       try {
//         await fetch("/api/files", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             action: "update",
//             filename,
//             content,
//           }),
//         });
//         await fetchFiles();
//         if (currentFile?.name === filename) {
//           setCode(content);
//         }
//         return `File ${filename} updated successfully`;
//       } catch (error) {
//         console.error("Error updating file:", error);
//         throw error;
//       }
//     },
//   });

//   useEffect(() => {
//     fetchFiles();
//   }, []);

//   // app/page.js
//   const fetchFiles = async () => {
//     try {
//       const response = await fetch("/api/files", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ action: "list" }),
//       });
//       const data = await response.json();
//       if (data.files) {
//         setFiles(data.files);
//       }
//     } catch (error) {
//       console.error("Error fetching files:", error);
//     }
//   };

//   const handleFileSelect = async (file) => {
//     if (file.isDirectory) return;

//     try {
//       const response = await fetch("/api/files", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           action: "read",
//           filename: file.name,
//         }),
//       });
//       const data = await response.json();
//       setCurrentFile(file);
//       setCode(data.content);
//     } catch (error) {
//       console.error("Error reading file:", error);
//     }
//   };

//   const handleCodeChange = async (value) => {
//     setCode(value);
//     if (currentFile) {
//       try {
//         await fetch("/api/files", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             action: "update",
//             filename: currentFile.name,
//             content: value,
//           }),
//         });
//       } catch (error) {
//         console.error("Error updating file:", error);
//       }
//     }
//   };

//   const handleRenameFile = async (oldFilename, newFilename) => {
//     try {
//       await fetch("/api/files", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           action: "rename",
//           filename: oldFilename,
//           newFilename,
//         }),
//       });
//       fetchFiles();
//     } catch (error) {
//       console.error("Error renaming file:", error);
//     }
//   };

//   const handleDeleteFile = async (filename) => {
//     try {
//       await fetch("/api/files", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           action: "delete",
//           filename,
//         }),
//       });
//       fetchFiles();
//     } catch (error) {
//       console.error("Error deleting file:", error);
//     }
//   };

//   const handleCreateFile = async (filename) => {
//     try {
//       await fetch("/api/files", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           action: "create",
//           filename,
//           content: "", // Start with empty content
//         }),
//       });
//       fetchFiles();
//     } catch (error) {
//       console.error("Error creating file:", error);
//     }
//   };
//   return (
//     <div className="h-screen flex">
//       <FileExplorer
//         files={files}
//         onFileSelect={handleFileSelect}
//         currentFile={currentFile}
//         onRename={handleRenameFile}
//         onDelete={handleDeleteFile}
//         onCreate={handleCreateFile}
//       />
//       <div className="flex-1 flex flex-col">
//         <ScreenOne code={code} onChange={handleCodeChange} />
//         {aiResponse && (
//           <div className="p-4 bg-gray-800 text-white overflow-auto max-h-[30vh]">
//             <pre className="whitespace-pre-wrap">{aiResponse}</pre>
//           </div>
//         )}
//       </div>
//       <CopilotPopup
//         instructions={`
//           You are an AI-powered code generator. Use the following actions:

//           1. @processFiles - To create new files, use this format:
//           @processFiles(response: \`
//           FILE: filename.ext
//           CODE:
//           [code content here]

//           ---

//           FILE: another.ext
//           CODE:
//           [more code here]
//           \`)

//           2. @updateFile - To update existing files:
//           @updateFile(filename: "file.ext", content: "new content")

//           You can see the current workspace state in the context.
//           Always use these actions to create or modify files.
//         `}
//         labels={{
//           title: "Project Assistant",
//           initial: "What would you like to create?",
//         }}
//       />
//     </div>
//   );
// }

// export default Page;
"use client";
import React, { useState, useEffect } from "react";
import {
  CopilotKit,
  useCopilotAction,
  useCopilotReadable,
} from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import ScreenOne from "./components/ScreenOne";
import FileExplorer from "./components/FileExplorer";

function Page() {
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);
  const [code, setCode] = useState("// Select or create a file");
  const [aiResponse, setAiResponse] = useState("");

  useCopilotReadable({
    name: "workspaceState",
    description: "Current state of the workspace",
    value: {
      files: files.map((f) => f.name),
      currentFile: currentFile?.name,
      currentCode: code,
    },
  });

  useCopilotAction({
    name: "processFiles",
    description: "Process and create files from the AI response",
    parameters: [
      {
        name: "response",
        type: "string",
        description: "The AI's response containing file definitions",
        required: true,
      },
    ],
    handler: async ({ response }) => {
      try {
        setAiResponse(response);

        const fileBlocks = response.split("---");

        for (const block of fileBlocks) {
          const fileMatch = block.match(
            /FILE:\s*(.*?)\s*\nCODE:\s*([\s\S]*?)(?=FILE:|$)/
          );

          if (fileMatch) {
            const [, filename, content] = fileMatch;
            if (filename && content) {
              await fetch("/api/files", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  action: "create",
                  filename: filename.trim(),
                  content: content.trim(),
                }),
              });
            }
          }
        }

        await fetchFiles();
        return "Files processed successfully";
      } catch (error) {
        console.error("Error processing files:", error);
        throw error;
      }
    },
  });

  useCopilotAction({
    name: "updateFile",
    description: "Update the content of an existing file",
    parameters: [
      {
        name: "filename",
        type: "string",
        description: "Name of the file to update",
        required: true,
      },
      {
        name: "content",
        type: "string",
        description: "New content for the file",
        required: true,
      },
    ],
    handler: async ({ filename, content }) => {
      try {
        await fetch("/api/files", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "update",
            filename,
            content,
          }),
        });
        await fetchFiles();
        if (currentFile?.name === filename) {
          setCode(content);
        }
        return `File ${filename} updated successfully`;
      } catch (error) {
        console.error("Error updating file:", error);
        throw error;
      }
    },
  });

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await fetch("/api/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "list" }),
      });
      const data = await response.json();
      if (data.files) {
        setFiles(data.files);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleFileSelect = async (file) => {
    if (file.isDirectory) return;

    try {
      const response = await fetch("/api/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "read",
          filename: file.name,
        }),
      });
      const data = await response.json();
      setCurrentFile(file);
      setCode(data.content);
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };

  const handleCodeChange = async (value) => {
    setCode(value);
    if (currentFile) {
      try {
        await fetch("/api/files", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "update",
            filename: currentFile.name,
            content: value,
          }),
        });
      } catch (error) {
        console.error("Error updating file:", error);
      }
    }
  };

  const handleRenameFile = async (oldFilename, newFilename) => {
    try {
      await fetch("/api/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "rename",
          filename: oldFilename,
          newFilename,
        }),
      });
      fetchFiles();
    } catch (error) {
      console.error("Error renaming file:", error);
    }
  };

  const handleDeleteFile = async (filename) => {
    try {
      await fetch("/api/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete",
          filename,
        }),
      });
      fetchFiles();
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleCreateFile = async (filename) => {
    try {
      await fetch("/api/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          filename,
          content: "",
        }),
      });
      fetchFiles();
    } catch (error) {
      console.error("Error creating file:", error);
    }
  };

  return (
    <div className="h-screen flex bg-gray-100">
      <FileExplorer
        files={files}
        onFileSelect={handleFileSelect}
        currentFile={currentFile}
        onRename={handleRenameFile}
        onDelete={handleDeleteFile}
        onCreate={handleCreateFile}
      />
      <div className="flex-1 flex flex-col p-4">
        <ScreenOne code={code} onChange={handleCodeChange} />
        {aiResponse && (
          <div className="mt-4 p-4 bg-gray-800 text-white overflow-auto max-h-[30vh] rounded-lg shadow-lg">
            <pre className="whitespace-pre-wrap">{aiResponse}</pre>
          </div>
        )}
      </div>
      <CopilotPopup
        instructions={`
          You are an AI-powered code generator. Use the following actions:
          
          1. @processFiles - To create new files, use this format:
          @processFiles(response: \`
          FILE: filename.ext
          CODE:
          [code content here]
          
          ---
          
          FILE: another.ext
          CODE:
          [more code here]
          \`)
          
          2. @updateFile - To update existing files:
          @updateFile(filename: "file.ext", content: "new content")
          
          You can see the current workspace state in the context.
          Always use these actions to create or modify files.
        `}
        labels={{
          title: "Project Assistant",
          initial: "What would you like to create?",
        }}
      />
    </div>
  );
}

export default Page;
