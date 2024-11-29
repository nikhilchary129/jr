import express from 'express';
import path from 'path';
import multer from 'multer';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';



// Get the current directory path in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Allow cross-origin requests from frontend (adjust if necessary)
app.use(cors({
  origin: 'http://localhost:8080', // Frontend URL
}));

// Replace with your actual Google Cloud API key
const apiKey = 'AIzaSyD8DMN__y4IgU2szkcXRiqLLyGBLi3hOrw';

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Serve static files from the "public" folder (e.g., HTML, JS, CSS)
app.use(express.static(path.join(__dirname, 'public')));


// Ensure the 'uploads' directory exists, or create it
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);  // Create uploads folder if it doesn't exist
  console.log('Uploads directory created');
}

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);  // Save to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));  // Unique filename
  }
});

const upload = multer({ storage: storage });

// Serve HTML form (or front-end) for testing file upload
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));  // Serve index.html
});
//public\oil.html
app.get("/oil",(req,res)=>{
  res.sendFile(path.join(__dirname,'public/oil.html'))
})
app.get("/dry",(req,res)=>{
  res.sendFile(path.join(__dirname,'public/dryskin.html'))
})
app.get("/acne",(req,res)=>{
  res.sendFile(path.join(__dirname,'public/acne.html'))
})
//E:\jr\public\combination.html
app.get("/combination",(req,res)=>{
  res.sendFile(path.join(__dirname,'public/combination.html'))
})
// Handle image upload and AI model processing
app.post("/upload", upload.single('image'), async (req, res) => {
  try {
    // Ensure file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Get the path to the uploaded file
    const imagePath = req.file.path;
    console.log('Image uploaded:', imagePath);

    // Read image and convert it to base64
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    console.log('Base64 Image:', base64Image.substring(0, 100)); // Log first 100 chars for sanity check

    // Define your prompt for the AI model
    const prompt = "describe the skin situation I'm in  in html wraped in a h2 tag without body head and styles";

    // Construct the image object expected by your model
    const image = {
      inlineData: {
        data: base64Image,
        mimeType: 'image/png',  // Adjust MIME type if the image is not PNG
      }
    };

    // Call the model's generateContent function
    const result = await model.generateContent([prompt, image]);
    //console.log('Gemini API Result:', result.response.text());
    const prompt2 = result.response.text() + "breakdown this into skin type: oily, dry, combination, sensitive in plain text";
    const result2 = await model.generateContent(prompt2);

    const prompt3 = result2.response.text() + " give just keywords of type of products to used in plain text";
    const result3 = await model.generateContent(prompt3);
    const prompt4 = result.response.text() + result2.response.text() + result3.response.text() + "with this info genrate a daily skin care routine in html wraped in a div without body head and styles"
    const result4 = await model.generateContent(prompt4);
   // console.log("r2  ", result2.response.text());

    console.log("routine", result4.response.text());

    const prompt5 = result4.response.text() + "extract only these following kwywords Cleansers,Exfoliants,Toners,Serums,Moisturizers,Sunscreens,Acne Treatments,Anti-Aging Products,Face Masks,Eye Creams,Spot Treatments,Hyperpigmentation Treatment   --> remove any adition info in barces in plain text"

    const result5 = await model.generateContent(prompt5);
    // Respond with the result from the model
   // console.log(result5.response.text())
    let keyofresult = result5.response.text();
    const keyword = ["Cleansers", "Exfoliants", "Toners", "Serums", "Moisturizers", "Sunscreens", "Acne Treatments", "Anti-Aging Products", "Face Masks",
      "Eye Creams", "Spot Treatments", "Hyperpigmentation Treatment"];

      let words = Array.from(new Set(keyofresult.split(',').map(word => word.trim())));

    res.json({
      descriptiom: result.response.text(),
      routine: result4.response.text(),
      keyword: words
    });
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
  
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
