document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const clearAllBtn = document.getElementById('clear-all-btn');

    // Function to add a new task
    function addTask(taskContent) {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <input type="checkbox">
            <span>${taskContent}</span>
            <div class="button-group">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    }

    // Event listener for adding a task
    function handleAddTask() {
        const taskContent = taskInput.value.trim();
        if (taskContent !== '') {
            addTask(taskContent);
            taskInput.value = ''; // Clear the input field after adding task
        }
    }

    addTaskBtn.addEventListener('click', handleAddTask);

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleAddTask();
        }
    });

    // Event delegation for marking a task as completed, editing or deleting it
    taskList.addEventListener('click', function(event) {
        const target = event.target;
        if (target.tagName === 'INPUT') {
            const task = target.nextElementSibling; // span element
            if (target.checked) {
                task.classList.add('completed');
            } else {
                task.classList.remove('completed');
            }
        } else if (target.classList.contains('delete-btn')) {
            target.parentElement.parentElement.remove();
        } else if (target.classList.contains('edit-btn')) {
            const task = target.parentElement.previousElementSibling; // span element
            const newTaskContent = prompt("Edit your task:", task.textContent);
            if (newTaskContent !== null && newTaskContent.trim() !== "") {
                task.textContent = newTaskContent.trim();
            }
        }
    });

    // Event listener for clearing all tasks
    clearAllBtn.addEventListener('click', function() {
        taskList.innerHTML = ''; // Clear all tasks from the list
    });
});
