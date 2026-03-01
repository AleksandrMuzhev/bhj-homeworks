const modal = document.getElementById('subscribe-modal');
const closeButton = document.querySelector('.modal__close');

// Функция для проверки наличия cookie
function isCookieSet(name) {
    return document.cookie.split(';').some(cookie => {
        return cookie.trim().startsWith(name + '=');
    });
}

// Если cookie нет, показываем окно
if (!isCookieSet('modalClosed')) {
    modal.classList.add('modal_active');
}

// Закрытие окна и установка cookie
closeButton.addEventListener('click', () => {
    modal.classList.remove('modal_active');

    // Устанавливаем cookie на 30 дней
    const date = new Date();
    date.setDate(date.getDate() + 30);
    document.cookie = `modalClosed=true; expires=${date.toUTCString()}; path=/`;
});