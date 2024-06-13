

// The only thing this module does is handle the header display

export function headerCreate(whereAdd, titleText, backgroundColor){
    const header = document.createElement("header");
    header.style.backgroundColor = backgroundColor;
    // header.setAttribute("background-color", backgroundColor);
    whereAdd.prepend(header);

    const title = document.createElement("h1");
    title.textContent = titleText;
    header.appendChild(title);
}