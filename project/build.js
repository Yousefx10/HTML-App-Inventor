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
    </style>
    </head>
    `;

    let DOCUMENT_body =
    `
    <body>
    <h2>TEST the build with basic saved code.</h2>
    </body>
    `;


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

