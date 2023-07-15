function _(el) { return document.querySelector(el) }




function headingAnimation() { // for welcome heading animation

    let headingText = ""
    _("#animationHeadingID").innerText.split("").forEach(charElement => {
        headingText += `<span class= "animationSpan">${charElement}</span>`
    });

    _("#animationHeadingID").innerHTML = headingText


    Array.from(document.querySelectorAll(".animationSpan")).forEach((element, index) => {

        element.onpointerenter = () => element.classList.remove("showSpanAnimation");
        element.onpointerleave = () => element.classList.add("showSpanAnimation");
        setTimeout(() => { element.classList.add("showSpanAnimation") }, index * 100);
    });

}



// search Bar working
const getkKeywordFunc = () => _(".searchBarDiv>input").value.split(" ").join("+");

_(".searchBarDiv>button").onclick = () => location.href = `https://google.com/search?q=${getkKeywordFunc()}`;
_(".searchBarDiv>input").onkeydown = e => {
    if (e.key === "Enter")
        location.href = `https://google.com/search?q=${getkKeywordFunc()}`;
}


// add shortcut Button



function addShortcutBtnfunc() {
    let shortcutUrl = prompt("Enter URL ");

    if (shortcutUrl != null) {
        let temp = localStorage.getItem("shortcuts") || ""
        localStorage.setItem("shortcuts", shortcutUrl + "," + temp)
    }
    refreshShortcutList()
}

function refreshShortcutList() {
    let shortcutList = localStorage.getItem("shortcuts");
    if (shortcutList) {
        _(".savedPagesDiv").innerHTML = ""
        shortcutList.split(",").forEach(element => {
            if (element) {
                let site = element.split("/").filter(e => e.includes("."))[0];
                sitename = site.split(".")[0];
                console.log(sitename)
                _(".savedPagesDiv").innerHTML +=
                    `<a href="${element}" class="ShortcutClass">
                <img src="http://${site}/favicon.ico">
                ${sitename}</a>`
            }

        })

        _(".savedPagesDiv").innerHTML += `<button id="addShortcutBtn" onclick="addShortcutBtnfunc()" class="ShortcutClass">+</button>`
    }
}



// focus on search bar

window.onload = () => {
    headingAnimation();      // for welcome heading animation
    _(".searchBarDiv>input").focus();
    _(".imgLogoDiv").classList.add("showImgLogoDiv");   // for logo animation
    refreshShortcutList();
}