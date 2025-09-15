import axios from "axios"

export const linkedinAuthVerification = async (req, res) => {

  const { code } = req.params

  try {

    const tokenResponse = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const tokenData = tokenResponse.data;

    const profileResponse = await axios.get(
      "https://api.linkedin.com/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      }
    );

    const profile = profileResponse.data;
    res.json(profile);
    
  } catch (error) {
    console.error(
      "❌ Error during LinkedIn OAuth:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "OAuth failed" });
  }

}