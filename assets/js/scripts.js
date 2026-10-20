var body = document.querySelector('body')
var menuTrigger = document.querySelector('#toggle-main-menu-mobile');
var menuContainer = document.querySelector('#main-menu-mobile');

menuTrigger.onclick = function() {
    menuContainer.classList.toggle('open');
    menuTrigger.classList.toggle('is-active')
    body.classList.toggle('lock-scroll')
}


var screenshotDialog = document.querySelector('.screenshot-dialog');
if (screenshotDialog) {
    document.querySelectorAll('.screenshot-preview').forEach(function(button) {
        button.addEventListener('click', function() {
            var thumbnail = button.querySelector('img');
            var preview = screenshotDialog.querySelector('img');
            preview.src = thumbnail.src;
            preview.alt = thumbnail.alt;
            screenshotDialog.showModal();
        });
    });
    screenshotDialog.querySelector('.screenshot-close').addEventListener('click', function() {
        screenshotDialog.close();
    });
    screenshotDialog.addEventListener('click', function(event) {
        if (event.target === screenshotDialog) screenshotDialog.close();
    });
}

var screenshotTrack = document.querySelector('.screenshots-track');
if (screenshotTrack) {
    var screenshotPrev = document.querySelector('.screenshots-prev');
    var screenshotNext = document.querySelector('.screenshots-next');
    function updateScreenshotControls() {
        screenshotPrev.disabled = screenshotTrack.scrollLeft <= 1;
        screenshotNext.disabled = screenshotTrack.scrollLeft >= screenshotTrack.scrollWidth - screenshotTrack.clientWidth - 1;
    }
    function scrollScreenshots(direction) {
        var gap = parseFloat(getComputedStyle(screenshotTrack).columnGap);
        var step = screenshotTrack.querySelector('.screenshot-preview').getBoundingClientRect().width + gap;
        var count = Math.max(1, Math.floor((screenshotTrack.clientWidth + gap + 1) / step));
        screenshotTrack.scrollBy({
            left: direction * step * count,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
        });
    }
    screenshotPrev.addEventListener('click', function() { scrollScreenshots(-1); });
    screenshotNext.addEventListener('click', function() { scrollScreenshots(1); });
    screenshotTrack.addEventListener('scroll', updateScreenshotControls);
    window.addEventListener('resize', updateScreenshotControls);
    updateScreenshotControls();
}
