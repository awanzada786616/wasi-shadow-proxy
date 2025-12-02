export default async function handler(req, res) {
  try {
    const API_KEY = "ec647682e697d8639504a7f3541680e1";

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
