import { sendResponse } from "../../lib/response";

export const handleUpload = async (request: Request) => {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return new Response("No files uploaded", { status: 400 });
    }

    let uploadedFilesPath = [];

    for (const file of files) {
      let path = `uploads/${Date.now()}_${file.name}`;
      await Bun.write(path, file);

      uploadedFilesPath.push(path)
    }

    return sendResponse(
      JSON.stringify({
        "success": true,
        "data": uploadedFilesPath,
        "message": "images uploaded successfully"
      }),
      request
    )
  } catch (err) {
    console.error(err);
    return new Response("Error uploading files", { status: 500 });
  }
}