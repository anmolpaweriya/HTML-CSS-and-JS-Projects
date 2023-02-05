
// console.log("connected")

Array.from(document.querySelectorAll(".cards")).forEach(e=>{
    e.addEventListener("click",el=>{
        document.querySelector(".active").classList.remove("active")
        console.log("clicked");
        e.classList.add("active")
    })
})
