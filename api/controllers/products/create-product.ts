import { query } from "../../lib/database";
import { sendResponse } from "../../lib/response";

export const createProduct = async (request: Request) => {
  try {

    let body = await request.json();

    const insert = await query("INSERT INTO products (name, images, price, discount, discount_price, badge, description, short_description, options, shipping_time, published, out_of_stock, orders) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *",
      [body.name, body.images, body.price, body.discount, body.discount_price, body.badge, body.description, body.short_description, body.options, body.shipping_time, body.published, body.out_of_stock, 1]
    )

    return sendResponse(
      JSON.stringify({
        "success": true,
        "data": insert.rows[0],
        "message": "Data inserted successfully"
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