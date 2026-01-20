// Получаем элементы для счетчиков
const deadCounter = document.getElementById('dead');
const lostCounter = document.getElementById('lost');

// Начальные значения счетчиков
let dead = 0;
let lost = 0;

// Функция для получения лунки по индексу
function getHole(index) {
    return document.getElementById(`hole${index}`);
}

// Функция для проверки победы или поражения
function checkGameResult() {
    if (dead >= 10) {
        alert('Победа! Вы убили 10 кротов!');
        resetGame();
    } else if (lost >= 5) {
        alert('Вы проиграли! Кроты сбежали!');
        resetGame();
    }
}

// Функция для сброса игры
function resetGame() {
    dead = 0;
    lost = 0;
    deadCounter.textContent = dead;
    lostCounter.textContent = lost;
}

// Функция обработки клика по лунке
function handleHoleClick(event) {
    const hole = event.target;

    // Проверяем, есть ли в лунке крот
    if (hole.classList.contains('hole_has-mole')) {
        // Попадание - увеличиваем счет убитых кротов
        dead++;
        deadCounter.textContent = dead;

        // Удаляем класс крота из лунки (крот "умер")
        hole.classList.remove('hole_has-mole');
    } else {
        // Промах - увеличиваем счетчик промахов
        lost++;
        lostCounter.textContent = lost;
    }

    // Проверяем условия победы/поражения
    checkGameResult();
}

// Регистрируем обработчики событий для всех лунок
for (let i = 1; i <= 9; i++) {
    const hole = getHole(i);
    hole.addEventListener('click', handleHoleClick);
}