function activeAnimate() {
    _(".animationSVG").classList.add("searchActive");
    _(".bookMarks").classList.add("showBookMarks");

    _("#inputFieldID").focus()
}
function disableAnimate() {
    _(".animationSVG").classList.remove("searchActive");
    _(".bookMarks").classList.remove("showBookMarks");

    _("#inputFieldID").blur()
        ;
}

function _(el) {
    return document.querySelector(el);
}

function googleSearch(query) {
    window.location.href = `https://www.google.com/search?client=firefox-b-e&q=${query.split(" ").join("+")}`
}


window.onkeydown = e => {
    // if (!_(".animationSVG").classList.contains("searchActive"))
    activeAnimate();
    e.stopPropagation();

}

_("#inputFieldID").onkeydown = e => {
    e.stopPropagation();

    if (e.key == "Enter") googleSearch(e.target.value)
    else if (e.target.value == "" && e.key == "Backspace") disableAnimate()
    else activeAnimate()
}