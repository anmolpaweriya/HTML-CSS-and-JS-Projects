
// console.log("connected")
const accessKey = "H9WbUIl_x6iHPKBr50E1WRDZj-4aLaAH_dfJCLu1glE"
function _(el) { return document.getElementById(el) }
_("searchBtn").addEventListener("click", searchFunc)
_("imgType").addEventListener("keypress", e => {
    // console.log(e.code)
    if (e.code == "Enter") {
        searchFunc(e);
    }
})

_("imgCat").addEventListener("keypress", e => {
    // console.log(e.code)
    if (e.code == "Enter") {
        searchFunc(e);
    }
})
function imgListen() {
    const gImg = document.getElementsByClassName("gImg");
    Array.from(gImg).forEach(e => {
        e.addEventListener("click", el => {
            _("popUpBox").classList.remove("hide")
            const popImg = document.querySelector("#popUpBox img")
            popImg.src = e.src;
            _("downloadBtn").setAttribute('download', e.getAttribute("downloadLink"))
            _("downloadBtn").setAttribute('href', e.getAttribute("downloadLink"))

            setTimeout(() => {

                _("mainPage").addEventListener("click", popUpCancelFun)
            }, 1000);
        })
    })
}

_("popUpCancel").addEventListener("click", e => {
    e.preventDefault();
    _("popUpBox").classList.add("hide");
})

function popUpCancelFun() {
    _("popUpBox").classList.add("hide");
    _("mainPage").removeEventListener("click", popUpCancelFun);
    setTimeout(() => {

        imgListen()
    }, 2000);


}


function searchFunc(e) {
    {
        e.preventDefault();

        let html = ""
        const imgType = _("imgType").value;
        const imgCat = _("imgCat").value;


        const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&query=${imgType},${imgCat}&count=10`
        // console.log(imgType, imgCat, imgWidth, imgHeight);    // testing
        fetch(apiUrl).then(res => res.json()).then(res => {
            // console.log(res);
            res.forEach(e => {

                html += `<img class="gImg" downloadLink="${e.links.html}" src = "${e.urls.full}">`
            });

            _("resultDiv").innerHTML = html;
            setTimeout(() => {
                imgListen()
            }, 1000);

        })


    }
}
