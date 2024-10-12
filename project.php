<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <title>Build Up Your App</title>
        <link rel="stylesheet" href="project/project.css"/>
        <link rel="stylesheet" href="project/workspace.css"/>
    </head>
    <body>

<div id='project_container' class="additionalProjectContainer">




    <!--<div class='project_div' id="project_properties" style="display:none">-->
    <div class='project_div' id="project_properties" style="display:none">
        <p id='properties_name'>project_properties</p>

        <div id="newParent">





<button id="unselect" onclick="unFocus();" title="close this window">X</button>
        <label>
            Kit's Value :
        </label>
        <input title="Write A New Value" type="text" oninput="SAVEbtn.disabled=false;" id='properties_value' placeholder='selected_element_text'/>
        <br/>

        <!--hidden element can save current kit's id-->
        <input type="hidden" value="" id="hidden_kitID"/>






        <hr/>
            <span>Kit's Visibility :</span>
            <button id="btn_visible" onclick="change_visibility();this.classList.toggle('btn_unvisible');" title="show or hide the kit">Visible</button>
                <hr/>

                <span id="mainAlignmentSPAN">Text Alignment :</span>
                <span class='btn_alignment btn_alignment-SELECTED' onclick="alignTEXT(1,mainAlignmentSPAN.dataset.alignmentType,this)"id="align1">Left</span>
                <span class='btn_alignment'                        onclick="alignTEXT(2,mainAlignmentSPAN.dataset.alignmentType,this)"id="align2">Center</span>
                <span class='btn_alignment'                        onclick="alignTEXT(3,mainAlignmentSPAN.dataset.alignmentType,this)"id="align3">Right</span>
            <hr/>














            <div class="only-hide only-option" id="only-text">
                <span>[Text Section]</span>
                <hr/>
            </div>
            <div class="only-hide only-option" id="only-button">

                <span>[Button Section]</span>

                <hr/>
            </div>

            <div class="only-hide only-option" id="only-img">


                <span>[Image Section]</span>

                <hr/>

                <label class="upload-btn">
                    Upload Picture
                    <input type="file" accept="image/*" onchange="handleFileUpload(event)">
                </label>

                <hr/>

                <label for="ImageSize">Image Size :</label>
                <select id="ImageSize" onchange="UpdateImgSize(this)">
                  <option value="100%">100% Size</option>
                  <option value="50%">50% Size</option>
                  <option value="200px">Fixed Size</option>
                </select>

                <hr/>



            </div>
            <div class="only-hide only-option" id="only-timer">
                <span>Timer Settings :</span>
                <button onclick="ManageTimer();" id="TimerButton">Timer</button>
                <br/>
                <label for="timerDuration">Interval:</label>
                <input id="timerDuration"type="range" min="1" max="100" value="1"
                oninput="spanRanger.textContent = this.value;GET_DOC_ID('active_kit',hidden_kitID.value).dataset.duration=this.value"/>
                <span id="spanRanger">1</span><span>SEC</span>
                <hr/>
            </div>
<div class="only-hide only-option" id="only-general">
              <label for="ColorDropDown">Kit's Color:</label>
              <select id="ColorDropDown" onchange="UpdateColor(this)">
                <option value="black">Black</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="Gold">Yellow</option>
                <option value="LawnGreen">Green</option>
              </select>
              <hr/>
              <label for="FontSizeDropDown">Font Size :</label>
              <select id="FontSizeDropDown" onchange="UpdateFontSize(this)">
                <option value="x-large">Huge</option>
                <option value="large">Large</option>
                <option value="medium" selected>Medium</option>
                <option value="small">Small</option>
                <option value="x-small">Tiny</option>
                <!-- <option value="custom" id="custom_fontsize">Custom</option>-->
              </select>
              <hr/>
</div>

              <label for="MarginDropDown">Margin :</label>
              <select id="MarginDropDown" onchange="UpdateMargin(this)">
                <option value="20">Large</option>
                <option value="10">Medium</option>
                <option value="5" >Small</option>
                <option value="0" selected>None</option>
              </select>
              <hr/>

              <div>
                  <label>

                      Add Border
                      <input type="checkbox" id="border_checkBox" onchange="EnableBorder(this.checked);">
                  </label>

                  <br/>
<div id="bordersAll" style="display:none">


                  <label for="theBorderType">Border Type :</label>
                  <select id="theBorderType" onchange="haveBORDER(this,1)">
                    <option value="1" selected>Full</option>
                    <option value="2">Underline</option>
                    <option value="3" >Side</option>
                  </select>

                  <hr/>

                  <label for="theBorderColor">Border Color :</label>
                  <select id="theBorderColor" onchange="haveBORDER(this,2)">
                      <option value="black" selected>Black</option>
                      <option value="red">Red</option>
                      <option value="blue" >Blue</option>
                      <option value="yellow" >Yellow</option>
                    </select>

                    <hr/>

                    <label for="theBorderStyle">Border Style :</label>
                    <select id="theBorderStyle" onchange="haveBORDER(this,3)">
                        <option value="solid" selected>Solid</option>
                        <option value="double">Double</option>
                        <option value="ridge" >Ridge</option>
                        <option value="dashed" >Dashed</option>
                      </select>
                      <hr/>

                      <label for="theBorderSize">Border Size :</label>
                      <select id="theBorderSize" onchange="haveBORDER(this,4)">
                          <option value="20px">Huge</option>
                          <option value="10px">Large</option>
                          <option value="5px" selected>Medium</option>
                          <option value="2px" >Small</option>
                        </select>
                        <hr/>
</div>
              </div>

</div>

        <div id="btns">

            <!--REMOVE BUTTON-->
            <button id="Remove_button" onclick="REMOVINGtime();" title="Delete The Entire Kit" disabled>Remove</button>
            <!--REMOVE BUTTON-->


            <!--SAVE BUTTON-->
            <button id="Save_button" onclick="SAVINGtime();" title="Save Your New Changes" disabled>Save</button>
            <!--SAVE BUTTON-->


        </div>
    </div>


    <div class='project_div' id='project_timeline'><p>project_timeline</p>

    </div>



    <div class='project_div' id="project_live">
        <div style="text-align:center;width:17em">
        <button onclick="runTHEproject(this);" Style="width:50%;margin:auto" class="btn-active-start">Acts</button>
        </div>

  <div class="status-bar">
    <div class="left" id="clock">00:00</div>
      <div class="" id="activeDOT"></div>
    <div class="right">Welcome</div>
  </div>



    <img src="media/mockup/iphone.png" alt="Smartphone Frame" class="smartphone-frame">
    <div class="iframe-container">
        <iframe frameborder="0" id="live_iframe" style="flex: 1;height:100%;width:100%;border:0;z-index: 1;"></iframe>
    </div>


    </div>


    <!--In Toolkit section, all the required tools will be here-->
    <div class='project_div' id="project_toolkit" onmouseout="infoParagraph.style.display='none';"><p>project_toolkit</p>
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
    if (screen1.style.transform === 'translateY(-100%)') {
        screen1.style.transform = 'translateY(0)'; // Move screen 1 back
        screen2.style.transform = 'translateY(100%)'; // Move screen 2 off screen
    } else {
        screen1.style.transform = 'translateY(-100%)'; // Move screen 1 up
        screen2.style.transform = 'translateY(0)'; // Move screen 2 into view
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