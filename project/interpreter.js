/*
    THIS FILE CHECKS FOR ERRORS COULD HAPPEN.
    THEN ALERTING THE ERRORS BEFORE STARTING / DEBUGGING THE PROGRAM.

    Version : 0.1;
*/
const Build_Version='24/11/03';//YY/MM/DD.

/*
Big Note:
All Varibles Here Should Stays Here, And Will Not Moves To variable.js Like Other Files.
Duo To Ensure Focus And Task Performance
*/
//Simple Note : i have to move all adding new kit process into kit.js instead of keeping them inside project.js


//POINT TO START :
let Bugs=0; //This Referes To Current Errors, Default as zero.
let ListOfBugs = new Map(); //Contains The List Of Each Bug's And It's Description.


const status_Title       =      document.getElementById("status_Title");
const status_Description =      document.getElementById("status_Description");
const status_Warning     =      document.getElementById("status_Warning");
const bug_count          =      document.getElementById("bug_count");

const BugsContent        =      document.getElementById("BugsContent");

//this code is important, i'll store a code for each type of proplem, and then it will refers to it's description also
const BugsCodes          =      new Map([
                                ["ERRkit", "Issue With Missing KIT."],
                                ["ERRvalue", "Can't Get The Value For Missed KIT."]
                            ]);



// Create a <table> element and a <tbody> (for rows)
const table = document.createElement("table");
const tableBody = document.createElement("tbody");
        // Append the tbody to the table
        table.appendChild(tableBody);
        table.setAttribute("border", "1");
        table.style.width="100%";




//so basically this function will be called if there's an error.
//this function will checks first for errors.
function caseDetectError(kitGotAffected)
{
    //First Step is to check if the deleted kit have affected any action process.
    //First Of First step is to check for [ACTIVEactions array].

    //This Method Works, and it's telling me how count of errors is there.
    let Nowcount = 0;
    
    dynamicMap.forEach((value,key) => {
        let noBugs=true;
        let NowBugs=[];

        if (value.includes('~|'+kitGotAffected+'~|'))
        {
            Nowcount++;
            NowBugs.push("ERRkit");//referes to the error type i've created in the dynamic map.
            noBugs=false;
        }
        if (value.includes('//'+kitGotAffected+'//'))//BIG Reminder : Should improve the //1// soonly and using another indicator.      
        {
            Nowcount++;
            NowBugs.push("ERRvalue");//referes to the error type i've created in the dynamic map.
            noBugs=false;
        }
        
        console.log(NowBugs);
        if(!noBugs)ListOfBugs.set(key, NowBugs);
    });
    
    console.log(`Number of values with ~|x~| [OR] //x//: ${Nowcount}`);
    
  
    
    Bugs+=Nowcount;
    caseShowResult();
}

//So This Function Displays Error Title And Shows The Table
function caseShowResult()
{
    tableBody.innerHTML="";
    if(Bugs>0)//There's An Errors.
    {
        status_Title.innerText="Hold On !";
        status_Description.innerText="We encountered some problems.";
        status_Warning.style.display="flex";
        bug_count.textContent=Bugs;

        const row = document.createElement("tr");
        const cell = document.createElement("th");
        const cell2 = document.createElement("th");

        cell.textContent = "Description";
        row.appendChild(cell);
        cell2.textContent = "Navigate";
        row.appendChild(cell2);

        tableBody.appendChild(row);



        BugsContent.innerHTML="";//so it will be clear, for next use.

        // Append the table to the target div
        BugsContent.appendChild(table);


        ListOfBugs.forEach((value,key) => {
            if (Array.isArray(value)) {
                value.forEach(item => {
                    addRowToTable(key,BugsCodes.get(item));
                });
            } 
            else addRowToTable(key,BugsCodes.get(value));


            
        });

        
    }
    else{//Great, No Error Found.
        status_Title.innerText="Perfect";
        status_Description.innerText="Free Of Errors.";
        status_Warning.style.display="none";
    }
}



function NavigateBug(ActionID)
{
    myDialog.close(); // Close the dialog

    // Extract the word before "code"
    let wordBeforeCode = ActionID.split('code')[0];

    // Extract the number before "."
    let numberBeforeDot = ActionID.split('.')[0].replace(/[^0-9]*$/, '').slice(-1);

    //STEP ONE : navigate to the main kit and act as i've tried to open it:
    const OpenMe = new Event('click'); // Create a new click event
    document.getElementById('code'+numberBeforeDot).dispatchEvent(OpenMe); // Dispatch the event

    //STEP TWO : Select The desired event :
    document.getElementById('event_'+wordBeforeCode.toUpperCase()).dispatchEvent(OpenMe); // Dispatch the event

    document.getElementById(ActionID).style.background="blue";
}





// Function to add a row to the table with specified cell values
function addRowToTable(key,value) {
    const row = document.createElement("tr");


        const cellKEY = document.createElement("td");
        cellKEY.textContent = "Jump In";
        cellKEY.classList.add("special_td");

        const cellVALUE = document.createElement("td");
        cellVALUE.textContent = value;


        cellKEY.addEventListener('click', function() {     
                NavigateBug(key);
               });

        row.appendChild(cellVALUE);//value is first. [ description ]
        row.appendChild(cellKEY);//then key is last. [refer to navigate]





    // Append the row to the table body
    tableBody.appendChild(row);
}





//this function tries to detect if any changes is related to fix old/past bugs.
function CaseResolve(FullActionBlockID,CaseOfUpdate)
{
//NOTE: this function minus only one bug for every time it's called, NOT A GROUP OF BUGS TOGETHER,
//>>>EXCEPT THE WHOLE ACTION GOT DELETED.<<<
    if(ListOfBugs.has(FullActionBlockID))
    {
        let RemovedErrorCode;
                    

        if(CaseOfUpdate=="kit")
        {
            if(ListOfBugs.get(FullActionBlockID).includes("ERRkit"))
            RemovedErrorCode = ListOfBugs.get(FullActionBlockID).filter(value => value !== "ERRkit");//error code : ERRkit
            else return;
        }
        else if(CaseOfUpdate=="mixed") 
        {
            if(ListOfBugs.get(FullActionBlockID).includes("ERRvalue"))
            RemovedErrorCode = ListOfBugs.get(FullActionBlockID).filter(value => value !== "ERRvalue");//error code : ERRvalue
            else return;
        }
        //else: DELETED
        else {
            if(ListOfBugs.get(FullActionBlockID).length>1) Bugs-=2;
            else {console.log("A"+Bugs);Bugs--;console.log("B"+Bugs);}

            ListOfBugs.delete(FullActionBlockID);
            caseShowResult();
            return;
        }

        // Update the map with the new array

            if(RemovedErrorCode.length === 0)   ListOfBugs.delete(FullActionBlockID);
            else                                ListOfBugs.set(FullActionBlockID, RemovedErrorCode);
            Bugs--;

            caseShowResult();

    }

}



















//This Part Of Code is going to be activated soon.
const closeDialogButton = document.getElementById('closeDialog');
const myDialog = document.getElementById('myDialog');

function DisplayDialog()
{
    myDialog.showModal();
}
// Close the dialog when the close button is clicked
closeDialogButton.addEventListener('click', function() {
    myDialog.close(); // Close the dialog
});