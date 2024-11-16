<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <title>Build Up Your App</title>
        <link rel="stylesheet" href="project/project.css"/>
        <link rel="stylesheet" href="project/workspace.css"/>
        <link rel="stylesheet" href="project/global.css"/>
    </head>
    <body>

    


<!--This is the screen dialog and it's outside the container-->
    <div id="screensPAGE" class="screenPAGEhide">
        <button onclick="AddNewScreen();">Add Screen</button>
        <br/><hr/>

        <button style="color:red" onclick="DeleteScreen();">X</button>
        <select id="selectSCREEN" onchange="SwitchTheScreen(this.value);">
            <option value="1" id="optionScreen1">screen1</option>
        </select>
    <button onclick="RenameScreen();" style="color:red;background:none;border:none;padding:0">
    🖋️
    </button>

    </div>

    <div style="position:absolute;z-index:1;cursor:pointer">
        <img id="RunButton" onclick="runTHEproject();" class="btn-active-start" src="media/svg/play.svg" width="30px" alt="ActButton"/>
    </div>

    <div style="position:absolute;z-index:1;cursor:pointer">
        <img id="Screenshot" onclick="ScreenshotNow();" src="media/svg/screenshot.svg" width="30px" alt="Screenshot"/>
    </div>



    <div id="imgDIALOG">
        <p>
            Choose Picture Or Upload New One.
        </p>

        <label class="upload-btn">
            Upload Picture
            <input type="file" accept="image/*" onchange="handleFileUpload(event)">
        </label>

        <div id="imgArea">

        </div>
     </div>




<div id='project_container' class="additionalProjectContainer">




    <!--<div class='project_div' id="project_properties" style="display:none">-->
    <div class='project_div' id="project_properties" style="display:none">
        <!--<p>project_properties</p>-->
        <input type="text" id='properties_name' onchange="if(this.value!='')updateKITname(this.value);"/>
        <br/><hr/>

<?php
    include('project/blocks/properties.html');
?>


        <div id="btns">

            <!--REMOVE BUTTON-->
            <button id="Remove_button" onclick="REMOVINGtime({});" title="Delete The Entire Kit" disabled>Remove</button>
            <!--REMOVE BUTTON-->


            <!--SAVE BUTTON-->
            <button id="Save_button" onclick="SAVINGtime();" title="Save Your New Changes" disabled>Save</button>
            <!--SAVE BUTTON-->


        </div>
    </div>


    <div class='project_div' id='project_timeline'><p id="timelineTITLE">project_timeline</p>

                <p id="screenSETTINGS" onclick="showScreenProperties();" data-only="screen" data-id="1" data-name="Screen1" data-background="#f0f0f0">Current Screen Settings Properties</p>

        <div id="screen1" class="timelineSCREEN">
            <div id="drop-indicator" style="display: none;">
                <div></div>
                <!-- Having Small Issue With indicator for the first time.  -->
            </div>
        </div>

    </div>




    <div class='project_div' id="project_live">


  <div class="status-bar" id="con">
    <div class="left" id="clock">00:00</div>
      <div class="" id="activeDOT"></div>
    <div class="right noselect" onclick="ScreensManager();" id="screenBUTTON" role="button" tabindex="0">screen1</div>
  </div>



    <img src="media/mockup/iphone.png" alt="Smartphone Frame" class="smartphone-frame" id="smartphone"/>
    <div style="width:17.5em;">
        <!--will use it to add informations later, maybe screen controls?-->
        <!--i think maybe i will use it to add EXPORT button to save and download the project-->
        <p style="font-size:10px;margin: 0;">Version v.0.1.4</p>
    </div>
    <div class="iframe-container">
        <iframe frameborder="0" id="live_iframe" style="flex: 1;height:100%;width:100%;border:0;z-index: 1;"></iframe>
        <div id="overlay" >
            <img alt="" id="ScreenshotResult" width="251px" height="520px" style="visibility: hidden;"/>
        </div> <!-- Overlay for drag-and-drop -->
    </div>


    </div>


    <!--In Toolkit section, all the required tools will be here-->
    <div class='project_div noselect' id="project_toolkit" onmouseout="infoParagraph.style.display='none';"><p>project_toolkit</p>
        <!--
        List of registered [elements] i'll add:
        -Label   [for short text].
        -text    [for longer text].
        -picture [for inserting images].
        -button  [for adding clickable buttons].
        -input   [for allowing user to type text].
        -switch   [for creating a switcher on and off].

        List of registered [functions] i'll add:
        -Switch Page[Done]
        -Storage
        -->

    <?php
        include('project/blocks/toolkit.html');
    ?>
    </div>




</div>
<button class="functionBTN" onclick="switchScreen();">
Code Workspace⬇️
<div class="tooltip">ALT + 1</div>
</button>

<?php include "project/blocks/workspace.html"?>

<script>
        const screen1 = document.getElementById('project_container');
        const screen2 = document.getElementById('CodeWorkspace');
function switchScreen()
{
    // Toggle classes to switch screens
    if (screen1.style.transform === 'translateY(-100%)') {//SHOWS PROJECT screen
        screen1.style.transform = 'translateY(0)'; // Show Screen1.
        screen2.style.transform = 'translateY(100%)'; //Hide Screen2.
    } else {//SHOWS WORKSPACE screen
        screen1.style.transform = 'translateY(-100%)';//Hide Screen1.
        screen2.style.transform = 'translateY(0)'; // Show Screen2.
        ScreensManager(false,true);
    }

    //Hiding, Or Showing The Act Button, maybe will need better enhance in the future to remove the animation.
    RunButton.parentElement.classList.toggle("ToggleLikeSwitchScreen");
    ScreenshotButton.parentElement.classList.toggle("ToggleLikeSwitchScreen");
}
</script>

<script src="project/variables.js"></script>
<script src="project/actions.js"></script>
<script src="project/iframe.js"></script>
<script src="project/kit.js"></script>
<script src="project/project.js"></script>
<script src="project/workspace.js"></script>

<script src="project/interpreter.js"></script>
<script src="database/AJAXcalls.js"></script>
<script src="libraries/html2canvas.js"></script>





<div class="custom-cursor" style="z-index: 100;"></div>
    <script>
        const cursor = document.querySelector('.custom-cursor');

        // Show cursor on first movement and remove listener
        const onFirstMouseMove = (e) => {
            cursor.style.opacity = 1;
            updateCursorPosition(e);
            document.removeEventListener('mousemove', onFirstMouseMove);
        };

        // Update cursor position
        const updateCursorPosition = (e) => {
            if(!isMouseInIframe)
                {
                    cursor.style.left = `${e.clientX - cursor.offsetWidth / 2}px`;
                    cursor.style.top = `${e.clientY - cursor.offsetHeight / 2}px`;
                }


        };

        // Initialize with one-time listener to show the cursor on first movement
        document.addEventListener('mousemove', onFirstMouseMove);

        // Listen for mouse movement to update position
        document.addEventListener('mousemove', updateCursorPosition);

        // Add or remove 'hovered' class based on hovering over .hover-effect elements
        document.addEventListener('mouseover', (e) => {
        // Check if the hovered element or any of its parents has the 'hover-effect' class
        const targetElement = e.target;
        const parentWithHoverEffect = targetElement.closest('.hover-effect');

        if (parentWithHoverEffect) {
        // Apply the 'hovered' class to the cursor when hovering over the element or its children
        cursor.classList.add('hovered');
    } 
            if (e.target.classList.contains('hover-effect')) {
                
            }
        });

        document.addEventListener('mouseout', (e) => {

        // Check if the hovered element or any of its parents has the 'hover-effect' class
        const targetElement = e.target;
        const parentWithHoverEffect = targetElement.closest('.hover-effect');

        if (parentWithHoverEffect) {
        // Apply the 'hovered' class to the cursor when hovering over the element or its children
        cursor.classList.remove('hovered');
    } 
            if (e.target.classList.contains('hover-effect')) {
                
            }
        });

        //live_iframe
        let isMouseInIframe = false;



        // Detect when the mouse leaves the iframe
        live_iframe.addEventListener('mouseleave', () => {
            isMouseInIframe = false;
            console.log('Mouse left the iframe');
        });

// When the mouse moves inside the iframe
live_iframe.addEventListener('load', () => {
    const iframeDoc = live_iframe.contentDocument || live_iframe.contentWindow.document;

    // Add mousemove event inside iframe
    iframeDoc.addEventListener('mousemove', (event) => {
        const rect = live_iframe.getBoundingClientRect(); // Get iframe position
            const mouseX = rect.left + event.clientX; // Adjust for iframe position
            const mouseY = rect.top + event.clientY;  // Adjust for iframe position

            // Update cursor position, centered around the mouse pointer
            cursor.style.left = `${mouseX - cursor.offsetWidth / 2}px`;
            cursor.style.top = `${mouseY - cursor.offsetHeight / 2}px`;

    });
});
    </script>
    </body>
</html>