document.addEventListener('DOMContentLoaded', function () {
    const signin = document.getElementById('signin');
    const signinForm = document.getElementById('signin__form');
    const welcome = document.getElementById('welcome');
    const userIdSpan = document.getElementById('user_id');
    const logoutBtn = document.getElementById('logout__btn');

    // Функция для показа формы входа
    function showSignin() {
        signin.classList.add('signin_active');
        welcome.classList.remove('welcome_active');
        signinForm.reset();
    }

    // Функция для показа приветствия
    function showWelcome(userId) {
        userIdSpan.textContent = userId;
        welcome.classList.add('welcome_active');
        signin.classList.remove('signin_active');
    }

    // Проверяем, есть ли сохраненный пользователь
    const savedUserId = localStorage.getItem('user_id');

    if (savedUserId) {
        showWelcome(savedUserId);
    } else {
        showSignin();
    }

    // Обработчик отправки формы
    signinForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(signinForm);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/auth');
        xhr.send(formData);

        xhr.onload = function () {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);

                if (response.success) {
                    localStorage.setItem('user_id', response.user_id);
                    showWelcome(response.user_id);
                } else {
                    alert('Неверный логин/пароль');
                    signinForm.reset();
                }
            } else {
                alert('Ошибка соединения с сервером');
                signinForm.reset();
            }
        };

        xhr.onerror = function () {
            alert('Ошибка соединения с сервером');
            signinForm.reset();
        };
    });

    // Обработчик выхода
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            localStorage.removeItem('user_id');
            showSignin();
        });
    }
});