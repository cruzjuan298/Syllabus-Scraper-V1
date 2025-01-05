        const postBtn = document.getElementById("post")
        const input = document.getElementById("input")
        const responseDiv = document.getElementById("response")

        responseDiv.classList.add("response-data")
        let textInFile = "";
        const baseUrl = "http://localhost:8383/"

       // input.addEventListener("change", parsePdf)
        postBtn.addEventListener("click", parsePdf)


    async function parsePdf(e) {
        e.preventDefault()

        if (!input.files[0]){
            console.error("No file selected");
            responseDiv.textContent = "Please select a file";
            return;
        }

        const formData = new FormData();
        formData.append("pdfFile", input.files[0]);
        
        try {
            const response = await fetch("http://localhost:8383/extract-text", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                textInFile = await response.text();
                postInfo();
                console.log("Extracted Text:", textInFile);
            } else {
                const errorText = await response.text();
                console.error("Error extracting text from PDF.", errorText);
                responseDiv.textContent = "Error: " + errorText;
                return;
            }
        } catch (error) {
            console.error("Error fetching text from server:", error);
            responseDiv.textContent = "Error fetching text from server." ;
        }
    }

    async function postInfo() {
        if (textInFile === "") {
            return;
        }

        try {
            const res = await fetch(baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    parcel: textInFile,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                console.log("Response from backend:", data)
                responseDiv.textContent = "Response: " + data.responseInfo;
            } else {
                console.error("Error posting data to the server.");
            }
        } catch (error) {
            console.error("Error posting data to the server:", error);
        }
    }
