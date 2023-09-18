// Dialog
var openButton = document.getElementById('openButton');
var closeButton = document.getElementById('closeButton');
var exDialog = document.getElementById('exDialog');

openButton.addEventListener('click', function() {
    exDialog.showModal();
});

closeButton.addEventListener('click', function() {
    exDialog.close();
});

// Fitler 
function fitlerSelection(e) {
    const items = document.querySelectorAll(".portfolio-item");
    const cerItems = document.querySelectorAll(".item-cer");
    const webItems = document.querySelectorAll(".item-web");
    
    switch(e) {
        case 'item-web':
            cerItems.forEach(cerItem =>{
                cerItem.setAttribute("hidden", true);
            });
            webItems.forEach(webItem =>{
                webItem.removeAttribute("hidden");
            });
            break;
        case 'item-cer':
            webItems.forEach(webItem =>{
                webItem.setAttribute("hidden", true);
            });
            cerItems.forEach(cerItem =>{
                cerItem.removeAttribute("hidden");
            });
            break;
        default:
            items.forEach(item =>{
                item.removeAttribute("hidden");
            });
      }
};

// Activate Button
const btnContainer = document.getElementById("portfolio-btns");
const btns = btnContainer.querySelectorAll(".btn");

btns.forEach(btn => {
    btn.addEventListener("click", function(){
        const currentActive = btnContainer.querySelector(".active");
        if(btn === currentActive) {
            // Do nothing
        }else {
            btn.classList.add("active");
            currentActive.classList.remove("active");
        }
    });
});

//Navigation Scroll
var navLists = document.querySelectorAll(".navigation-list .scrollto", true);

const navListActive = () => {
    var position = window.scrollY + 200;
    navLists.forEach( navList => {
        if(!navList.hash) return
        var section = document.querySelector(navList.hash);
        if(!section) return
        if(position >= section.offsetTop && position <= (section.offsetTop + section.outerHeight)){
            navList.classList.add("active");
        } else {
            navList.classList.remove("active");
        }
    });
}

// Navigation select
const navContainer = document.getElementById("nav-list");
const navItems = navContainer.querySelectorAll(".scrollto");

navItems.forEach(navItem => {
    navItem.addEventListener("click", () =>{
        const currentActive = navContainer.querySelector(".active");
        if(navItem === currentActive) {
            // Do nothing
        } else {
            currentActive.classList.remove("active");
            navItem.classList.add("active");
        }
    });
});

// Typing 

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="home-wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('home-typing');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.innerHTML = ".home-typing > .home-wrap { border-right: 2px solid var(--main-item-color); }";
    document.body.appendChild(css);
};
