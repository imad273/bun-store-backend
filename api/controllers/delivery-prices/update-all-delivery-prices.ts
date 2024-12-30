import { query } from "../../lib/database";
import { sendResponse } from "../../lib/response";

export const updateAllDeliveryPrices = async (request: Request) => {
  try {
    let body = await request.json();

    await query(
      `UPDATE delivery_pricing SET ${body.type}=${body.value}`
    )

    const get = await query("SELECT * FROM delivery_pricing ORDER BY wilaya_code")

    return sendResponse(
      JSON.stringify({
        "success": true,
        "data": get.rows,
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