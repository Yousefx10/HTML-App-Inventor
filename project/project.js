



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



//increasing the id counter.
    COUNT_KIT_PROGRESS++;

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
}




function live_iframe(IFRAMEcontent="",change=false) {
    const iframe = document.getElementById('live_iframe');
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        if(change)
            {

                const newContent = iframeDoc.getElementById('updateME');
                newContent.innerHTML = '<p>'+IFRAMEcontent+'</p>';
            }
            else{
                const newParagraph = document.createElement('p');
                newParagraph.textContent = IFRAMEcontent; // Use your variable 'well'

                // Append the new <p> element to the body or a specific element
                iframeDoc.body.appendChild(newParagraph); // This appends it to the body

                // If want to append it to a specific element within the iframe, use:
                // const updateME = iframeDoc.getElementById('updateME');
                // updateME.appendChild(newParagraph);

            }


    }

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
             </style>
            </head>
            <body id="updateME">

            </body>
          </html>
        `);
        iframeDoc.close(); // Close the document to render content


