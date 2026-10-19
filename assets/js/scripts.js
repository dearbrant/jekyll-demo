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
