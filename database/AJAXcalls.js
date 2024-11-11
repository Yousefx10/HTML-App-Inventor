//This File Will Connect And Calls The Database Directly Through PHP.
//Ajax File.

function uploadData(file, UserName,UserID, ProcessName,Informations,anotherInformations) {
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

    if (Informations) {
        formData.append("Informations", Informations);
    }
    if (anotherInformations) {
        formData.append("anotherInformations", anotherInformations);
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

            if (data.error) {
                console.error("Error:", data.error);
                return;
            }

            if(ProcessName=="getting_assets")
                {

                    // Loop through the image paths and display them
                    imageContainer.innerHTML = ''; // Clear any existing images

                    data.forEach(image => {
                        let DivContainer = document.createElement("div");
                        DivContainer.className="DivContainer";


                        let FileNameP = document.createElement("p");
                        FileNameP.classList.add("FileName");
                        FileNameP.textContent=image.assets_name.split("/")[2];
                        FileNameP.setAttribute("onclick", `RenameUploadedIMG(this);`);
                        FileNameP.dataset.details=image.id;//directly stores the ID of the uploaded image.

                        let iconIMG = document.createElement('img');
                        iconIMG.src="media/svg/trash.svg";
                        iconIMG.style.width="30px";
                        iconIMG.alt = image.assets_name.split("/")[2];
                        iconIMG.dataset.details=image.id;//directly stores the ID of the uploaded image.
                        iconIMG.setAttribute("onclick", `DeleteUploadedIMG(this);`);

                        let imgElement = document.createElement('img');
                        imgElement.src = image.assets_name;  // Assuming 'assets_name' is the column storing the image paths
                        imgElement.alt = image.assets_name.split("/")[2];
                        imgElement.classList.add("DialogImages");
                        imgElement.setAttribute("onclick", `PreviewIMG(this);`);

                        DivContainer.appendChild(iconIMG); // Append the image to the container
                        DivContainer.appendChild(imgElement); // Append the image to the container
                        DivContainer.appendChild(FileNameP);
                        imageContainer.appendChild(DivContainer); // Append the Container To The Main DIV

                    });

                    return;
                }
            else if(ProcessName=="DeletsImg")
            {

            }

        })
        .catch(error => {
           // console.error("Error:", error);
        });
}
