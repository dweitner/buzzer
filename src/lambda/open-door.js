import axios from "axios";
export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const response = await axios.post("http://74.71.87.249/open");
    const data = response.data;
    return {
      statusCode: response.status,
      body: JSON.stringify({ msg: data, isError: false }),
    };
  } catch (error) {
    console.log(error); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message, isError: true }),
    };
  }
}
