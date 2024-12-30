import { serve } from "bun";
import { join } from "path";
import { handleUpload } from "./controllers/images/upload";
import { updateImages } from "./controllers/images/update-images";

import {
  handleDeliveryPricesRoutes,
  handleOrdersRoutes,
  handleProductsRoutes,
  handleSettingsRoutes
} from "./routes";

serve({
  port: process.env.PORT || 1049,
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/uploads/")) {
      const filePath = join(process.cwd(), url.pathname);

      // Serve the file
      return new Response(Bun.file(filePath));
    }

    // upload
    if (url.pathname === "/upload" && request.method === "POST") {
      return handleUpload(request)
    }

    if (url.pathname === "/update-images" && request.method === "POST") {
      return updateImages(request)
    }

    // products
    if (url.pathname.startsWith("/products")) {
      return handleProductsRoutes(request, url);
    }

    // delivery prices
    if (url.pathname.startsWith("/delivery-prices")) {
      return handleDeliveryPricesRoutes(request, url);
    }

    // settings
    if (url.pathname.startsWith("/settings")) {
      return handleSettingsRoutes(request, url);
    }

    // orders
    if (url.pathname.startsWith("/orders")) {
      return handleOrdersRoutes(request, url);
    }

    return new Response(`running on port ${process.env.PORT || 1049}`)
  },
})