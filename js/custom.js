
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
    });
}

// Google Analytics stuff
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-67484305-1', 'auto');
ga('send', 'pageview');