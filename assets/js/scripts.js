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
    var screenshotControls = document.querySelector('.screenshots-controls');
    var screenshotPages = [];
    function updateScreenshotControls() {
        var nearest = 0;
        screenshotPages.forEach(function(position, index) {
            if (Math.abs(position - screenshotTrack.scrollLeft) < Math.abs(screenshotPages[nearest] - screenshotTrack.scrollLeft)) nearest = index;
        });
        screenshotControls.querySelectorAll('button').forEach(function(dot, index) {
            dot.setAttribute('aria-current', index === nearest ? 'true' : 'false');
        });
    }
    function buildScreenshotControls() {
        var maxScroll = screenshotTrack.scrollWidth - screenshotTrack.clientWidth;
        var count = Math.ceil(screenshotTrack.scrollWidth / screenshotTrack.clientWidth);
        screenshotControls.replaceChildren();
        screenshotPages = [];
        for (var i = 0; i < count; i++) {
            let position = Math.min(i * screenshotTrack.clientWidth, maxScroll);
            screenshotPages.push(position);
            var dot = document.createElement('button');
            dot.type = 'button';
            dot.setAttribute('aria-label', '查看第 ' + (i + 1) + ' 组截图');
            dot.setAttribute('aria-controls', 'screenshots-track');
            dot.addEventListener('click', function() {
                screenshotTrack.scrollTo({
                    left: position,
                    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
                });
            });
            screenshotControls.appendChild(dot);
        }
        updateScreenshotControls();
    }
    screenshotTrack.addEventListener('scroll', updateScreenshotControls);
    window.addEventListener('resize', buildScreenshotControls);
    buildScreenshotControls();
}
