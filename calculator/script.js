function _(el) { return document.querySelector(el); }

let calStr = "";


function isSymbol(char) {

    return '+-*/'.includes(char)
}

function btnClick(e) {

    let appendNumb = e.innerText;




    if (isSymbol(appendNumb) && calStr == "")
        appendNumb = "0" + appendNumb;
    else if (appendNumb == '.' && isSymbol(calStr.at(-1)))
        appendNumb = '0.'





    if (isSymbol(appendNumb) && isSymbol(calStr.at(-1))) {
        calStr = calStr.slice(0, calStr.length - 1) + appendNumb;

    }
    else
        calStr += appendNumb;

    console.log(calStr)
    _('#display').innerText = calStr;
}


function allClear() {
    calStr = ""
    _('#display').innerText = '0'
}


function calculateResult() {

    if (isSymbol(calStr.at(-1)))
        calStr = calStr.slice(0, calStr.length - 1)

    calStr = eval(calStr)
    _('#display').innerText = calStr;

}


function squareRoot() {

    if (!isNaN(calStr)) {

        calStr = Math.sqrt(calStr);
        _('#display').innerText = calStr;


    }
}



function reverseSign() {


    if (!isNaN(calStr)) {
        if (calStr[0] == '-')
            calStr = calStr.slice(1)
        else
            calStr = '-' + calStr

        _('#display').innerText = calStr;


    }

}
