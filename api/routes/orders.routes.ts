import { createOrders, deleteOrders, getOrders, getSingleOrders, updateStateOrders } from "../controllers/orders";

export const handleOrdersRoutes = async (request: Request, url: any) => {
  if (url.pathname === "/orders/get-orders" && request.method === "GET") {
    return getOrders(request);
  }
  
  if (url.pathname === "/orders/create-order" && request.method === "POST") {
    return createOrders(request)
  }

  if (url.pathname === "/orders/update-state-order" && request.method === "POST") {
    return updateStateOrders(request)
  }

  if (url.pathname === "/orders/get-single-order" && request.method === "POST") {
    return getSingleOrders(request)
  }

  if (url.pathname === "/orders/delete-order" && request.method === "POST") {
    return deleteOrders(request)
  }

  return new Response("Not Found", { status: 404 });
}