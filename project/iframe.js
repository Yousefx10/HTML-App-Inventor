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
             .alignment-button-center{text-align:center;}
             .alignment-button-right{text-align:right;}
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
            function kitALIGNMENTcontrol(kitID,NEWalignment)
            {

                const targetElement = document.getElementById("live"+kitID);
                const parentElement = targetElement.parentNode;

                const NEWalignment_result = NEWalignment === "1" ? "left" :
                                            NEWalignment === "2" ? "center" :
                                            NEWalignment === "3" ? "right" :
                                           "left";//default value

               if (parentElement.classList.contains("parent_here"))
                {
                        if(NEWalignment_result=="left")
                            {

                                parentElement.parentNode.replaceChild(targetElement, parentElement);
                                return;
                            }

                            parentElement.classList.remove("alignment-button-center");
                            parentElement.classList.remove("alignment-button-right");
                            parentElement.classList.add("alignment-button-"+NEWalignment_result);

                }
                else{
                        const newParent = document.createElement("div");
                        newParent.classList.add("alignment-button-"+NEWalignment_result);
                        newParent.classList.add("parent_here");// a tag to know that it's already have a parent

                        //Replace the target element with the new parent
                        targetElement.parentNode.replaceChild(newParent, targetElement);

                        //Append the target element as a child of the new parent
                        newParent.appendChild(targetElement);
                    }
            }
            function UpdateImgSize(kitID,NewSize)
            {
                document.getElementById("live"+kitID).style.maxWidth=NewSize;
            }

            function UpdateColor(kitID,newColor)
            {
                document.getElementById("live"+kitID).style.color=newColor;
            }

            function UpdateFontSize(kitID,NewSize)
            {
                document.getElementById("live"+kitID).style.fontSize=NewSize;
            }
             function UpdateMargin(kitID,NewSize)
            {
                document.getElementById("live"+kitID).style.margin=NewSize+"px";
            }
            function UPDATEborder(kitID,BorderSize,BorderStyle,BorderColor)
            {

                if(BorderSize=="0")//this should clear the added border and set it back to the default value
                    document.getElementById("live"+kitID).style.border = "";
                else
                    {
                    document.getElementById("live"+kitID).style.borderWidth = BorderSize;
                    document.getElementById("live"+kitID).style.borderStyle = BorderStyle;
                    document.getElementById("live"+kitID).style.borderColor = BorderColor;
                    }
            }
            </script>
            
            <script src="project/variables.js"></script>
            <script src="project/actions.js"></script>
            </body>
          </html>
        `);
        iframeDoc.close(); // Close the document to render content


