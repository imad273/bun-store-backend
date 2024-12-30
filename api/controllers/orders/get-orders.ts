import { query } from "../../lib/database";
import { sendResponse } from "../../lib/response";

export const getOrders = async (request: Request) => {
  try {
    const get = await query("SELECT orders.*, to_jsonb(products) AS product_data FROM orders orders JOIN products products ON orders.product = products.id ORDER BY orders.created_at DESC")

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