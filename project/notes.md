# Welcome to notes area
i'll write here all the required notes for this project.


## Ways to call function when creaing new KIT
newParagraph.onclick = timeline_properties;//option 1 : won't be visible in the dom.
newParagraph.setAttribute('onclick', 'handleClick()');//option 2: will be visible in the dom.


## kit type instructions :
1 : Label
2 : Text
3 : Button
4 : Picture
5 : Timer





## iframe alternatives
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


## for adding it after specific element :

    If want to append it to a specific element within the iframe, use:
    const updateME = iframeDoc.getElementById('updateME');
    updateME.appendChild(newParagraph);


# Instructions For Building The Workspace
1. When User Adds A "Functional" Kit.
2. That Kit Will Be Added into The #kit_space and saved in the memory.
3. Adds A List Of Known Event's That Suitable For Each Kit.
4. After Adding The Selected Event, The #actions_space Will Start To Suggest Some Actions.
5. Adding The Actions Will Be Merged With Events ON THE #PLAYGROUND_SPACE.