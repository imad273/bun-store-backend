import { query } from "../../lib/database";
import { sendResponse } from "../../lib/response";

export const getProducts = async (request: Request) => {
  try {
    const get = await query("SELECT * FROM products")

    return sendResponse(
      JSON.stringify({
        "success": true,
        "data": get.rows,
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