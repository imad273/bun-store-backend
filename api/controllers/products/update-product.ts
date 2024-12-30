import { query } from "../../lib/database";
import { sendResponse } from "../../lib/response";

export const updateProduct = async (request: Request) => {
  try {

    let body = await request.json();

    const update = await query(
      "UPDATE products SET name=$1, price=$2, discount=$3, discount_price=$4, badge=$5, description=$6, short_description=$7, options=$8, shipping_time=$9, published=$10, out_of_stock=$11, images=$12 WHERE id=$13",
      [body.name, body.price, body.discount, body.discount_price, body.badge, body.description, body.short_description, body.options, body.shipping_time, body.published, body.out_of_stock, body.images, body.id]
    )

    return sendResponse(
      JSON.stringify({
        "success": true,
        "data": update.rows[0],
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