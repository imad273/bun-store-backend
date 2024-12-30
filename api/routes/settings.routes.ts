import { getSettings, updateConfigSettings, updateDesignSettings } from "../controllers/settings"

export const handleSettingsRoutes = async (request: Request, url: any) => {

  if (url.pathname === "/settings/get-settings" && request.method === "GET") {
    return getSettings(request)
  }

  if (url.pathname === "/settings/update-design-settings" && request.method === "POST") {
    return updateDesignSettings(request)
  }
  
  if (url.pathname === "/settings/update-config-settings" && request.method === "POST") {
    return updateConfigSettings(request)
  }

  return new Response("Not Found", { status: 404 });
}