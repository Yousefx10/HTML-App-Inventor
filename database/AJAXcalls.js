//This File Will Connect And Calls The Database Directly Through PHP.
//Ajax File.

function uploadData(file, UserName,UserID, ProcessName) {
    const formData = new FormData();

    // If a file is passed, append it to the FormData object
    if (file) {
        formData.append("file", file);
    }

    // Append other parameters directly to the FormData
    if (UserName) {
        formData.append("UserName", UserName);
    }

    if (UserID) {
        formData.append("UserID", UserID);
    }

    if (ProcessName !== undefined) {  // Check to make sure it's not undefined
        formData.append("PROCESSname", ProcessName);
    }

    // Send the data using fetch
    fetch("database/AJAXresponse.php", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            //document.getElementById('message').textContent = data.message;
            console.log(data.message);
        })
        .catch(error => {
           // console.error("Error:", error);
        });
}
