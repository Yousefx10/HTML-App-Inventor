#Welcome to notes area
i'll write here all the required notes for this project.


##Ways to call function when creaing new KIT
newParagraph.onclick = timeline_properties;//option 1 : won't be visible in the dom.
newParagraph.setAttribute('onclick', 'handleClick()');//option 2: will be visible in the dom.


##kit type instructions :
1 : label
2 : text






##iframe alternatives
maybe using this code in the future to replace the violation error related to document.write()

    const html = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>Hello</title>
        </head>
        <body>World!</body>
    </html>
    `;
    const iframe = document.createElement('iframe');
    iframe.addEventListener('load', () => {
    const docOld = iframe.contentWindow.document;
    const docNew = new DOMParser().parseFromString(html, 'text/html');
    docOld.insertBefore(docNew.doctype, docOld.firstChild);
    docOld.replaceChild(docNew.documentElement, docOld.documentElement);
    });
    document.body.appendChild(iframe);


##for adding it after specific element :

    If want to append it to a specific element within the iframe, use:
    const updateME = iframeDoc.getElementById('updateME');
    updateME.appendChild(newParagraph);