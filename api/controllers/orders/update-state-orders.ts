import { query } from "../../lib/database";
import { sendResponse } from "../../lib/response";

export const updateStateOrders = async (request: Request) => {
  try {
    
    let body = await request.json();

    const update = await query(`UPDATE orders SET order_status='${body.new_status}' WHERE id='${body.id}'`)

    return sendResponse(
      JSON.stringify({
        "success": true,
        "data": update.rows,
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