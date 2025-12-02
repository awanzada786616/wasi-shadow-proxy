export default async function handler(req, res) {
  try {
    const API_KEY = process.env.SHADOW_API_KEY;

    if (!API_KEY) {
      return res.status(500).json({ error: "SHADOW_API_KEY missing in Vercel" });
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

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
