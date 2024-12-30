import { unlink } from "fs/promises";
import { query } from "../../lib/database";
import { sendResponse } from "../../lib/response";

export const deleteOrders = async (request: Request) => {
  try {

    const body = await request.json();

    await query(`DELETE FROM orders WHERE id='${body.id}'`)

    const rest_of_products = await query("SELECT orders.*, to_jsonb(products) AS product_data FROM orders orders JOIN products products ON orders.product = products.id ORDER BY orders.created_at DESC");

    return sendResponse(
      JSON.stringify({
        "success": true,
        "data": rest_of_products.rows,
        "message": "Order Deleted successfully"
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