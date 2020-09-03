
// Dark and light theme button
document.querySelector('.theme-changer').addEventListener('click', () => {
    // Changes the value of the theme var
    theme = theme === 'dark' ? 'light' : 'dark';
    // Saves the new theme to localStorage
    localStorage.setItem('theme', theme);
    // Switches the theme without reloading
    // Two ternary operators as a shortcut for if/else
    // Toggles the dark mode for the network animation
    bg_color = theme === 'dark' ? gray900 : white;
    fill_color = theme === 'dark' ? gray800 : lightPink;
    // Toggles the "dark" class for the main body of the web
    document.querySelector('body').classList.toggle('dark');
    // Toggles the favicon that mathes the theme
    favicon.href = "/favicon-highres-" + theme + ".png";
});

// ScrollSpy
M.ScrollSpy.init(document.querySelectorAll('.scrollspy'), {
    scrollOffset: 0
});
//Dropdown
M.Dropdown.init(document.querySelector('.lang-drop'), {
    coverTrigger: false
});
// Modal
M.Modal.init(document.querySelectorAll('.modal'), {
    preventScrolling: false,
    outDuration: 500
});

// Click on card to close card-reveal 
(function ($, anim) {
    $(document).on('click', '.card', function (e) {
        if ($(this).children('.card-reveal').length && $(e.target).closest('.card-reveal').length > 0) {
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

// Design information modal
const activableCards = document.querySelectorAll('.card-image');
for (const card of activableCards) {
// For each card, extracts the id, then uses it to find the title and description hidden in the card
    card.addEventListener('click', function(){
        let id = card.parentElement.id
        let title = document.querySelectorAll('#' + id + ' p')[0].textContent;
        let description = document.querySelectorAll('#' + id + ' p')[1].textContent;
        let extra = document.querySelectorAll('#' + id + ' p')[2].innerHTML;
        document.querySelector('#modal-design .modal-content h4').textContent = title;
        document.querySelectorAll('#modal-design .modal-content p')[0].textContent = description;
        document.querySelector('#modal-design .modal-footer').innerHTML = extra;
        // If there is no extra content (buttons/links), hides the modal footer
        let footer = document.querySelector('#modal-design .modal-footer');
        if (extra == '') {
            footer.style.display = "none";
        } else { 
            footer.style.display = "";
        }
    });
}

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