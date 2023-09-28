let percentage = 69;      // initial percentage
const speed = 15;           // speed of loading animation
const progressBar = document.querySelector('.progressBar');



window.onload = e => {
    reloadAnimation()
}



// funcitons





function reloadAnimation(newPercent = percentage) {


    for (let i = percentage; i >= 0; i--)
        setTimeout(() => {
            progressBar.setAttribute('style', `--percentage:${i}%`)
            progressBar.firstElementChild.innerText = `${i}%`;
        }, (100 - i) * speed);



    percentage = newPercent


    setTimeout(() => {
        for (let i = 0; i <= percentage; i++)
            setTimeout(() => {
                progressBar.setAttribute('style', `--percentage:${i}%`)
                progressBar.firstElementChild.innerText = `${i}%`;
            }, i * speed);
    }, speed * 100);
}




function percentageChangeFunc(e) {

    reloadAnimation(e.value);
}
