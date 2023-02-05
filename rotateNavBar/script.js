
const navBtn = document.getElementById("navBtn"),
    home = document.getElementById('home'),
    about = document.getElementById('about'),
    contact = document.getElementById('contact'),
    page = document.getElementById('page');
navBtn.style.rotate = '-45deg';
page.style.rotate = '0deg';

navBtn.addEventListener('click', e => {
    if (navBtn.style.rotate == '-45deg') {
        navBtn.style.rotate = '-225deg';
        page.style.rotate = '-20deg';

        setTimeout(() => {

            home.style.marginLeft = '20px';
        }, 100);
        setTimeout(() => {

            about.style.marginLeft = '40px';
        }, 200);
        setTimeout(() => {

            contact.style.marginLeft = '60px';
        }, 300);

    } else {
        navBtn.style.rotate = '-45deg';
        page.style.rotate = '0deg';




        home.style.marginLeft = '-100px';

        about.style.marginLeft = '-100px';

        contact.style.marginLeft = '-100px';

    }
    // console.log('clicked')
})
