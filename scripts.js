document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const clearAllBtn = document.getElementById('clear-all-btn');

    let draggedItem = null;

    // Function to add a new task
    function addTask(taskContent) {
        const taskItem = document.createElement('li');
        taskItem.setAttribute('draggable', true);
        taskItem.innerHTML = `
            <input type="checkbox">
            <span>${taskContent}</span>
            <div class="button-group">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);

        addDragAndDropHandlers(taskItem);
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
        if (target.tagName === 'INPUT' && target.type === 'checkbox') {
            const task = target.nextElementSibling; // span element
            if (target.checked) {
                task.classList.add('completed');
            } else {
                task.classList.remove('completed');
            }
        } else if (target.classList.contains('delete-btn')) {
            target.parentElement.parentElement.remove();
        } else if (target.classList.contains('edit-btn')) {
            handleEditTask(target);
        }
    });

    // Function to handle editing a task
    function handleEditTask(button) {
        const taskItem = button.parentElement.parentElement;
        const taskSpan = taskItem.querySelector('span');
        const currentText = taskSpan.textContent;

        // Create an input field for editing
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = currentText;
        inputField.className = 'edit-input';

        // Replace the task span with the input field
        taskSpan.replaceWith(inputField);
        inputField.focus();

        // Save the changes when the user presses Enter or clicks outside
        inputField.addEventListener('blur', () => {
            saveEdit(inputField, taskItem);
        });

        inputField.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                saveEdit(inputField, taskItem);
            }
        });
    }

    // Function to save the edited task
    function saveEdit(inputField, taskItem) {
        const newText = inputField.value.trim();
        const taskSpan = document.createElement('span');
        taskSpan.textContent = newText;

        // Replace the input field with the updated task span
        inputField.replaceWith(taskSpan);

        // Reapply completed class if the task was completed
        if (taskItem.querySelector('input[type="checkbox"]').checked) {
            taskSpan.classList.add('completed');
        }
    }

    // Event listener for clearing all tasks
    clearAllBtn.addEventListener('click', function() {
        taskList.innerHTML = ''; // Clear all tasks from the list
    });

    // Function to add drag and drop handlers to a task item
    function addDragAndDropHandlers(taskItem) {
        taskItem.addEventListener('dragstart', function() {
            draggedItem = taskItem;
            setTimeout(function() {
                taskItem.style.display = 'none';
            }, 0);
        });

        taskItem.addEventListener('dragend', function() {
            setTimeout(function() {
                draggedItem.style.display = 'flex';
                draggedItem = null;
            }, 0);
        });

        taskItem.addEventListener('dragover', function(e) {
            e.preventDefault();
        });

        taskItem.addEventListener('dragenter', function(e) {
            e.preventDefault();
            taskItem.style.border = '2px dashed #9A7B4F';
        });

        taskItem.addEventListener('dragleave', function() {
            taskItem.style.border = 'none';
        });

        taskItem.addEventListener('drop', function() {
            taskItem.style.border = 'none';
            if (draggedItem) {
                taskList.insertBefore(draggedItem, taskItem);
            }
        });
    }

    // Add drag and drop handlers to existing tasks
    Array.from(taskList.children).forEach(addDragAndDropHandlers);
});
