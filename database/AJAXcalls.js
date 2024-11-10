//This File Will Connect And Calls The Database Directly Through PHP.
//Ajax File.

function uploadData(file, textParam, ProcessName) {
    const formData = new FormData();

    // If a file is passed, append it to the FormData object
    if (file) {
        formData.append("file", file);
    }

    // Append other parameters directly to the FormData
    if (textParam) {
        formData.append("text", textParam);
    }

    if (ProcessName !== undefined) {  // Check to make sure it's not undefined
        formData.append("PROCESSname", ProcessName);
    }

    // Send the data using fetch
    fetch("AJAXresponse.php", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('message').textContent = data.message;
        })
        .catch(error => {
            console.error("Error:", error);
        });
}
