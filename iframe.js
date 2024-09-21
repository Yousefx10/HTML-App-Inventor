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
             .MEselected{background:green;color:white;}
             </style>
            </head>
            <body id="updateME">

            </body>
          </html>
        `);
        iframeDoc.close(); // Close the document to render content


