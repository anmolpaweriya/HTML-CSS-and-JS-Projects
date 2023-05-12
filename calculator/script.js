function _(el) { return document.querySelector(el); }

previousData = 0;
onHoldData = 0;
currentOperation = "";
nextValue = false;

function allClearFunc() {       // function to cleare all previous outputs
    _("#display").innerText = "0";
    previousData = 0;
    onHoldData = 0;
    currentOperation = "";
    nextValue = false;
}

function numbPress(numb) {      // function for and number press 
    if (_("#display").innerText == "0" || nextValue)
        _("#display").innerText = "";

    nextValue = false;
    _("#display").innerText += numb;
    previousData = _("#display").innerText;
}

function dotPress() {       // function for dot btn
    if (_("#display").innerText.includes("."))
        return;

    _("#display").innerText += ".";
}

function equalPress() { // function for equal to btn
    if (currentOperation == "")
        _("#display").innerText = previousData;
    else if (currentOperation == "+")
        _("#display").innerText = Number(onHoldData) + Number(previousData);

    else if (currentOperation == "-")
        _("#display").innerText = Number(onHoldData) - Number(previousData);

    else if (currentOperation == "*")
        _("#display").innerText = Number(onHoldData) * Number(previousData);

    else if (currentOperation == "/")
        _("#display").innerText = Number(onHoldData) / Number(previousData);


    // reseting on hold data

    if ("+-*/".includes(currentOperation)) {
        currentOperation = "";
        onHoldData = 0;
    }
    previousData = _("#display").innerText;
    _("#display").innerText = "=" + previousData;

}

function plusPress() {       // function for add btn
    onHoldData = previousData;
    currentOperation = "+";
    nextValue = true;
}

function minusPress() {       // function for add btn
    onHoldData = previousData;
    currentOperation = "-";
    nextValue = true;
}
function multiplyPress() {       // function for add btn
    onHoldData = previousData;
    currentOperation = "*";
    nextValue = true;
}
function dividePress() {       // function for add btn
    onHoldData = previousData;
    currentOperation = "/";
    nextValue = true;
}

function exchangeSign() {       // function for add btn
    previousData = -Number(_("#display").innerText);
    _("#display").innerText = previousData;
}

function getSqrRoot() {       // function for add btn
    previousData = Number(_("#display").innerText);
    previousData = Math.sqrt(previousData).toFixed(8);
    _("#display").innerText = "=" + previousData;

}



Array.from(document.querySelectorAll("td:not(#display)")).forEach(element => {
    element.addEventListener('click', e => {
        if (!isNaN(e.target.innerText))
            numbPress(e.target.innerText)
        else if (_("#display").innerText == "0" && currentOperation == "")
            return

        if (e.target.innerText == "AC")
            allClearFunc();
        else if (e.target.innerText == ".")
            dotPress();
        else if (e.target.innerText == "+")
            plusPress();
        else if (e.target.innerText == "−")
            minusPress();
        else if (e.target.innerText == "×")
            multiplyPress();
        else if (e.target.innerText == "÷")
            dividePress();
        else if (e.target.innerText == "=")
            equalPress();
        else if (e.target.innerText == "+/-")
            exchangeSign();
        else if (e.target.innerText == "√")
            getSqrRoot();

    })
});

