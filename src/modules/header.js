export function headerCreate(whereAdd, titleText, backgroundColor){
    const header = document.createElement("header");
    header.setAttribute("background-color", backgroundColor);
    whereAdd.prepend(header);

    const title = document.createElement("h1");
    title.textContent = titleText;
    header.appendChild(title);
}


/* 
    <header>
        <h1>Overview</h1>
    </header>
*/