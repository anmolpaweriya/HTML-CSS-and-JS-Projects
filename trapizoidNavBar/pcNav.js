// console.log("connected")

langHTML = `<a href="#" class="langA">

<img src="img/c.png" height="20" alt="">
<p> C</p>
</a>
<a href="#" class="langA">

<img src="img/cpp.png" height="20" alt="">
<p> CPP</p>
</a>
<a href="#" class="langA">

<img src="img/java.png" height="20" alt="">
<p> Java</p>
</a>
<a href="#" class="langA">

<img src="img/html.png" height="20" alt="">
<p> HTML</p>
</a>
<a href="#" class="langA">

<img src="img/css.png" height="20" alt="">
<p> CSS</p>
</a>
<a href="#" class="langA">

<img src="img/js.png" height="20" alt="">
<p> JS</p>
</a>
<a href="#" class="langA">

<img src="img/php.png" height="20" alt="">
<p> PHP</p>
</a>
<a href="#" class="langA">

<img src="img/fortran.png" height="20" alt="">
<p> Fortran</p>
</a>
`


homeHTML = ` <a href="#" class="home">
<p>Home</p>
</a>`

toolHTML = `                 <a href="#" class="toolA">
<i class="fa fa-wechat"></i><p>Chat</p>
</a>
<a href="#" class="toolA">
<i class="fa fa-paint-brush"></i><p>Sketch</p>
</a>
<a href="#" class="toolA">
<i class="fa fa-edit"></i><p>Editor</p>
</a>
<a href="#" class="toolA">
<i class="fa fa-image"></i><p>Images</p>
</a>
<a href="#" class="toolA">
<i class="fa fa-cloud"></i><p>Cloud</p>
</a>`

function _(el) { return document.getElementById(el); }

_("langBtn").addEventListener("mouseover", e => {
    _("upperBtns").innerHTML = langHTML;
    // console.log("trigered")
})

_("toolBtn").addEventListener("mouseover", e => {
    _("upperBtns").innerHTML = toolHTML;
})
_("aboutBtn").addEventListener("mouseover", homeFunc)
_("contactBtn").addEventListener("mouseover", homeFunc)

function homeFunc() {
    _("upperBtns").innerHTML = homeHTML;
    // console.log("trigered")

}