//default code to write to iframe
    let iframe = document.getElementById("live_iframe");
        let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        // Write HTML content inside the iframe
        iframeDoc.open();
        iframeDoc.write(`
          <html>
            <head><meta charset="UTF-8"/>
             <style>
             *{margin:0}
             .MEselected{background:green;color:white;}
             </style>
            </head>
            <body id="updateME">




            <script>
            function RemoveALLselected()
            {
            const classNameToRemove = 'MEselected'; //class need to be removed

            // Select all elements that have the specified class
            const elementsWithClass = document.querySelectorAll('.' + classNameToRemove);

            // Iterate over each element and remove the class
            elementsWithClass.forEach(element => {
                element.classList.remove(classNameToRemove);
            });

            }


            function UPDATEcurrentCONTENT(kitID,newContent)
            {
                document.getElementById("live"+kitID).innerHTML=newContent;
            }
            </script>
            </body>
          </html>
        `);
        iframeDoc.close(); // Close the document to render content


