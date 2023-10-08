# Syllabus-Scraper-V1

A convient way to get data from your syllabus(or any pdf) using the chatgpt api

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Key-Notes](#key-notes)
- 
## Introduction

Chatgpt is changing the way we use technology. It's no doubt it's a very useful and can be integrated in many ways. I had the idea of combining pdf parsing and the chatgpt api to create an ai driven pdf scraper.

## Technologies Used
JavaScript (Node.js), Express.js, pdf-parse library, OpenAI GPT-3 (API key required)

## Getting Started
To run this project locally, follow these steps:

Clone the Repository: Clone this repository to your local machine using git clone.

Install Dependencies: Navigate to the project directory and run npm install to install the necessary dependencies.

Set Up OpenAI API Key: You'll need an API key from OpenAI to use their services. Once you have it, replace API_KEY in the code with your actual API key.

Run the Application: Use npm start to start the Express.js server. The application will run on http://localhost:8383.

Access the Web Interface: Open a web browser and go to http://localhost:8383/public/index.html. You'll find an interface where you can upload PDF files and initiate text extraction and processing.

## Usage
PDF Text Extraction:

Click the "Choose File" button to upload a PDF document.
Click the "Extract Text" button to extract text from the uploaded PDF.
The extracted text will be displayed below the buttons.
AI Text Processing:

After extracting text from a PDF, click the "Process Text" button to send the extracted text to the OpenAI GPT-3 model.
The AI will identify and return dates related to tests, quizzes, midterms, exams, and finals within the text.
The processed results will be displayed below the buttons.

## Key-Notes
-Ensure that you have a stable internet connection to use the OpenAI GPT-3 API.
-Be aware of OpenAI's terms of service and usage policies when using their API.
