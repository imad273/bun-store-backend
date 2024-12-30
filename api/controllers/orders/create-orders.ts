import { query } from "../../lib/database";
import { sendResponse } from "../../lib/response";

export const createOrders = async (request: Request) => {
  try {

    let body = await request.json();

    const product = await query(
      `SELECT * FROM products WHERE id='${body.product}'`)

    await query(
      `UPDATE products SET orders=${product.rows[0].orders + 1} WHERE id='${body.product}'`)

    const insert = await query("INSERT INTO orders (order_status, customer_name, customer_phone_number, customer_city, customer_state, total_amount, delivery_price, quantity, delivery_type, options, product) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
      ["pending", body.name, body.phoneNumber, body.city, body.wilaya, body.total_amount, body.deliveryPrice, body.quantity, body.deliveryType, body.options, body.product]
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