const express = require("express");
const app = express();
const cors = require('cors');
const axios = require("axios");
require('dotenv').config()

// OpenAI API set up
const apiUrl = "https://api.openai.com/v1/engines/text-curie-001/completions";
const key = process.env.OPENAI_API_KEY
const authorizationKey = `Bearer ${key}`
const headersApi = {
    "Content-Type": "application/json",
    "Authorization": authorizationKey
};

// Middleware
app.use(express.json())
app.use(cors())

// openAI API request
app.post('/generate', (req, res) => {
    const prompt = req.body.prompt
    const apiPrompt = `Brainstorm some ideas combining ecommerce and ${prompt}`
    const dataApi = JSON.stringify({
        "prompt": apiPrompt,
        "max_tokens": 50,
        "temperature": 0.6,
        "top_p": 1,
        "frequency_penalty": 1,
        "presence_penalty": 1
    })
    axios({
        method: "post",
        url: apiUrl,
        headers: headersApi,
        data: dataApi
    })
        .then(response => {
            apiResponse = response.data.choices[0].text;
            res.status(201).send(apiResponse)
        })
        .catch(error => {
            console.log(`error sending request to API: ${error}`)
        })
})


app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});