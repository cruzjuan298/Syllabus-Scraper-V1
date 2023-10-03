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
        const formData = new FormData();
        formData.append("pdfFile", input.files[0]);

        try {
            const response = await fetch("/extract-text", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                textInFile = await response.text();
                postInfo();
            } else {
                console.error("Error extracting text from PDF.");
            }
        } catch (error) {
            console.error("Error fetching text from server:", error);
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
                responseDiv.textContent = "Response: " + data.responseInfo;
            } else {
                console.error("Error posting data to the server.");
            }
        } catch (error) {
            console.error("Error posting data to the server:", error);
        }
    }
