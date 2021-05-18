import axios from "axios";

export default axios.create({
    baseURL : "https://api.unsplash.com",
    headers: {
        "Accept-Version": "v1",
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEY}`,
      },
})