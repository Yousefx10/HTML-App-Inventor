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
             .working-screen{}
             </style>
            </head>
            <body id="updateME">
<!--First Empty Place in body it now it will be empty-->
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

             //merging kitALIGNMENT with kitALIGNMENTcontrol
            function kitALIGNMENT(kitID,kitTYPE,NEWalignment)
            {
                const NEWalignment_result = NEWalignment === "1" ? "left" :
                                            NEWalignment === "2" ? "center" :
                                            NEWalignment === "3" ? "right" :
                                           NEWalignment.toLowerCase();//default answer
               const targetElement = document.getElementById("live"+kitID);
                
               
                if(kitTYPE == "text")
                    targetElement.style.textAlign = NEWalignment_result;
                else {
                        const parentElement = targetElement.parentNode;
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
            
            
            
            function AddNewScreen(screenID,screenName)
            {
                
            }
            function HideAllScreens(ScreenToBeVisible)//this function should be RE NAMED because it's switching screens not hiding them
            {
                    const elements = document.querySelectorAll(".working-screen");
                    elements.forEach(function(element) {
                        element.style.display = 'none';
                    });
                    document.getElementById(ScreenToBeVisible).style.display="block";
            }
            
            function deleteENTIREscreen(screenID)
            {
                document.getElementById("screen"+screenID).remove();
            }
            </script>
            
            <script src="project/variables.js"></script>
            <script src="project/actions.js"></script>
            
            
<!--All Screen Starts From Here-->
            <div id="screen1" class="working-screen"></div>
            </body>
          </html>
        `);
        iframeDoc.close(); // Close the document to render content


