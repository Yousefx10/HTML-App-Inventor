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
             html,body{cursor:none;}
             .MEselected{background:green;color:white;}
             .hide{display:none;}
             .alignment-button-center{text-align:center;}
             .alignment-button-right{text-align:right;}
             .working-screen{height:100%}/*this means it will take the full screen in case background color applied*/
             #dropIndicator{box-shadow: 0 10px 15px rgba(0, 0, 0, 0.5), 0 -10px 15px rgba(0, 0, 0, 0.5);}
             
             
            /*
                Selected items to not have pointer mouse :
                [ button ]
            */
           button{cursor:none;}
             </style>
            </head>
            <body id="updateME">
                <div style='display:none;height:3px;background:red;' id='dropIndicator'></div>
                <img alt="screenshot OUTPUT" src="" style="display:none;" id="ScreenshotOutput"/>
<!--Upper is empty, everything moved to bottom.-->
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
            
            
            //replace name FROM HideAllScreens TO "SwitchCurrentScreen"
            function SwitchCurrentScreen(ScreenToBeVisible)
            {
                    const elements = document.querySelectorAll(".working-screen");
                    elements.forEach(function(element) {
                        element.style.display = 'none';
                    });
                    document.getElementById(ScreenToBeVisible).style.display="block";
                    startLoad(ScreenToBeVisible);
            }
            
            function deleteENTIREscreen(screenID)
            {
                document.getElementById("screen"+screenID).remove();
            }
            
            function UpdateBackgroundColor(SelectedScreen,NewColor)
            {
                document.getElementById(SelectedScreen).style.backgroundColor=NewColor;
            }



            const IFRAMEdropIndicator = document.getElementById("dropIndicator");

            function showIndicator(selectedSCREEN,selectedID,StatusAction=false)
            {
            IFRAMEdropIndicator.style.display="block";
            
            if(StatusAction)
                document.getElementById("screen"+selectedSCREEN).insertBefore(IFRAMEdropIndicator, document.getElementById("live"+selectedID));
            else
               document.getElementById("screen"+selectedSCREEN).insertBefore(IFRAMEdropIndicator, document.getElementById("live"+selectedID).nextSibling);  
            }

            function hideIndicator()
            {
                IFRAMEdropIndicator.style.display="none";
            }
            function MoveIndicatorToEnd()
            {
                IFRAMEdropIndicator.parentElement.append(IFRAMEdropIndicator);
            }


            function MoveArrange(ScreenNumber,SelectedKIT)//will be used to move place of kits
            {
                SelectedKIT = document.getElementById("live"+SelectedKIT);
                if(SelectedKIT)//so if it's the first element, it will not through an error
                document.getElementById("screen"+ScreenNumber).insertBefore(SelectedKIT, IFRAMEdropIndicator);

                MoveIndicatorToEnd();
            }

            function ChangeBackground(kitID,NewColor)
            {
                document.getElementById("live"+kitID).style.backgroundColor=NewColor;
            }
            </script>
            
            <script src="project/variables.js"></script>
            <script src="project/actions.js"></script>
            

<!--All Screen Starts From Here-->
            <div id="screen1" class="working-screen"></div>

            <script>
            function startLoad(currentPage)
            {
                document.getElementById(currentPage).appendChild(IFRAMEdropIndicator);
            }
            startLoad("screen1");//when loading the page, the IFRAMEdropIndicator will move to be inside the screen1
            </script>



            <script>
                function ScreenshotIt(ScreenID)
                {

                var currentScreen = document.getElementById("screen"+ScreenID);
                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;


                html2canvas(currentScreen,{
                y: scrollTop,
                width: currentScreen.offsetWidth,
                height: currentScreen.offsetHeight
    }).then(canvas => {
                
                // Convert canvas to a data URL (base64-encoded PNG image)
                
                const dataURL = canvas.toDataURL("image/png");

                parent.ScreenshotResult.src = dataURL;

                parent.ScreenshotNow(true);
            });

                }
            </script>
            <script src="libraries/html2canvas.js"></script>



            <script>

        document.addEventListener('mousemove', (event) => {
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            // Call the parent function to update the cursor position
            window.parent.updateCursorPosition(event);
        });
            </script>
            </body>
          </html>
        `);
        iframeDoc.close(); // Close the document to render content


