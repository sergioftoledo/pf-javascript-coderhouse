const menu = document.querySelector('.navegation');
const menuBtn = document.querySelector('.menu-btn');
const closeMenu = document.querySelector('.close-btn');

menuBtn.addEventListener('click', () => {
    menu.classList.add('active');
    menuBtn.style.display = 'none';
});

closeMenu.addEventListener('click', () => {
    menu.classList.remove('active');
    menuBtn.style.display = 'block';
});