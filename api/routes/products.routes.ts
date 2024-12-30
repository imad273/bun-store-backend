import {
  createProduct,
  deleteProduct,
  getHomeProducts,
  getProducts,
  getSingleProducts,
  updateProduct
} from "../controllers/products"

export const handleProductsRoutes = async (request: Request, url: any) => {
  if (url.pathname === "/products/all-products" && request.method === "GET") {
    return getProducts(request)
  }

  if (url.pathname === "/products/single-product" && request.method === "POST") {
    return getSingleProducts(request)
  }

  if (url.pathname === "/products/create-product" && request.method === "POST") {
    return createProduct(request)
  }

  if (url.pathname === "/products/update-product" && request.method === "POST") {
    return updateProduct(request)
  }

  if (url.pathname === "/products/delete-product" && request.method === "POST") {
    return deleteProduct(request)
  }

  if (url.pathname === "/products/home-products" && request.method === "GET") {
    return getHomeProducts(request)
  }

  return new Response("Not Found", { status: 404 });
}