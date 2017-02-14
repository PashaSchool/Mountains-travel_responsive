(function() {

    var nav = document.getElementById('navigation'),
        showNavBtn = document.getElementById('showNavBtn');

    function animate(draw, duration) {
        var start = performance.now();
        requestAnimationFrame(function magic(time) {
            var timePassed = time - start;
            if (timePassed > duration) timePassed = duration;
            draw(timePassed);
            if (timePassed < duration) {
                requestAnimationFrame(magic);
            }
        })
    }

    showNavBtn.onclick = function(e) {
        if (nav.style.display == "") {
            animate(function(timePassed) {
                nav.style.display = "block";
                nav.style.top = timePassed / 10 + "%";
                nav.style.opacity = timePassed / 1000;
            }, 1000);
        }
        if (nav.style.display == "block") {
            var counter = 0;
            animate(function(timePassed) {
                counter = timePassed;
                nav.style.top = parseInt(nav.style.top, 10) - (timePassed / 10) + "%";
                nav.style.opacity = 1 - (timePassed / 1000);
                if (counter >= 1000) {
                    nav.style.display = "";
                }
            }, 1000);
        }
    }

    window.onresize = function() {
        var windowWidth = window.innerWidth || document.documentElement.offsetWidth || document.body.clientWidth;

        if (windowWidth <= 650) {
            nav.style.display = "";
        }
        if (windowWidth > 650) {
            nav.style.display = "block";
            nav.style.opacity = 1;
        }
    }

})()
