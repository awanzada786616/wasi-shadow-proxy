import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const API_KEY = process.env.SHADOW_API_KEY;

    if (!API_KEY) {
      return res.status(500).json({ error: "API key missing on server" });
    }

    const endpoint = req.query.endpoint || "";
    const params = req.query.params ? `?${req.query.params}` : "";

    const url = `https://api.shadowotp.com/v1/${endpoint}${params}`;

    const response = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${API_KEY}`
      }
    });

    const data = await response.json();
    res.status(200).json(data);

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
