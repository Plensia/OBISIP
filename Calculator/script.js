const themeToggle = document.getElementById('toggle-theme');
document.body.classList.add('light');

themeToggle.addEventListener('click', ()=>{
    if(document.body.classList.contains('light')){
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        themeToggle.textContent = '<i class="bi bi-sun"></i>';
    }
    else{
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        themeToggle.textContent = '<i class="bi bi-moon-fill"></i>';
    }
})