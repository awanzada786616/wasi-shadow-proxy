export default async function handler(req, res) {
  const { action, service, country, id, status } = req.query;

  const API_KEY = process.env.OTPGET_API_KEY;  // Secure

  try {
    let url = "";

    // Build URL according to action
    switch (action) {
      case "getNumber":
        url = `http://otpget.com/stubs/handler_api.php?action=getNumber&api_key=${API_KEY}&service=${service}&country=${country}`;
        break;

      case "getStatus":
        url = `http://otpget.com/stubs/handler_api.php?action=getStatus&api_key=${API_KEY}&id=${id}`;
        break;

      case "setStatus":
        url = `http://otpget.com/stubs/handler_api.php?action=setStatus&api_key=${API_KEY}&id=${id}&status=${status}`;
        break;

      case "getCountries":
        url = `http://otpget.com/stubs/handler_api.php?action=getCountries&api_key=${API_KEY}`;
        break;

      case "getServices":
        url = `http://otpget.com/stubs/handler_api.php?action=getServices&api_key=${API_KEY}&country=${country}`;
        break;

      default:
        return res.status(400).json({ error: "Invalid action" });
    }

    // Fetch API
    const response = await fetch(url);
    const text = await response.text();

    res.status(200).json({ success: true, raw: text });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
}
