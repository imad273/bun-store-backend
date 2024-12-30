import { query } from "../../lib/database";
import { sendResponse } from "../../lib/response";

export const updateConfigSettings = async (request: Request) => {
  try {
    let body = await request.json();

    const update = await query(
      `UPDATE settings SET pixel_id=${body.pixel_id}`
    )

    return sendResponse(
      JSON.stringify({
        "success": true,
        "data": update.rows,
        "message": "Data updated successfully"
      }),
      request
    )

  } catch (err) {
    console.error(err);

    return sendResponse(
      JSON.stringify({
        "success": false,
        "error": {
          "code": 400,
          "message": err
        }
      }),
      request,
      500
    )
  }
}