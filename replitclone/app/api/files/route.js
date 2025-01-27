import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const { action, filename, content, path: filePath } = await req.json();
    const projectPath = path.join(process.cwd(), "projects", filePath || "");

    switch (action) {
      case "create":
        await fs.mkdir(path.dirname(path.join(projectPath, filename)), {
          recursive: true,
        });
        await fs.writeFile(path.join(projectPath, filename), content);
        break;
      case "read":
        const fileContent = await fs.readFile(
          path.join(projectPath, filename),
          "utf-8"
        );
        return NextResponse.json({ content: fileContent });
      case "update":
        await fs.writeFile(path.join(projectPath, filename), content);
        break;
      case "delete":
        await fs.unlink(path.join(projectPath, filename));
        break;
      case "list":
        const files = await fs.readdir(projectPath, { withFileTypes: true });
        const fileList = files.map((file) => ({
          name: file.name,
          isDirectory: file.isDirectory(),
        }));
        return NextResponse.json({ files: fileList });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
