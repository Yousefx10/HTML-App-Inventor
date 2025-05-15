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
   `
   <!DOCTYPE html>
    <html lang="en">
   `;

    let DOCUMENT_head =
    `
    <head>
    <meta charset="UTF-8">
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0">-->
    
    <style>
        *{margin:0}
        .hide{display:none;}
        .alignment-button-center{text-align:center;}
        .alignment-button-right{text-align:right;}
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







//This function will generate the HTML elements based on the active kit and their actions.
function generateElements(active_kit, dynamicMap) {
    let output = '';

    active_kit.forEach(([id, type, name]) => {
        let tag = '';
        let onclick = '';

        switch (type) {
            case 'Label':
                tag = `<h3 id="live${id}">example</h3>`;
                break;
            case 'Text':
                tag = `<p id="live${id}">example</p>`;
                break;
            case 'Button':
                const relevantCodes = Array.from(dynamicMap.entries())
                    .filter(([key, value]) => key.startsWith(`clickcode${id}.`))
                    .map(([_, value]) => {
                        const [action, target, data] = value.split('~|');
                        return `    clickcode('${action}', '${target}', '${data}')`;
                    }).join('\n');
                onclick = `
 onclick="\n${relevantCodes}\n"`;
                tag = `<button id="live${id}"${onclick}>example</button>`;
                break;
        }

        output += '\n'+ tag + '\n';
    });

    return output;
}



