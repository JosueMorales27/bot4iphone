export default {
  async fetch(request) {
    const KALSHI = "https://api.elections.kalshi.com/trade-api/v2";
    const url = new URL(request.url);

    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
      "Cache-Control": "no-store",
    };
    if (request.method === "OPTIONS")
      return new Response(null, { status: 204, headers: cors });

    // Reenvía path + query a la API de Kalshi y añade CORS.
    // Ej: GET https://TU.workers.dev/markets?series_ticker=KXBTC15M&status=open
    const target = KALSHI + url.pathname + url.search;
    try {
      const r = await fetch(target, {
        method: "GET",
        headers: { "User-Agent": "VelasBTC-iPhone/1.0" },
      });
      const body = await r.text();
      return new Response(body, { status: r.status, headers: cors });
    } catch (e) {
      return new Response(JSON.stringify({ error: String(e) }), {
        status: 502,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }
  },
};
