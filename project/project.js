//THIS CONTROL IS MADE FOR MAKING IT EASIER TO HAVE THE CONTROL ID
function GET_THE_KIT_ID(prefix_name,kitID){
    return document.getElementById(prefix_name+kitID);
}

window.onload = function() {

    //will use the ON LOAD func to re assign the HINTS to all the kit's
        const elements = document.querySelectorAll('.hint');
        elements.forEach(element => {
            element.dataset.hint=kit_HINTS[element.dataset.hint];
            console.log("what the heck");
        });
    
};


//[FUNCTIONS] Area
//this function runs when a new kit got born.
function addKIT(kit_type)
{
    //[START] Main element that will have the content for the new added element.
    let newKIT = document.createElement('p');
        newKIT.classList.add('project_timeline_kit');
        newKIT.id='active_kit' + COUNT_KIT_PROGRESS;
        let currentkitID = COUNT_KIT_PROGRESS;
    //[END] Main element that will have the content for the new added element.

        newKIT.setAttribute("data-visible","1");
        newKIT.setAttribute("data-alignment","1");
        newKIT.setAttribute("data-color","black");
        newKIT.setAttribute("data-size","medium");
        newKIT.setAttribute("data-margin","0");
        newKIT.setAttribute("data-only","text");

        newKIT.setAttribute("data-border","0");
        newKIT.setAttribute("data-border-type","1");
        newKIT.setAttribute("data-border-color","black");
        newKIT.setAttribute("data-border-style","solid");
        newKIT.setAttribute("data-border-size","2px");

        //this i can pass parameters without EXECUTE the function FROM FIRST TIME.
        newKIT.onclick = () => timeline_properties(currentkitID,newKIT.innerHTML);



    //Naming the kit before adding it to the timeline box.
    switch(kit_type){

        case 1:
            active_kit.push([COUNT_KIT_PROGRESS,NameKit(kit_type)]);
            newKIT.textContent = phrase1 + element1 ;
            newKIT.setAttribute("data-size","large");//specific font size for the label
            break;

        case 2:
            active_kit.push([COUNT_KIT_PROGRESS,NameKit(kit_type)]);
            newKIT.textContent = phrase1 + element2 ;
            break;
        case 3:
            active_kit.push([COUNT_KIT_PROGRESS,NameKit(kit_type)]);
            newKIT.textContent = phrase2 ;
            newKIT.setAttribute("data-only","button");
            break;
        case 4:
            active_kit.push([COUNT_KIT_PROGRESS,NameKit(kit_type)]);
            newKIT.textContent = phrase3 ;
            newKIT.setAttribute("data-only","img");
            newKIT.setAttribute("data-size","100%");
            break;
    }


    //showing the current ARRAY that contains the kit's
    // console.log(active_kit);
    //finally, adding the kit to the timeline box.
    project_timeline.appendChild(newKIT);
    live_iframe_add(kit_type,newKIT.textContent,COUNT_KIT_PROGRESS);
    //increasing the id counter.
    COUNT_KIT_PROGRESS++;
}

function NameKit(kit_num)
{
    //kit type instructions :
    //1 : label
    //2 : text
    //3 : Button
    //4 : Picture

    switch(kit_num){
        case 1:
            return element1;
            break;
        case 2:
            return element2;
            break;
        case 3:
            return element3;
            break;
        case 4:
            return element4;
            break;
    }
}



//this function manages timeline properties, and it occur everytime original kit get pressed
function timeline_properties(current_kit,current_details)
{

    properties_value.value =current_details;
    properties_name.innerHTML =current_kit;

    //updating THE HIDDEN INPUT value for the currently selected kitID
    hidden_kitID.value=current_kit;

    LIVE_select_kit(current_kit);

    TimeLine_RemoveALLselected();//to remove current/previous selected timelineKIT

    GET_THE_KIT_ID("active_kit",current_kit).classList.add('MEselected');

    let current_visible_status = GET_THE_KIT_ID("active_kit",current_kit).dataset.visible;
    if(current_visible_status==1){
        document.getElementById("btn_visible").classList.remove('btn_unvisible');

    }
    else{
        document.getElementById("btn_visible").classList.add('btn_unvisible');

    }


    let current_alignment_status = document.getElementById("active_kit"+current_kit).dataset.alignment;
    if(document.getElementById("active_kit"+current_kit).dataset.only=="button")//alignment for button
        reSHOWINGcorrectAlign(document.getElementById("alignBTN"+current_alignment_status));
    else if(document.getElementById("active_kit"+current_kit).dataset.only=="img")
        reSHOWINGcorrectAlign(document.getElementById("alignIMG"+current_alignment_status));
    else//text alignment
        reSHOWINGcorrectAlign(document.getElementById("align"+current_alignment_status));



    let current_color = document.getElementById("active_kit"+current_kit).dataset.color;
    document.getElementById('ColorDropDown').disabled=true;
    document.getElementById('ColorDropDown').value = current_color;
    document.getElementById('ColorDropDown').disabled=false;

    let current_size = document.getElementById("active_kit"+current_kit).dataset.size;
    document.getElementById('FontSizeDropDown').disabled=true;
    document.getElementById('FontSizeDropDown').value = current_size;
    document.getElementById('FontSizeDropDown').disabled=false;

    let current_img_size = document.getElementById("active_kit"+current_kit).dataset.size;
    document.getElementById('ImageSize').disabled=true;
    document.getElementById('ImageSize').value = current_img_size;
    document.getElementById('ImageSize').disabled=false;

    let current_margin = document.getElementById("active_kit"+current_kit).dataset.margin;
    document.getElementById('MarginDropDown').disabled=true;
    document.getElementById('MarginDropDown').value = current_margin;
    document.getElementById('MarginDropDown').disabled=false;



//BORDER AREA
let current_Border_status = document.getElementById("active_kit"+current_kit).dataset.border;


if(current_Border_status=="1")
    bordersCHECKbox.checked=true;
    else
        bordersCHECKbox.checked=false;

    EnableBorder(bordersCHECKbox.checked);



let current_BorderType = document.getElementById("active_kit"+current_kit).dataset.borderType;
        document.getElementById('theBorderType').disabled=true;
        document.getElementById('theBorderType').value = current_BorderType;
        document.getElementById('theBorderType').disabled=false;

        let current_BorderColor = document.getElementById("active_kit"+current_kit).dataset.borderColor;
        document.getElementById('theBorderColor').disabled=true;
        document.getElementById('theBorderColor').value = current_BorderColor;
        document.getElementById('theBorderColor').disabled=false;

        let current_BorderStyle = document.getElementById("active_kit"+current_kit).dataset.borderStyle;
        document.getElementById('theBorderStyle').disabled=true;
        document.getElementById('theBorderStyle').value = current_BorderStyle;
        document.getElementById('theBorderStyle').disabled=false;


        let current_BorderSize = document.getElementById("active_kit"+current_kit).dataset.borderSize;
        document.getElementById('theBorderSize').disabled=true;
        document.getElementById('theBorderSize').value = current_BorderSize;
        document.getElementById('theBorderSize').disabled=false;

//THIS LOOP IS TO HIDE ALL PROPERTIES THAT "MIGHT BE ONLY GOOD WITH SPECIFIC KIT".
    const elements = document.querySelectorAll('.only-option');
    elements.forEach(element => {
        element.classList.add("only-hide");
    });
//THIS LINE HELPS TO ONLY SHOW THE "PROPERTIES" THAT'S ONLY GOOD FOR INDIVIDUAL KIT.
    document.getElementById("only-"+GET_THE_KIT_ID("active_kit",current_kit).dataset.only)
        .classList.remove("only-hide");

   //this line is made only to check whether the "general" properties like [font-size AND color] are needed for the current kit
    let checkGENERAL_only_value =GET_THE_KIT_ID("active_kit",current_kit).dataset.only;
    if( checkGENERAL_only_value =="text" || checkGENERAL_only_value =="button"){
        document.getElementById("only-general")
            .classList.remove("only-hide");
    }
}




function live_iframe_add(KITtype,KITcontent="",kitID,change=false) {
    const iframe = live_iframe;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        if(change)
            {

                const newContent = iframeDoc.getElementById('updateME');
                newContent.innerHTML = '<p>'+KITcontent+'</p>';
            }
            else{
                var elementKITtype="span";//as default unknown type
                let notTEXABLE=false;
                switch(KITtype){
                    case 1:
                        elementKITtype ="h3";
                        break;
                    case 2:
                        elementKITtype ="p";
                        break;
                    case 3:
                        elementKITtype ="button";
                        break;
                    case 4:
                        elementKITtype ="img";
                        notTEXABLE=true;
                        break;
                }

                const neWelement = document.createElement(elementKITtype);
                neWelement.id="live" + kitID;
                if(!notTEXABLE)
                neWelement.textContent = KITcontent;
                else
                    {
                        neWelement.alt = KITcontent;
                        neWelement.style.maxWidth=GET_THE_KIT_ID("active_kit",kitID).dataset.size;
                    }


                    neWelement.style.fontSize=GET_THE_KIT_ID("active_kit",kitID).dataset.size;

                // Append the new <p> element to the body or a specific element
                iframeDoc.body.appendChild(neWelement); // This appends it to the body



            }


    }



    function LIVE_select_kit(kitID)
    {
        const iframe = live_iframe;
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        live_iframe.contentWindow.RemoveALLselected();

        const elementToModify = iframeDoc.getElementById('live'+kitID);

        if (elementToModify) {
            // Add a class to the element
            elementToModify.classList.add('MEselected'); // Replace 'myNewClass' with the desired class name
        } else {
            console.log('Element not found in the iframe ==>' + kitID);
        }
        DELETEbtn.disabled = false;
        //SAVEbtn.disabled = false;

        ReFocus();


    }



//this function is used to unfocus the selected kit in project_timeline
    function TimeLine_RemoveALLselected() {
        // Use a single line to remove the class from all matching elements
        document.querySelectorAll('.MEselected').forEach(element => element.classList.remove('MEselected'));
    }


function SAVINGtime(){
        const current_kitID = hidden_kitID.value;
        const UPDATEDcontent = document.getElementById('properties_value').value;
        GET_THE_KIT_ID('active_kit',current_kitID).innerHTML=UPDATEDcontent;

        live_iframe.contentWindow.UPDATEcurrentCONTENT(current_kitID,UPDATEDcontent);

        SAVEbtn.disabled = true;

    }


    function REMOVINGtime(){
        const current_kitID = hidden_kitID.value;

        GET_THE_KIT_ID('active_kit',current_kitID).remove();

        live_iframe.contentWindow.REMOVEkit(current_kitID);


        DELETEbtn.disabled = true;
        SAVEbtn.disabled = true;

        unFocus();
    }






    function unFocus()
    {
        document.getElementById("project_properties").style.display="none";
               live_iframe.contentWindow.RemoveALLselected();//unselect all highlighted kits in LIVE
               TimeLine_RemoveALLselected();//unselect all highlighted kits in TIME_LINE
    }

    function ReFocus()
    {
        document.getElementById("project_properties").style.display="inline-block";

    }


    function change_visibility()
    {
        //1) changing visibility_status to ZERO.
        //2) changing data-visible to ZERO.
        //3) switch the button to red.
        //4) hide the element from project_live only.
        //5) replace visiblity emoji



        //hidden_kit_visible
        let kitID = hidden_kitID.value;
        let visibility_status = GET_THE_KIT_ID("active_kit",kitID).dataset.visible;

        live_iframe.contentWindow.TOGGLEhiding(kitID);

        if(visibility_status =="1")
            {//in this case, it's visible, will be not visible in this code:
            visibility_status ="0";
            GET_THE_KIT_ID("active_kit",kitID).setAttribute("data-visible","0");
            }
            else{
                visibility_status ="1";
                GET_THE_KIT_ID("active_kit",kitID).setAttribute("data-visible","1");
            }
            GET_THE_KIT_ID("active_kit",kitID).classList.toggle('not-visible-emoji');
    }





    //ALIGN TEXT
    function alignTEXT(alignmentTYPE,alignmentELEMENT)
    {
        reSHOWINGcorrectAlign(alignmentELEMENT);
        let kitID = hidden_kitID.value;

        switch(alignmentTYPE){
            case 1://IT'S LEFT
                GET_THE_KIT_ID("active_kit",kitID).dataset.alignment ="1";
                break;

            case 2://IT'S CENTER
                GET_THE_KIT_ID("active_kit",kitID).dataset.alignment ="2";
                break;

            case 3://IT'S RIGHT
                GET_THE_KIT_ID("active_kit",kitID).dataset.alignment ="3";
                break;
        }

        let KITalignment =  GET_THE_KIT_ID("active_kit",kitID).dataset.alignment;
        live_iframe.contentWindow.kitALIGNMENT(kitID,KITalignment);
    }



    function reSHOWINGcorrectAlign(alignmentELEMENT){
        const elements = document.querySelectorAll('.btn_alignment-SELECTED'); // Select all matching elements

        elements.forEach(element => {
          element.classList.remove('btn_alignment-SELECTED'); // Remove the class from each element
        });
        alignmentELEMENT.classList.toggle('btn_alignment-SELECTED');
    }


    //ALIGN BUTTON
    // renamed fron [alignBUTTON] TO [alignCONTROLS]
function alignCONTROLS(alignmentTYPE,alignmentELEMENT){

        reSHOWINGcorrectAlign(alignmentELEMENT);
        let kitID = hidden_kitID.value;

        switch(alignmentTYPE){
            case 1://IT'S LEFT
                GET_THE_KIT_ID("active_kit",kitID).dataset.alignment ="1";
                break;

            case 2://IT'S CENTER
                GET_THE_KIT_ID("active_kit",kitID).dataset.alignment ="2";
                break;

            case 3://IT'S RIGHT
                GET_THE_KIT_ID("active_kit",kitID).dataset.alignment ="3";
                break;
        }
        let KITalignment =  GET_THE_KIT_ID("active_kit",kitID).dataset.alignment;
        live_iframe.contentWindow.kitALIGNMENTcontrol(kitID,KITalignment);
    }



    function UpdateColor(colorElement)
    {
        let NewColor = colorElement.value;
        let kitID = hidden_kitID.value;
        live_iframe.contentWindow.UpdateColor(kitID,NewColor);

        GET_THE_KIT_ID("active_kit",kitID).dataset.color =NewColor;
    }

    function UpdateFontSize(SizeElement)
    {
        let NewSize = SizeElement.value;
        let kitID = hidden_kitID.value;
        live_iframe.contentWindow.UpdateFontSize(kitID,NewSize);

        GET_THE_KIT_ID("active_kit",kitID).dataset.size = NewSize;
    }

    function UpdateMargin(SizeElement)
    {
        let NewMargin = SizeElement.value;
        let kitID = hidden_kitID.value;
        live_iframe.contentWindow.UpdateMargin(kitID,NewMargin);
        GET_THE_KIT_ID("active_kit",kitID).dataset.margin =NewMargin;
    }

    function UpdateImgSize(SizeElement)
    {
        let NewSize = SizeElement.value;
        let kitID = hidden_kitID.value;
        live_iframe.contentWindow.UpdateImgSize(kitID,NewSize);
        GET_THE_KIT_ID("active_kit",kitID).dataset.size =NewSize;
    }


function showHINT(HINT){
        infoParagraph.style.display="block";
        infoParagraph.innerHTML=HINT;
    }




function handleFileUpload(event) {
        const file = event.target.files[0];

        let kitID = hidden_kitID.value;

        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {

                const iframe = live_iframe;
                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;


                const img = live_iframe.contentWindow.document.getElementById('live'+kitID);
                img.src = e.target.result;

                //img.style.display = 'block'; // Show the image
                //img.style.maxWidth  = '250px'; // Show the image
            };
            reader.readAsDataURL(file); // Read the file as a data URL
            // Reset the input value to allow re-uploading the same file
            event.target.value = '';
        }
    }

/*  Border Type [setting values]:
    - none :default. [this will be as default when the checkbox is false]
    - full : like box.
    - underline : bottom line.
    -one side : with background color.

    1) check-box to have a border or not.
    2) selecting the border type.
    3) selecting the border color.
    4) selecting the border style format.
*/

function haveBORDER(borderVALUE,borderTYPE)
{
    let kitID = hidden_kitID.value;
    let NewborderVALUE = borderVALUE.value;
    switch(borderTYPE)
    {
        case 1:

            GET_THE_KIT_ID("active_kit",kitID).dataset.borderType = NewborderVALUE;

            break;
        case 2:
            GET_THE_KIT_ID("active_kit",kitID).dataset.borderColor = NewborderVALUE;
            break;
        case 3:
            GET_THE_KIT_ID("active_kit",kitID).dataset.borderStyle = NewborderVALUE;
            break;
        case 4:
            GET_THE_KIT_ID("active_kit",kitID).dataset.borderSize = NewborderVALUE;
            break;
    }
let currentType = GET_THE_KIT_ID("active_kit",kitID).dataset.borderType;
let currentSize = GET_THE_KIT_ID("active_kit",kitID).dataset.borderSize;

let currentStyle = GET_THE_KIT_ID("active_kit",kitID).dataset.borderStyle;
let currentColor = GET_THE_KIT_ID("active_kit",kitID).dataset.borderColor;

    const Final_Type_Size = currentType === "1" ? currentSize :
                            currentType === "2" ? "0 0 "+currentSize :
                            currentType === "3" ? "0 0 0 "+currentSize :
                            currentSize;//default value

    //border: 1px solid #000;


        //+GET_THE_KIT_ID("active_kit",kitID).dataset.borderType;
    live_iframe.contentWindow.UPDATEborder(kitID,Final_Type_Size,currentStyle,currentColor);
}


function EnableBorder(CurrentBorderStatus)
{
    let kitID = hidden_kitID.value;

    let currentType = GET_THE_KIT_ID("active_kit",kitID).dataset.borderType;
    let currentSize = GET_THE_KIT_ID("active_kit",kitID).dataset.borderSize;

    let currentStyle = GET_THE_KIT_ID("active_kit",kitID).dataset.borderStyle;
    let currentColor = GET_THE_KIT_ID("active_kit",kitID).dataset.borderColor;
    const Final_Type_Size = currentType === "1" ? currentSize :
                            currentType === "2" ? "0 0 "+currentSize :
                            currentType === "3" ? "0 0 0 "+currentSize :
                            currentSize;//default value


    if(CurrentBorderStatus)
        {
            bordersAll.style.display="block";
            GET_THE_KIT_ID("active_kit",kitID).dataset.border="1";
            //haveBORDER(1,1);
            live_iframe.contentWindow.UPDATEborder(kitID,
                Final_Type_Size,
                currentStyle,
                currentColor);
        }
    else
        {
            bordersAll.style.display="none";
            GET_THE_KIT_ID("active_kit",kitID).dataset.border="0";
            //haveBORDER(1,1);
            live_iframe.contentWindow.UPDATEborder(kitID,"0","solid","black");
        }
}