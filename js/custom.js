// ScrollSpy
M.ScrollSpy.init(document.querySelectorAll('.scrollspy'), {
    scrollOffset: 0
});
//Dropdown
M.Dropdown.init(document.querySelector('.lang-drop'), {
    coverTrigger: false
});
// Modal
M.Modal.init(document.querySelector('.modal'), {
    preventScrolling: false,
    outDuration: 500
});


// Materialize pulse when reach contact section on PC
//document.querySelector('.navbar-categories[href="#contact"]').addEventListener('click', () => {
    //  var socialBarEl = document.querySelector('#social');  
    // wait for scroll 250ms
    //setTimeout(() => {
        // start pulse
        //  socialBarEl.classList.add('pulse');
        //setTimeout(() => {
            // stop pulse
            //  socialBarEl.classList.remove('pulse');
        //}, 3000);
    //}, 250);
//});
    

// Just two vars for the network animation
var fill_color = "#F8BBD0"
var bg_color = "#FFFFFF"
// Dark and light theme button, when pressed:
document.querySelector('.theme-changer').addEventListener('click', () => {
    //Two ternary operators as a shortcut for if/else because look how cool I am
    // Toggles the dark mode for the network animation
    const current_bg_color = bg_color;
    bg_color = current_bg_color === "#FFFFFF" ? "#212121" : "#FFFFFF";
    const current_fill_color = fill_color;
    fill_color = current_fill_color === "#F8BBD0" ? "#424142" : "#F8BBD0";

    // Toggles the "dark" class for the main body of the web
    document.querySelector('body').classList.toggle('dark');
    // Toggles the "dark" class for the hero title
    document.querySelectorAll('.hero-titles').forEach(ele => {
        ele.classList.toggle('dark');
    });
    // Toggles the "dark" class for the subtitle
    document.querySelectorAll('.subtitle').forEach(ele => {
        ele.classList.toggle('dark');
    });
    // Toggles the "dark" class for SVGs on the navbar (lang-drop and theme-changer)
    document.querySelectorAll('.nav-wrapper svg').forEach(ele => {
        ele.classList.toggle('dark');
    });
    // Toggles the "dark" class for the gradient
    document.querySelectorAll('#gradient').forEach(ele => {
        ele.classList.toggle('dark');
    });
    // Toggles the "dark" class for SVGs on the resume
    document.querySelectorAll('#curriculum svg').forEach(ele => {
        ele.classList.toggle('dark');
    });
    // Toggles the "dark" class for each card
    document.querySelectorAll('.card').forEach(ele => {
        ele.classList.toggle('dark');
    });
    // Toggles the "dark" class for each card
    document.querySelectorAll('.card-reveal').forEach(ele => {
        ele.classList.toggle('dark');
    });
    // Toggles the "dark" class for each card Title
    document.querySelectorAll('.card-title').forEach(ele => {
        ele.classList.toggle('dark');
    });
});


// Click on card to close card-reveal 
(function ($, anim) {
    $(document).on('click', '.card', function (e) {
        if ($(this).children('.card-reveal').length) {
            var $card = $(e.target).closest('.card-reveal');
            if ($card.data('initialOverflow') === undefined) {
                $card.data('initialOverflow', $card.css('overflow') === undefined ? '' : $card.css('overflow'));
            }
            var $card = cash(e.target).closest('.card');
            if ($card.data('initialOverflow') === undefined) {
                $card.data('initialOverflow', $card.css('overflow') === undefined ? '' : $card.css('overflow'));
            }
            var $cardReveal = cash(this).find('.card-reveal');
            M.anime({
                targets: $cardReveal[0],
                translateY: 0,
                duration: 225,
                easing: 'easeInOutQuad',
                complete: function (anim) {
                    var el = anim.animatables[0].target;
                    cash(el).css({ display: 'none' });
                $card.css('overflow', $card.data('initialOverflow'));
                }
            });
        } 
    });
})(cash, M.anime);


// Network animation
var canvas = document.querySelector("canvas");
canvas.width = document.querySelector("#intro").offsetWidth;
canvas.height = document.querySelector("#intro").offsetHeight + document.querySelector("nav").offsetHeight + document.querySelector("#gradient").offsetHeight;
var ctx = canvas.getContext("2d");
var TAU = 2 * Math.PI;
times = [];
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    draw();
    requestAnimationFrame(loop);
}
function Ball (startX, startY, startVelX, startVelY) {
var speedMultiplier = 0.6
    this.x = startX || Math.random() * canvas.width;
    this.y = startY || Math.random() * canvas.height;
    this.vel = {
    x: startVelX || (Math.random() * 2 - 1) * speedMultiplier,
    y: startVelY || (Math.random() * 2 - 1) * speedMultiplier
    };
    this.update = function(canvas) {
    if (this.x > canvas.width + 50 || this.x < -50) {
        this.vel.x = -this.vel.x;
    }
    if (this.y > canvas.height + 50 || this.y < -50) {
        this.vel.y = -this.vel.y;
    }
    this.x += this.vel.x;
    this.y += this.vel.y;
    };
    this.draw = function(ctx, can) {
    ctx.beginPath();
    ctx.globalAlpha = .4;
    ctx.fillStyle = fill_color;
    ctx.arc((0.5 + this.x) | 0, (0.5 + this.y) | 0, 3, 0, TAU, false);
    ctx.fill();
    }
}
var balls = [];
for (var i = 0; i < canvas.width * canvas.height / (65*65); i++) {
    balls.push(new Ball(Math.random() * canvas.width, Math.random() * canvas.height));
}
var lastTime = Date.now();
function update() {
    var diff = Date.now() - lastTime;
    for (var frame = 0; frame * 16.6667 < diff; frame++) {
    for (var index = 0; index < balls.length; index++) {
        balls[index].update(canvas);
    }
    }
    lastTime = Date.now();
}
function draw() {
    ctx.globalAlpha=1;
    ctx.fillStyle = bg_color;
    ctx.fillRect(0,0,canvas.width, canvas.height);
    for (var index = 0; index < balls.length; index++) {
    var ball = balls[index];
    ball.draw(ctx, canvas);
    ctx.beginPath();
    for (var index2 = balls.length - 1; index2 > index; index2 += -1) {
        var ball2 = balls[index2];
        var dist = Math.hypot(ball.x - ball2.x, ball.y - ball2.y);
        if (dist < 100) {
            ctx.strokeStyle = fill_color;
            ctx.globalAlpha = 1 - (dist > 100 ? .8 : dist / 150);
            ctx.lineWidth = "2px";
            ctx.moveTo((0.5 + ball.x) | 0, (0.5 + ball.y) | 0);
            ctx.lineTo((0.5 + ball2.x) | 0, (0.5 + ball2.y) | 0);
        }
    }
    ctx.stroke();
    }
}
loop();

// Google Analytics stuff
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-67484305-1', 'auto');
ga('send', 'pageview');