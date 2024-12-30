import { query } from "../../lib/database";
import { sendResponse } from "../../lib/response";

export const updateDesignSettings = async (request: Request) => {
  try {
    let body = await request.json();
    
    const update = await query(
      `UPDATE settings SET promotion_sign=${body.promotion_sign}, promotion_sign_text='${body.promotion_sign_text}', show_out_of_stock_products=${body.show_out_of_stock_products}`
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