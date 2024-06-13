const pdf = require("pdf-parse"); // Hoặc thư viện tương tự
const axios = require("axios");

async function extractTextFromPdf(pdfUrl) {
  const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });
  const pdfBuffer = Buffer.from(response.data, "binary");
  const data = await pdf(pdfBuffer);
  return data.text;
}

module.exports = { extractTextFromPdf };
