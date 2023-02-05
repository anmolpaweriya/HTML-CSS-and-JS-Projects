
function _(el) { return document.getElementById(el); }


let imgId = 0,
    preX = 0,
    preY = 0;

_("wrapper").addEventListener("mousemove", e => {
    // if (imgId == 10) { imgId = 0; }
    // console.log(e)
    let a = Math.sqrt(Math.pow((e.clientX - preX), 2) - Math.pow((e.clientY - preY), 2))
    // console.log(a, imgId)
    if (a < 50) { return }
    preX = e.clientX;
    preY = e.clientY;
    // console.log(e.offsetX, e.offsetY);
    // _(`a${imgId % 10}`).classList.add("show");
    _(`a${imgId % 10}`).style.display = "block";
    _(`a${imgId % 10}`).style.zIndex = `${imgId}`;
    _(`a${imgId % 10}`).style.top = `${e.clientY - (_(`a${imgId % 10}`).height / 2)}px`;
    _(`a${imgId % 10}`).style.left = `${e.clientX - (_(`a${imgId % 10}`).width / 2)}px`;


    // _(`a${Math.abs(imgId - 5) % 10}`).classList.remove("show");
    _(`a${Math.abs(imgId - 5) % 10}`).style.display = "none";
    // console.log(_(`a${imgId % 10}`).height)


    imgId++;


})
