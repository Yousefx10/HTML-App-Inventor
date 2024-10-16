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
            <option value="1" id="optionScreen1">Screen1</option>
        </select>
    <button onclick="RenameScreen();" style="color:red;background:none;border:none;padding:0">
    🖋️
    </button>

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

                <p id="screenSETTINGS" onclick="showScreenProperties();" data-only="screen" data-id="1" data-background="#f0f0f0">Current Screen Settings Properties</p>

        <div id="screen1" class="timelineSCREEN">

        </div>
    </div>




    <div class='project_div' id="project_live">
        <div style="text-align:center;width:17em">
        <button onclick="runTHEproject(this);" Style="width:50%;margin:auto" class="btn-active-start">Acts</button>
        </div>

  <div class="status-bar" id="con">
    <div class="left" id="clock">00:00</div>
      <div class="" id="activeDOT"></div>
    <div class="right noselect" onclick="ScreensManager();" id="screenBUTTON" role="button" tabindex="0">Screen1</div>
  </div>



    <img src="media/mockup/iphone.png" alt="Smartphone Frame" class="smartphone-frame"/>
    <div style="width:17.5em;">
        <!--will use it to add informations later, maybe screen controls?-->
        <!--i think maybe i will use it to add EXPORT button to save and download the project-->
        <p style="font-size:10px">Version v.0.1.1</p>
    </div>
    <div class="iframe-container" id="target">
        <iframe frameborder="0" id="live_iframe" style="flex: 1;height:100%;width:100%;border:0;z-index: 1;"></iframe>
        <div id="overlay"></div> <!-- Overlay for drag-and-drop -->
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
        -Switch Page
        -Storage
        -->

    <?php
        include('project/blocks/toolkit.html');
    ?>
    </div>




</div>

<button class="functionBTN" onclick="switchScreen();">
Code Workspace⬇️
</button>

<?php include "project/blocks/workspace.html"?>

<script>
function switchScreen()
{
    const screen1 = document.getElementById('project_container');
    const screen2 = document.getElementById('CodeWorkspace');

    // Toggle classes to switch screens
    if (screen1.style.transform === 'translateY(-100%)') {//SHOWS PROJECT screen
        screen1.style.transform = 'translateY(0)'; // Move screen 1 back
        screen2.style.transform = 'translateY(100%)'; // Move screen 2 off screen
    } else {//SHOWS WORKSPACE screen
        screen1.style.transform = 'translateY(-100%)'; // Move screen 1 up
        screen2.style.transform = 'translateY(0)'; // Move screen 2 into view
        ScreensManager(false,true);
    }
}
</script>

<script src="project/variables.js"></script>
<script src="project/actions.js"></script>
<script src="project/iframe.js"></script>
<script src="project/project.js"></script>
<script src="project/workspace.js"></script>
<script src="project/kit.js"></script>
    </body>
</html>