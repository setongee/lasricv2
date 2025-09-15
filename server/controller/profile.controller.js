export const checkLinkedInProfileExists = async (req, res) => {

    console.log("check");

const {url} = req.body;

console.log(url);

  try {
    const response = await fetch(url, { method: "GET", redirect: "follow" });
    // Profile exists if final URL is the same as the input URL
    const exists = response.ok
    res.json({ exists });
  } catch (error) {
    // res.send({exists : false})
  }
}