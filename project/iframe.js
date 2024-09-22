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
             .hide{display:none;}
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
            function REMOVEkit(kitID)
            {
                document.getElementById("live"+kitID).remove();
            }
            function TOGGLEhiding(kitID)
            {
                document.getElementById("live"+kitID).classList.toggle('hide');
            }

            function kitALIGNMENT(kitID,NEWalignment)
            {
                const NEWalignment_result = NEWalignment === "1" ? "left" :
                                            NEWalignment === "2" ? "center" :
                                            NEWalignment === "3" ? "right" :
                                           "left";//default answer
                document.getElementById("live"+kitID).style.textAlign = NEWalignment_result;
            }
            </script>
            </body>
          </html>
        `);
        iframeDoc.close(); // Close the document to render content


