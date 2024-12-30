import {
  getDeliveryPrices,
  updateAllDeliveryPrices,
  updateDeliveryPrices
} from "../controllers/delivery-prices"

export const handleDeliveryPricesRoutes = async (request: Request, url: any) => {

  if (url.pathname === "/delivery-prices/get-delivery-prices" && request.method === "GET") {
    return getDeliveryPrices(request)
  }

  if (url.pathname === "/delivery-prices/update-delivery-prices" && request.method === "POST") {
    return updateDeliveryPrices(request)
  }

  if (url.pathname === "/delivery-prices/update-all-delivery-prices" && request.method === "POST") {
    return updateAllDeliveryPrices(request)
  }

  return new Response("Not Found", { status: 404 });
}