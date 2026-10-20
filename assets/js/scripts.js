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
    var screenshotThumbnails = document.querySelectorAll('.screenshot-preview img');
    var screenshotIndex = 0;
    var screenshotPrevious = screenshotDialog.querySelector('.screenshot-previous');
    var screenshotNext = screenshotDialog.querySelector('.screenshot-next');
    function showScreenshot(index) {
        if (index < 0 || index >= screenshotThumbnails.length) return;
        screenshotIndex = index;
        var thumbnail = screenshotThumbnails[index];
        var preview = screenshotDialog.querySelector('img');
        preview.src = thumbnail.src;
        preview.alt = thumbnail.alt;
        screenshotPrevious.disabled = index === 0;
        screenshotNext.disabled = index === screenshotThumbnails.length - 1;
    }
    document.querySelectorAll('.screenshot-preview').forEach(function(button, index) {
        button.addEventListener('click', function() {
            showScreenshot(index);
            screenshotDialog.showModal();
        });
    });
    screenshotPrevious.addEventListener('click', function() { showScreenshot(screenshotIndex - 1); });
    screenshotNext.addEventListener('click', function() { showScreenshot(screenshotIndex + 1); });
    document.addEventListener('keydown', function(event) {
        if (!screenshotDialog.open || event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            showScreenshot(screenshotIndex + (event.key === 'ArrowLeft' ? -1 : 1));
        }
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
            dot.setAttribute('aria-label', screenshotControls.dataset.pageLabel.replace('{page}', i + 1));
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
