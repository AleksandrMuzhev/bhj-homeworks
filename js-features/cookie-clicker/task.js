// Получаем элементы DOM
const cookie = document.getElementById('cookie');
const clickerCounter = document.getElementById('clicker__counter');

// Создаем элемент для скорости, если его нет
let clickerSpeed = document.getElementById('clicker__speed');
if (!clickerSpeed) {
    clickerSpeed = document.createElement('div');
    clickerSpeed.id = 'clicker__speed';
    clickerSpeed.innerHTML = 'Скорость клика: <span>0.00</span>';
    document.querySelector('.clicker').appendChild(clickerSpeed);
}

// Получаем span для отображения скорости
const speedSpan = clickerSpeed.querySelector('span');

// Переменные для отслеживания
let clickCount = 0;
let lastClickTime = null;
let clickTimes = []; // Массив для хранения времени последних кликов

// Функция для расчета скорости кликов
function calculateSpeed(currentTime) {
    if (lastClickTime) {
        //Вычисляем время между кликами в секундах
        const timeDiff = (currentTime - lastClickTime) / 1000;

        // Добавляем время в массив (храним последние 10 кликов)
        clickTimes.push(timeDiff);
        if (clickTimes.length > 10) {
            clickTimes.shift(); // Удаляем самый старый результат
        }

        // Рассчитываем среднюю скорость кликов
        if (clickTimes.length > 0) {
            const avgTime = clickTimes.reduce((sum, time) => sum + time, 0) / clickTimes.length;
            const speed = 1 / avgTime; // Кликов в секунду
            return speed.toFixed(2);
        }
    }

    return '0.00';
}

// Функция для изменения размера печеньки
function toggleCookieSize() {
    const currentTime = Date.now();

    // Увеличиваем счетчик кликов
    clickCount++;
    clickerCounter.textContent = clickCount;

    // Вычисляем и отображаем скорость кликов
    const speed = calculateSpeed(currentTime);
    speedSpan.textContent = speed;

    // Обновляем время последнего клика 
    lastClickTime = currentTime;

    // Чередуем размер печеньки
    if (clickCount % 2 === 0) {
        // Четный клик - уменьшаем печеньку
        cookie.width = 200;
        cookie.height = 128;
    } else {
        // Нечетный клик - увеличиваем печеньку
        cookie.width = 250;
        cookie.height = 160;
    }
}

// Добавляем обработчик события клика на печеньку
cookie.onclick = toggleCookieSize;