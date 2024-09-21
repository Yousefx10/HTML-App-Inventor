



//[FUNCTIONS] Area
//this function runs when a new kit got born.
function addKIT(kit_type)
{
    //[START] Main element that will have the content for the new added element.
    let newParagraph = document.createElement('p');
        newParagraph.classList.add('project_timeline_kit');
        newParagraph.id='active_kit' + COUNT_KIT_PROGRESS;
    //[END] Main element that will have the content for the new added element.


//this i can pass parameters without EXECUTE the function FROM FIRST TIME.
newParagraph.onclick = () => timeline_properties(GETkitID(newParagraph.id),newParagraph.innerHTML);





    //Naming the kit before adding it to the timeline box.
    switch(kit_type){

        case 1:
            active_kit.push([COUNT_KIT_PROGRESS,NameKit(kit_type)]);
            newParagraph.textContent = phrase1 + element1 ;
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
    live_iframe(kit_type,newParagraph.textContent,COUNT_KIT_PROGRESS);
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
    document.getElementById("hidden_kitID").value=current_kit;

    LIVE_select_kit(current_kit);
    TimeLine_RemoveALLselected();//to remove current/previous selected timelineKIT
    document.getElementById("active_kit"+current_kit).classList.add('MEselected');

}




function live_iframe(KITtype,KITcontent="",kitID,change=false) {
    const iframe = document.getElementById('live_iframe');
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

        const iframe = document.getElementById('live_iframe');
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        document.getElementById('live_iframe').contentWindow.RemoveALLselected();

        const elementToModify = iframeDoc.getElementById('live'+kitID);

        if (elementToModify) {
            // Add a class to the element
            elementToModify.classList.add('MEselected'); // Replace 'myNewClass' with the desired class name
        } else {
            console.log('Element not found in the iframe ==>' + kitID);
        }
        DELETEbtn.disabled = false;
        SAVEbtn.disabled = false;

        ReFocus();
    }



//this function is used to unfocus the selected kit in project_timeline
    function TimeLine_RemoveALLselected() {
        // Use a single line to remove the class from all matching elements
        document.querySelectorAll('.MEselected').forEach(element => element.classList.remove('MEselected'));
    }


function SAVINGtime(){
        const current_kitID = document.getElementById('hidden_kitID').value;
        const UPDATEDcontent = document.getElementById('properties_value').value;
        document.getElementById('active_kit'+current_kitID).innerHTML=UPDATEDcontent;

        document.getElementById('live_iframe').contentWindow.UPDATEcurrentCONTENT(current_kitID,UPDATEDcontent);

        SAVEbtn.disabled = true;

    }


    function REMOVINGtime(){
        const current_kitID = document.getElementById('hidden_kitID').value;

        document.getElementById('active_kit'+current_kitID).remove();

        document.getElementById('live_iframe').contentWindow.REMOVEkit(current_kitID);


        DELETEbtn.disabled = true;
        SAVEbtn.disabled = true;

        unFocus();
    }






    function unFocus()
    {
        document.getElementById("project_properties").style.display="none";

    }

    function ReFocus()
    {
        document.getElementById("project_properties").style.display="inline-block";

    }


    function change_visibility()
    {//hidden_kit_visible
        let visibility_status = document.getElementById('hidden_kit_visible').value;
        if(visibility_status==1)
            {//in this case, it's visible

//1) changing visibility_status to ZERO
//2) changing data-visible to ZERO
//3) switch the button to red
//4) hide the element from project_live only





            }
            else{

            }
    }