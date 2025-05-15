/*

The Build Script
Version 1.0.0;

2025 - may - 14

*/

/*
List of Necessary Function Names

changetext:
    UPDATEcurrentCONTENT

changecolor:
    UpdateColor

changevisibility:
    TOGGLEhiding

changefontsize:
    UpdateFontSize

changealignment:
    kitALIGNMENT

changebackground:
    UpdateBackgroundColor
    ChangeBackground

switchscreen:
    SwitchCurrentScreen




>>>>>>>>>>>>>function do_property(wholeVALUE)<<<<<<<<<<<<<<<
*/


function DoBuild()//will change the func name in future
{
   let DOCUMENT_html_start =
   `<!DOCTYPE html>
    <html lang="en">
   `;

    let DOCUMENT_head =
    `
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <style>
        *{margin:0}
        .hide{display:none;}
        .alignment-button-center{text-align:center;}
        .alignment-button-right{text-align:right;}
        .working-screen{height:100%}
    </style>
    </head>
    `;

    let DOCUMENT_body_start ="<body>\n" + generateElements(active_kit, dynamicMap);

    let DOCUMENT_body_end =
    `
    <script src="build_actions.js"></script>
    </body>
    `;

    let  DOCUMENT_body = DOCUMENT_body_start + DOCUMENT_body_end;

    let DOCUMENT_html_end =
    `
    </html>
    `;




    let DOCUMENT_final = DOCUMENT_html_start + DOCUMENT_head + DOCUMENT_body + DOCUMENT_html_end;

    // Create a Blob object
    let blob = new Blob([DOCUMENT_final], { type: 'text/html' });

    // Create a link element
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'page.html';
    link.click();

    // Clean up
    URL.revokeObjectURL(link.href);
    
}






//PERFECT, NOW LETS FOCUS ON ADDING THE SCREENS.
//variables for this mission:
//namingSCREENS
//screenPROPERTIES

//div with timelineSCREEN class.
//contains element with project_timeline_kit class.

//This function will generate the HTML elements based on the active kit and their actions.
function generateElements(active_kit, dynamicMap) {
    let output = '';





// Select all parents with the 'timelineSCREEN' class
const parents = document.querySelectorAll('.timelineSCREEN');

let CurrentCreatedScreen="\n";//this will store all screens that have been created.
    const SCREEN_Comment  = "<!--Screen Starts-->\n";
    const SCREEN_Comment2 = "<!--Screen Ends-->\n\n";


parents.forEach((parent) => {
    // Find children with the 'project_timeline_kit' class
    const children = parent.querySelectorAll('.project_timeline_kit');

    const CurrentScreenProperties = screenPROPERTIES.find(item => item[0] == parent.id.slice(6))?.[1];//this stores the screen properties for now it's background color.



     CurrentCreatedScreen+=`${SCREEN_Comment}<div id="${parent.id}" class="working-screen" style="${CurrentScreenProperties}"> \n`;
    

    children.forEach((child) => {
        

        const id = child.id.replace(/\D+/g, "");//THE REPLACE FUNCTION WILL REMOVE THE NON-DIGITS.
        const type = active_kit[id][1];
        const name = active_kit[id][2];

        // console.log("Current ID :"+id);
        // console.log("Current type :"+type);
        // console.log("Current name :"+name);
        //([id, type, name]

        let tag = '';
        let onclick = '';
        const elementId = `active_kit${id}`;
        let classes = '';
        let styles = '';
        let content = '';
        const el = document.getElementById(elementId);

        if (el) {
            // Get and set the text content
            content = el.textContent.trim();//the use of trim to remove the extra spaces.

            // Handle visibility
            if (el.dataset.visible === '0') classes += ' hide';

            // Handle alignment
            if (el.dataset.alignment === '1') styles += 'text-align: left; ';
            if (el.dataset.alignment === '2') styles += 'text-align: center; ';
            if (el.dataset.alignment === '3') styles += 'text-align: right; ';

            // Handle color, size, margin, and background
            if (el.dataset.color) styles += `color: ${el.dataset.color}; `;
            if (el.dataset.size) styles += `font-size: ${el.dataset.size}; `;
            if (el.dataset.margin) styles += `margin: ${el.dataset.margin}; `;
            if (el.dataset.background) styles += `background-color: ${el.dataset.background}; `;

            // Handle border
            if (el.dataset.border === '1') {
                let border = '';
                if (el.dataset.borderType === '1') border += 'border: ';
                if (el.dataset.borderType === '2') border += 'border-bottom: ';
                if (el.dataset.borderType === '3') border += 'border-left: ';
                if (el.dataset.borderColor) border += `${el.dataset.borderSize || '1px'} ${el.dataset.borderStyle || 'solid'} ${el.dataset.borderColor};`;
                styles += border + ' ';
            }
        }

        switch (type) {
            case 'Label':
                tag = `<h3 id="${elementId}" class="${classes.trim()}" style="${styles.trim()}" data-only="${el?.dataset.only || ''}">${content}</h3>`;
                break;
            case 'Text':
                tag = `<p id="${elementId}" class="${classes.trim()}" style="${styles.trim()}" data-only="${el?.dataset.only || ''}">${content}</p>`;
                break;
            case 'Button':
                const relevantCodes = Array.from(dynamicMap.entries())
                    .filter(([key]) => key.startsWith(`clickcode${id}.`))
                    .map(([_, value]) => {
                        const [action, target, data] = value.split('~|');
                        return `    clickcode('${action}', '${target}', '${data}')`;
                    }).join('\n');
                onclick = `\n onclick="\n${relevantCodes}\n"`;
                tag = `<button id="${elementId}" class="${classes.trim()}" style="${styles.trim()}"${onclick} data-only="${el?.dataset.only || ''}">${content}</button>`;
                break;
        }

      output += '\n'+ tag + '\n';

    });
    CurrentCreatedScreen += output + `</div>\n${SCREEN_Comment2}`;//this will close the div with the id of the Created Screen.'
    output = '';//reset the output for the next screen.
});




//console.log( "should be:"+output);
    return CurrentCreatedScreen;
}



