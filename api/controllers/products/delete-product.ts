import { unlink } from "fs/promises";
import { query } from "../../lib/database";
import { sendResponse } from "../../lib/response";

export const deleteProduct = async (request: Request) => {
  try {

    let body = await request.json();

    const product = await query(`SELECT * FROM products WHERE id='${body.id}'`)

    const productData = product.rows[0];

    for (let i = 0; i < productData.images.length; i++) {
      const file = Bun.file(productData.images[i]);
      if (await file.exists()) {
        await unlink(productData.images[i]);
      }
    }

    await query(`DELETE FROM products WHERE id='${body.id}'`)

    const rest_of_products = await query("SELECT * FROM products");

    return sendResponse(
      JSON.stringify({
        "success": true,
        "data": rest_of_products.rows,
        "message": "Product Deleted successfully"
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