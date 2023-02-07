const apiUrl = "https://api.quotable.io/random";
let numb, content, color = "gray", startTime, endTime, wrongKey;
const randomQuoteID = document.getElementById("randomQuoteID");


function loadData() {
    numb = 0;
    fetch(apiUrl).then(response => response.json()).then(data => {
        content = data.content.toLowerCase();
        let randomInnerHtml = "";
        Array.from(content).forEach(e => {


            randomInnerHtml += `<span class='quoteSpan'>${e}</span>`

        })
        randomQuoteID.innerHTML = randomInnerHtml;

        let top = randomQuoteID.children[numb].offsetTop;
        let left = randomQuoteID.children[numb].offsetLeft;
        randomQuoteID.setAttribute("style", `--top:${top}px;--left:${left - 2}px`);
    })
}

loadData();

window.onkeyup = e => {
    if (e.key == " ") {
        document.getElementById(`Space`).parentNode.style.backgroundColor = "rgb(34, 34, 34)";
    } else {

        document.getElementById(`${e.key}`).parentNode.style.backgroundColor = "rgb(34, 34, 34)";
    }
}

window.onkeydown = e => {
    console.log(e.key);
    // console.log(document.getElementById(`${e.key}`));
    if (e.key == " ") {
        document.getElementById(`Space`).parentNode.style.backgroundColor = "gray";
    } else {

        document.getElementById(`${e.key}`).parentNode.style.backgroundColor = "gray";
    }
    setTimeout(() => {
        document.getElementById(`${e.key}`).parentNode.style.backgroundColor = " rgb(34, 34, 34)";

    }, 1000);

    if (numb == 0) {

        startTime = performance.now();
        wrongKey = 0;
    }
    if (Array.from(content)[numb] == e.key) {
        let top = randomQuoteID.children[numb].offsetTop;
        let left = randomQuoteID.children[numb].offsetLeft + randomQuoteID.children[numb].offsetWidth;
        randomQuoteID.setAttribute("style", `--top:${top}px;--left:${left}px`);
        randomQuoteID.children[numb++].style.color = color;

        color = "gray";
        if (numb >= Array.from(content).length) {
            endTime = performance.now();
            loadData();


            updateStatus();

        }
    } else if (e.key != "Shift") {
        color = "red";
        wrongKey++;
    }
}

function updateStatus() {
    // update speed 
    let time = (endTime - startTime) / 60000;
    document.getElementById("speedID").innerText = (content.split(" ").length / time).toFixed(2);

    if (document.getElementById("speedID").innerText >= 30) {
        document.getElementById("speedID").style.color = "lime";
    } else {
        document.getElementById("speedID").style.color = "red";
    }


    // update accuracy
    let accuracy = (Array.from(content).length - wrongKey) / Array.from(content).length * 100;

    document.getElementById("accuracyID").innerText = (accuracy).toFixed(2);

    if (accuracy >= 50) {
        document.getElementById("accuracyID").style.color = "lime";
    } else {
        document.getElementById("accuracyID").style.color = "red";
    }

    document.getElementById("scoreID").innerText = Math.round(accuracy * content.split(" ").length / time);

    if (document.getElementById("scoreID").innerText >= 3000) {
        document.getElementById("scoreID").style.color = "lime";
    } else {
        document.getElementById("scoreID").style.color = "red";
    }


}


window.onblur = e => {
    randomQuoteID.classList.add('blur');
    document.querySelector(".mainDiv").setAttribute('style', '--opacity:1')
}

window.onfocus = e => {
    randomQuoteID.classList.remove('blur');
    document.querySelector(".mainDiv").setAttribute('style', '--opacity:0')
}
