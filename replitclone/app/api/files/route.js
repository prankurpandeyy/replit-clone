import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const FILE_DB_PATH = path.join(process.cwd(), "fileDB.json");

// Read existing data or initialize an empty object
const readFileDB = () => {
  try {
    if (!fs.existsSync(FILE_DB_PATH)) {
      fs.writeFileSync(FILE_DB_PATH, JSON.stringify({}));
    }
    return JSON.parse(fs.readFileSync(FILE_DB_PATH, "utf8"));
  } catch (error) {
    console.error("Error reading fileDB.json:", error);
    return {};
  }
};

// Write data to fileDB.json
const writeFileDB = (data) => {
  try {
    fs.writeFileSync(FILE_DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing fileDB.json:", error);
  }
};

export async function POST(req) {
  try {
    const { action, filename, content, newFilename } = await req.json();
    let fileDB = readFileDB();

    switch (action) {
      case "create":
        if (fileDB[filename]) {
          return NextResponse.json(
            { error: "File already exists" },
            { status: 400 }
          );
        }
        fileDB[filename] = content || "";
        break;
      case "read":
        return NextResponse.json({ content: fileDB[filename] || "" });
      case "update":
        if (!fileDB[filename]) {
          return NextResponse.json(
            { error: "File not found" },
            { status: 404 }
          );
        }
        fileDB[filename] = content;
        break;
      case "delete":
        delete fileDB[filename];
        break;
      case "list":
        return NextResponse.json({
          files: Object.keys(fileDB).map((name) => ({
            name,
            isDirectory: false,
          })),
        });
      case "rename":
        if (!fileDB[filename]) {
          return NextResponse.json(
            { error: "File not found" },
            { status: 404 }
          );
        }
        fileDB[newFilename] = fileDB[filename];
        delete fileDB[filename];
        break;
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    writeFileDB(fileDB);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
