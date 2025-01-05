import {createRequire} from "module"
import dotenv from "dotenv"
import cors from "cors";

dotenv.config();
const API_KEY = process.env.API_KEY;

const require = createRequire(import.meta.url)

const express = require("express")
const fileUpload = require("express-fileupload")
const pdfParse = require("pdf-parse")
const app = express()
const port  = 8383

const corsOptions = {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.static("public"))

app.use(express.json())

app.use(fileUpload())

app.post("/extract-text", (req, res) => {
    console.log("Recieved request:", req.files);

    if(!req.files || !req.files.pdfFile){
        console.log("No file uploaded")
        return res.status(400).send("No file uploaded")
    }
    pdfParse(req.files.pdfFile.data)
        .then(result => res.send(result.text))
        .catch(err => {
            console.error("Error Parsing PDF:", err);
            res.status(500).send("Error parsing PDF.")
        })
})

app.post("/", async (req, res) => {
    console.log("POST request recieved");

    const { parcel } = req.body;

    console.log("Parcel content:", parcel);

    if (!parcel) {
        return res.status(400).send({ status: "failed" });
    }


    const API_URL = "https://api.openai.com/v1/completions";
    const resOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages :[
                {
                    role: "system",
                    content: "You are a helpful assistant"
                },
                {
                    role: "user",
                    content : "Read this file and only tell me the dates of test, quizzes, midterms, exams, and finals:" + parcel
                }
            ],
            max_tokens: 400,
        })
    };


    try {

        const response = await fetch(API_URL, resOptions);
        const responseData = await response.json();
        console.log("Open API respone: ", responseData);

        if (parcel === null) {
            console.log("no text");
        } else {
            const responseInfo = responseData.choices[0].text.trim();
            console.log(responseInfo);
            res.status(200).json({ status: "received", responseInfo });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error" });
    }
});


app.listen(port, () => console.log(`Server has started listening on server ${port}`));