//The Process Of Creating The Kit Structure, Adding New Kit, Will Be Typed Here.


//References :
/*
===================================================
project.js : function choosePROPERTIEScorrect >>> used to define the required properties for every kit.
project.js : function timeline_properties     >>> manage what happen when alive kit got pressed.
project.js : function LIVE_select_kit         >>> to highlight the selected kit.
project.js : function SAVINGtime              >>> that saves the NEW VALUE like text.
project.js : function REMOVINGtime            >>> Deletes The kit/group of kits.
project.js : function updateKITname           >>> Updates The Name for the kit.

===================================================
 */




//this function runs when a new kit got born.
function addKIT(kit_type) {
    //[START] Main element that will have the content for the new added element.
    let newKIT = document.createElement('p');
    newKIT.classList.add('project_timeline_kit');
    newKIT.id = 'active_kit' + COUNT_KIT_PROGRESS;
    newKIT.setAttribute("draggable", "true");//adding the option to drag it so it can be arranged later.
    let currentkitID = COUNT_KIT_PROGRESS;
    //[END] Main element that will have the content for the new added element.

    newKIT.setAttribute("data-visible", "1");
    newKIT.setAttribute("data-alignment", "1");
    newKIT.setAttribute("data-color", "black");
    newKIT.setAttribute("data-size", "medium");
    newKIT.setAttribute("data-margin", "0");
    newKIT.setAttribute("data-background", "#f0f0f0");
    newKIT.setAttribute("data-only", "text");//standard value, until changed.

    newKIT.setAttribute("data-border", "0");
    newKIT.setAttribute("data-border-type", "1");
    newKIT.setAttribute("data-border-color", "black");
    newKIT.setAttribute("data-border-style", "solid");
    newKIT.setAttribute("data-border-size", "2px");


    //this i can pass parameters without EXECUTE the function FROM FIRST TIME.
    newKIT.onclick = () => timeline_properties(currentkitID, newKIT.innerHTML,NameKit(kit_type).toLowerCase());

    //Arrange The Items :

    //THE START OF DRAGGING LIFE.
    newKIT.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text', event.target.id);
        event.dataTransfer.effectAllowed = 'copy';

    });




    //Naming the kit before adding it to the timeline box.
    switch (kit_type) {

        case 1:


            newKIT.textContent = phrase1 + element1;
            newKIT.setAttribute("data-size", "large");//specific font size for the label
            break;
        case 2:
            newKIT.textContent = phrase1 + element2;
            break;
        case 3:
            newKIT.textContent = phrase2;
            newKIT.setAttribute("data-only", "button");
            break;
        case 4:
            newKIT.textContent = phrase3;
            newKIT.setAttribute("data-only", "img");
            newKIT.setAttribute("data-size", "100%");
            newKIT.setAttribute("data-src", "none");
            break;
        case 5:
            newKIT.setAttribute("data-only", "timer");
            newKIT.setAttribute("data-duration", "1");
            newKIT.setAttribute("data-timer", "false");
            newKIT.textContent = phrase4 + element5 + currentkitID;
            break;
    }
    let tempNAME = NameKit(kit_type)+COUNT_KIT_PROGRESS;//the first KIT-NAME will added, until it changes.
    active_kit.push([COUNT_KIT_PROGRESS, NameKit(kit_type),tempNAME]);
    //failed try to convert two dimension array to dynamic map
    //active_kit.set(COUNT_KIT_PROGRESS, NameKit(kit_type));


    //finally, adding the kit to the timeline box.
    //project_timeline.appendChild(newKIT);
    document.getElementById("screen"+LIVE_SCREEN).appendChild(newKIT);
    live_iframe_add(kit_type, newKIT.textContent, COUNT_KIT_PROGRESS,tempNAME);
    //increasing the id counter.
    COUNT_KIT_PROGRESS++;

    //adding new kit will reset the workspace
    commonPROJECTclearWORKSPACE();
}










//return the name of needed kit
function NameKit(kit_num) {
    //kit type instructions :
    //1 : label
    //2 : text
    //3 : Button
    //4 : Picture
    //5 : Timer

    switch (kit_num) {
        case 1:
            return element1;
        case 2:
            return element2;
        case 3:
            return element3;
        case 4:
            return element4;
        case 5:
            return element5;
    }
}












//so this function add the kit to iframe.
function live_iframe_add(KITtype, KITcontent = "", kitID,kitNAME,change = false) {
    const iframe = live_iframe;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    if (change) {
        console.log("i don't know the purpose of this line it's always false and it will never run.");
        const newContent = iframeDoc.getElementById('updateME');
        newContent.innerHTML = '<p>' + KITcontent + '</p>';
    } else {
        var elementKITtype = "span";//as default unknown type
        let notTEXABLE = false;
        //this to know if the kit can attach to events or no
        let isFUNCTIONAL = false;
        //this to know if the kit should be visible or hidden
        let shouldBEhidden = false;


        switch (KITtype) {
            case 1:
                elementKITtype = "h3";
                break;
            case 2:
                elementKITtype = "p";
                break;
            case 3:
                elementKITtype = "button";
                isFUNCTIONAL = true;
                break;
            case 4:
                elementKITtype = "img";
                notTEXABLE = true;
                break;
            case 5:
                isFUNCTIONAL = true;
                shouldBEhidden = true;
                break;
        }

        const neWelement = document.createElement(elementKITtype);
        neWelement.id = "live" + kitID;
        if (!notTEXABLE)
            neWelement.textContent = KITcontent;
        else {
            neWelement.alt = KITcontent;
            neWelement.style.maxWidth = GET_DOC_ID("active_kit", kitID).dataset.size;
        }

        if (isFUNCTIONAL) {//This Part Helps to manage the functional kit's

            Func_KIT(kitNAME, kitID, KITtype,screenBUTTON.textContent);
            if (shouldBEhidden)
                neWelement.style.display = "none";
        }


        neWelement.style.fontSize = GET_DOC_ID("active_kit", kitID).dataset.size;

        // Append the new element to the selected screen.
        const targetSCREEN = iframeDoc.getElementById("screen"+LIVE_SCREEN);
        targetSCREEN.appendChild(neWelement);

        //iframeDoc.body.appendChild(neWelement); // This appends it to the body

        if(active_kit.length>1)
        {
            //finally, put it in the correct place
            //attention: maybe it will throuh error if it's empty or it's last element or it's array is eppty, never tested
            let theLastAddedElement = active_kit[active_kit.length - 1];
            ArrangeKITS(theLastAddedElement[0]);
            console.log("Arranged !!!");
        }
        dropIndicator.parentElement.append(dropIndicator);
        live_iframe.contentWindow.MoveIndicatorToEnd();

    }


}