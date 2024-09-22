



//[FUNCTIONS] Area
//this function runs when a new kit got born.
function addKIT(kit_type)
{
    //[START] Main element that will have the content for the new added element.
    let newParagraph = document.createElement('p');
        newParagraph.classList.add('project_timeline_kit');
        newParagraph.id='active_kit' + COUNT_KIT_PROGRESS;
    //[END] Main element that will have the content for the new added element.

    newParagraph.setAttribute("data-visible","1");
    newParagraph.setAttribute("data-alignment","1");
    newParagraph.setAttribute("data-color","black");
    newParagraph.setAttribute("data-size","medium");
    newParagraph.setAttribute("data-margin","0");
//this i can pass parameters without EXECUTE the function FROM FIRST TIME.
newParagraph.onclick = () => timeline_properties(GETkitID(newParagraph.id),newParagraph.innerHTML);





    //Naming the kit before adding it to the timeline box.
    switch(kit_type){

        case 1:
            active_kit.push([COUNT_KIT_PROGRESS,NameKit(kit_type)]);
            newParagraph.textContent = phrase1 + element1 ;
            newParagraph.setAttribute("data-size","large");//specific font size for the label
            break;

        case 2:
            active_kit.push([COUNT_KIT_PROGRESS,NameKit(kit_type)]);
            newParagraph.textContent = phrase1 + element2 ;
            break;
    }

    //showing the current ARRAY that contains the kit's
    console.log(active_kit);
    //finally, adding the kit to the timeline box.
    project_timeline.appendChild(newParagraph);
    live_iframe_add(kit_type,newParagraph.textContent,COUNT_KIT_PROGRESS);
    //increasing the id counter.
    COUNT_KIT_PROGRESS++;
}

function NameKit(kit_num)
{
    //kit type instructions :
    //1 : label
    //2 : text

    switch(kit_num){
        case 1:
            return element1;
            break;
        case 2:
            return element2;
            break;
    }
}

function GETkitID(kitID)
{
    return kitID.slice(10);
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
        document.getElementById('hidden_kit_visible').value="1";
    }
    else{
        document.getElementById("btn_visible").classList.add('btn_unvisible');
        document.getElementById('hidden_kit_visible').value="0";
    }


    let current_alignment_status = document.getElementById("active_kit"+current_kit).dataset.alignment;
    reSHOWINGcorrectAlign(document.getElementById("align"+current_alignment_status));


    let current_color = document.getElementById("active_kit"+current_kit).dataset.color;
    document.getElementById('ColorDropDown').disabled=true;
    document.getElementById('ColorDropDown').value = current_color;
    document.getElementById('ColorDropDown').disabled=false;

    let current_size = document.getElementById("active_kit"+current_kit).dataset.size;
    document.getElementById('FontSizeDropDown').disabled=true;
    document.getElementById('FontSizeDropDown').value = current_size;
    document.getElementById('FontSizeDropDown').disabled=false;

    let current_margin = document.getElementById("active_kit"+current_kit).dataset.margin;
    document.getElementById('MarginDropDown').disabled=true;
    document.getElementById('MarginDropDown').value = current_margin;
    document.getElementById('MarginDropDown').disabled=false;
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

                switch(KITtype){
                    case 1:
                        elementKITtype ="h3";
                        break;
                    case 2:
                        elementKITtype ="p";
                        break;
                }

                const neWelement = document.createElement(elementKITtype);
                neWelement.id="live" + kitID;
                neWelement.textContent = KITcontent;

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
        let visibility_status = document.getElementById('hidden_kit_visible');
        let kitID = hidden_kitID.value;

        live_iframe.contentWindow.TOGGLEhiding(kitID);

        if(visibility_status.value==1)
            {//in this case, it's visible, will be not visible in this code:
            visibility_status.value="0";
            GET_THE_KIT_ID("active_kit",kitID).setAttribute("data-visible","0");
            }
            else{
                visibility_status.value="1";
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

//THIS CONTROL IS MADE FOR MAKING IT EASIER TO HAVE THE CONTROL ID
    function GET_THE_KIT_ID(prefix_name,kitID){
        return document.getElementById(prefix_name+kitID);
    }