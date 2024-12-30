import { query } from "../../lib/database";
import { sendResponse } from "../../lib/response";

export const getSingleOrders = async (request: Request) => {
  try {
    let body = await request.json();

    const get = await query(`SELECT orders.*, to_jsonb(products) AS product_data FROM orders orders JOIN products products ON orders.product = products.id WHERE orders.id='${body.id}'`)

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