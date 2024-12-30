import { query } from "../../lib/database";
import { sendResponse } from "../../lib/response";

export const getSingleProducts = async (request: Request) => {
  try {
    const body = await request.json();

    const get = await query(`SELECT * FROM products WHERE id='${body.id}'`)

    return sendResponse(
      JSON.stringify({
        "success": true,
        "data": get.rows[0],
        "message": "Data fetched successfully"
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