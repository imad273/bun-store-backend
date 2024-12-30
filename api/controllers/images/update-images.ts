import { unlink } from "fs/promises";
import { sendResponse } from "../../lib/response";

export const updateImages = async (request: Request) => {
  try {
    const formData = await request.formData();

    const old_images = formData.getAll("old_images") as string[];
    const files = formData.getAll("new_images") as File[];

    for (let i = 0; i < old_images.length; i++) {
      const file = Bun.file(old_images[i]);
      if (await file.exists()) {
        await unlink(old_images[i]);
      }
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