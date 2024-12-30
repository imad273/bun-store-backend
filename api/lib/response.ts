export const sendResponse = (response: string | BodyInit, request: Request, code: number = 200) => {
  const origin: string = request.headers.get("Origin") || "";

  const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

  return new Response(response, {
    status: code,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "null",
      "Access-Control-Allow-Methods": '*',
    }
  })
}