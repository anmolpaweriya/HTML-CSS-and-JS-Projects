
function _(el) {
    return document.getElementById(el);
}
const menuBtnDiv = document.querySelector("#menuBtn>div>div");


let langBtnStatus = false;



_("menuBtn").addEventListener("click", e => {
    menuBtnDiv.classList.toggle("show")
    if (menuBtnDiv.parentNode.hasAttribute("style")) {
        menuBtnDiv.parentNode.removeAttribute("style");
        buttonsHideFunc();
        _("menuBtn").style.rotate = "0deg"

    } else {
        menuBtnDiv.parentNode.setAttribute("style", "--top-rotate: 35deg;--bottom-rotate: -35deg;--width:120%")

        buttonsShowFunc();

        _("menuBtn").style.rotate = "360deg"

    }
})

document.getElementById("langBtnToggle").onclick = () => {
    if (!langBtnStatus) {
        langBtnStatus = true;
        langShowFunc();
        // console.log("show")
    } else {
        langBtnStatus = false;
        langHideFunc();
        // console.log("hide")

    }
}


function buttonsShowFunc() {
    let top = 0, left = 0, time = 100;
    Array.from(document.getElementsByClassName("insiderBtns")).forEach(e => {
        time += 100
        setTimeout(() => {
            top -= 90;
            // left -= 40;
            e.style.top = `${top}px`;
            e.style.left = `${left}px`;
        }, time)
    })
}

function buttonsHideFunc() {
    let time = 0;
    if (langBtnStatus) {

        langBtnStatus = false;
        langHideFunc();
        // console.log("hide")

    }
    Array.from(document.getElementsByClassName("insiderBtns")).forEach(e => {
        time += 100
        setTimeout(() => {

            e.style.top = `${0}px`;
            e.style.left = `${0}px`;
        }, time)
    })



}

function langShowFunc() {
    let time = 0, left = -0;
    Array.from(document.querySelectorAll(".landDiv>a")).forEach(e => {
        time += 100;
        setTimeout(() => {
            left -= 80;

            e.style.opacity = "1";
            e.style.left = `${left}px`;
        }, time)
    })
}

function langHideFunc() {
    let time = 0;
    Array.from(document.querySelectorAll(".landDiv>a")).forEach(e => {
        time += 100;
        setTimeout(() => {

            e.style.opacity = "0";
            e.style.left = `${0}px`;
        }, time)
    })
}
