document.addEventListener('DOMContentLoaded', function() {
    const tasks = [
        { title: 'Покормить кота', done: false },
        { title: 'Сделать домашнее задание', done: true },
        { title: 'Позвонить маме', done: false },
        { title: 'Купить продукты', done: false }
    ];
    
    const tasksList = document.getElementById('tasks__list');
    const taskInput = document.getElementById('task__input');
    const taskAddButton = document.getElementById('tasks__add');
    
    // Функция для отображения задач
    function renderTasks() {
        tasksList.innerHTML = '';
        
        tasks.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');
            if (task.done) {
                taskElement.classList.add('task_done');
            }
            
            taskElement.innerHTML = `
                <div class="task__title">
                    ${task.title}
                </div>
                <div class="task__actions">
                    <button type="button" class="task__remove" data-index="${index}">&times;</button>
                </div>
            `;
            
            // Добавляем обработчик для отметки выполнения
            taskElement.querySelector('.task__title').addEventListener('click', function() {
                task.done = !task.done;
                renderTasks();
            });
            
            tasksList.appendChild(taskElement);
        });
        
        // Добавляем обработчики для кнопок удаления
        document.querySelectorAll('.task__remove').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.dataset.index;
                tasks.splice(index, 1);
                renderTasks();
            });
        });
    }
    
    // Добавление новой задачи
    taskAddButton.addEventListener('click', function(event) {
        event.preventDefault();
        
        const title = taskInput.value.trim();
        
        if (title) {
            tasks.push({ title: title, done: false });
            taskInput.value = '';
            renderTasks();
        }
    });
    
    // Добавление по Enter
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            taskAddButton.click();
        }
    });
    
    // Начальный рендер
    renderTasks();
});