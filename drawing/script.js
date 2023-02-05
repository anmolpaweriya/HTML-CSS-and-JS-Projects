
function _(el) { return document.getElementById(el) }
function $(el) { return document.querySelector(el) }


const canvas = $("canvas"),
    ctx = canvas.getContext("2d"),
    brush = _("brush"),
    eraser = _("eraser"),
    shapes = _("shapes"),
    fillCheck = _("fillCheck"),
    clear_canvas = _("clear_canvas"),
    color_label = $("#color_label>div"),
    color_picker = _("color_picker"),
    slider = _("slider"),
    cursor = _("cursor");


/* initial values */
let brush_color = "#fff",
    partition = 10,
    brush_width = 4,
    activeShape, snap,
    mouse_hold = false,
    activeTool = brush;


canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

slider.value = brush * 10
/* initial values */

cursor.style.width = `${brush_width}px`;
cursor.style.height = `${brush_width}px`;
// document.style.cursor = "none";


document.addEventListener("mousemove", e => {
    cursor.style.top = `${e.clientY - brush_width / 2}px`;
    cursor.style.left = `${e.clientX - brush_width / 2}px`;

})

function drawing_func(e) {

    if (!mouse_hold) { return }

    ctx.strokeStyle = brush_color   // set stroke color
    ctx.lineWidth = brush_width;        // set line width


    if (activeShape == null) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke()                // start stroke
    }
    else if (activeShape == "square") {
        ctx.putImageData(snap, 0, 0);
        if (fillCheck.checked) {

            // for filled rectangle
            ctx.fillStyle = brush_color;
            ctx.fillRect(startX, startY, e.offsetX - startX, e.offsetY - startY)
        } else {

            ctx.strokeRect(startX, startY, e.offsetX - startX, e.offsetY - startY)
        }


    }
    else if (activeShape == "circle") {
        ctx.beginPath();
        ctx.putImageData(snap, 0, 0);


        // console.log(startX, startY)
        // circle
        let radius = Math.sqrt(Math.pow(e.offsetX - startX, 2) + Math.pow(e.offsetY - startY, 2))
        ctx.arc(startX, startY, radius, 0, Math.PI * 2)

        if (fillCheck.checked) {
            // for filled circle
            ctx.fillStyle = brush_color;
            ctx.fill();
        } else {

            ctx.stroke();
        }


    }
}

let startX, startY;

function drawing_start_func(e) {
    mouse_hold = true
    ctx.beginPath();
    // console.log(e.offsetX, e.offsetY)

    // for shapes
    if (activeShape != null) {
        startY = e.offsetY;
        startX = e.offsetX;
        snap = ctx.getImageData(0, 0, canvas.width, canvas.height)
    }
}
function drawing_stop_func(e) {
    mouse_hold = false;
}

canvas.addEventListener('mousedown', drawing_start_func)
canvas.addEventListener('mousemove', drawing_func)
canvas.addEventListener('mouseup', drawing_stop_func)

color_picker.onchange = () => {
    brush_color = color_picker.value
    color_label.style.backgroundColor = brush_color;
    cursor.style.background = brush_color;

}

slider.onchange = () => {
    brush_width = slider.value / partition;
    cursor.style.width = `${brush_width}px`;
    cursor.style.height = `${brush_width}px`;
}

brush.onclick = () => {
    cursor.style.display = "inline-block";
    cursor.style.borderRadius = "50%";


    if (activeShape != null) {

        activeShape = null;
        shapes.innerHTML = `<img src="shapes.png" width="20">`;
        shapes.firstElementChild.classList.remove("active");
        brush.firstElementChild.classList.add("active");
        activeTool = brush;
    }
    brush.firstElementChild.classList.add("active");
    eraser.firstElementChild.classList.remove("active");
    brush_color = "#fff";
    partition = 10;
    brush_width = 4;
    color_label.style.background = brush_color
    activeTool = brush;
    cursor.firstElementChild.style.display = "inline-block";
    cursor.style.width = `${brush_width}px`;
    cursor.style.height = `${brush_width}px`;

}

eraser.onclick = () => {
    cursor.style.display = "inline-block";
    cursor.style.borderRadius = "0%";

    if (activeShape != null) {

        activeShape = null;
        shapes.innerHTML = `<img src="shapes.png" width="20">`;
        shapes.firstElementChild.classList.remove("active");
        brush.firstElementChild.classList.add("active");
        activeTool = brush;
    }
    brush.firstElementChild.classList.remove("active");
    eraser.firstElementChild.classList.add("active");
    brush_color = "#000";
    partition = 1;
    brush_width = 23;
    color_label.style.background = brush_color;
    activeTool = eraser;
    activeShape = null;
    cursor.firstElementChild.style.display = "none";
    cursor.style.width = `${brush_width}px`;
    cursor.style.height = `${brush_width}px`;
}

clear_canvas.onclick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

}

shapes.onclick = () => {
    // document.style.cursor = "crosshair";
    cursor.style.display = "none";

    if (activeTool == eraser) {
        brush_color = "#fff";
        partition = 10;
        brush_width = 4;
        color_label.style.background = brush_color

    }
    if (activeShape == null) {


        shapes.innerHTML = `<i style = "color:#000;font-size:20px" class="fa fa-square-o"></i>`;
        activeTool.firstElementChild.classList.remove("active");
        shapes.firstElementChild.classList.add("active");
        activeShape = "square";
        activeTool = shapes;

    }
    else if (activeShape == "square") {

        activeShape = "circle";
        shapes.innerHTML = `<i style = "color:#000;font-size:20px" class="fa fa-circle-o"></i>`;
        shapes.firstElementChild.classList.add("active");
        activeTool = shapes;

    } else if (activeShape == "circle") {

        activeShape = null;
        shapes.innerHTML = `<img src="shapes.png" width="20">`;
        shapes.firstElementChild.classList.remove("active");
        brush.firstElementChild.classList.add("active");
        activeTool = brush;
    }
}
