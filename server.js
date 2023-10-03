import {createRequire} from "module"

const require = createRequire(import.meta.url)

const express = require("express")
const fileUpload = require("express-fileupload")
const pdfParse = require("pdf-parse")
const app = express()
const port  = 8383

app.use(express.static("public"))
app.use(express.json())
app.use(fileUpload())

app.post("/extract-text", (req, res) => {
    if(!req.files && !req.files.pdfFile){
        req.status(400);
        res.end();
    }
    pdfParse(req.files.pdfFile).then(result => {
        res.send(result.text);
    })
})

app.post("/", async (req, res) => {
    const { parcel } = req.body;


    if (!parcel) {
        return res.status(400).send({ status: "failed" });
    }


    const API_URL = "https://api.openai.com/v1/completions";
    const API_KEY = "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";
    const resOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: "Read this file and only tell me the dates of test, quizez, midterms, exams, and finals?" + parcel,
            max_tokens: 400,
            temperature: 0.2,
            n: 1,
            stop: null
        })
    };


    try {
        const response = await fetch(API_URL, resOptions);
        const responseData = await response.json();


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