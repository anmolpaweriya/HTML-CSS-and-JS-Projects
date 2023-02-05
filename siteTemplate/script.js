
const html = document.documentElement,
    nav = document.querySelector("nav");

function _(el) { return document.getElementById(el); }

window.onscroll = () => {
    if (html.scrollTop < 100) {
        nav.classList.remove("scrolled");


    } else {
        nav.classList.add("scrolled");

    }
}

function menuBtn(e) {
    if (_("mobileNav").style.left != "0%") {
        _('mobileNav').style.left = "0%";
    } else {
        _("mobileNav").style.left = "-100%";
    }
}

function navBtnClick(e) {
    // console.log(e.innerText)     //testing
    _("mobileNav").style.left = "-100%";
}

function cancelNavBtn(e) {
    _("mobileNav").style.left = "-100%";

}
