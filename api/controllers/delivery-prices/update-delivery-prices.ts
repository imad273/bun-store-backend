import { query } from "../../lib/database";
import { sendResponse } from "../../lib/response";

export const updateDeliveryPrices = async (request: Request) => {
  try {
    let body = await request.json();

    const update = await query(
      `UPDATE delivery_pricing SET ${body.type}=${body.value} WHERE id='${body.id}'`
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