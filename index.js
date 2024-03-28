document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        const taskPriority = prioritySelect.value;
        if (taskText !== '') {
            addTask(taskText, taskPriority, 'Pending');
            taskInput.value = '';
        }
    });

    function addTask(taskText, priority, status) {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <span>${taskText}</span>
            <span class="priority">${priority}</span>
            <span class="status">${status}</span>
            <button class="delete-btn">Delete</button>
            <button class="edit-btn">Edit</button>
            <button class="status-btn">${status}</button>
        `;
        taskList.appendChild(li);
        bindTaskEvents(li);
    }

    function bindTaskEvents(taskItem) {
        const deleteBtn = taskItem.querySelector('.delete-btn');
        const editBtn = taskItem.querySelector('.edit-btn');
        const statusBtn = taskItem.querySelector('.status-btn');

        deleteBtn.addEventListener('click', function() {
            taskItem.remove();
        });

        editBtn.addEventListener('click', function() {
            const span = taskItem.querySelector('span');
            const newText = prompt('Edit task:', span.textContent);
            if (newText !== null) {
                span.textContent = newText;
            }
        });

        statusBtn.addEventListener('click', function() {
            const statusSpan = taskItem.querySelector('.status');
            const status = statusSpan.textContent;
            if (status === 'Pending') {
                statusSpan.textContent = 'Completed';
                statusSpan.classList.add('completed');
                statusBtn.textContent = 'Completed';
            } else {
                statusSpan.textContent = 'Pending';
                statusSpan.classList.remove('completed');
                statusBtn.textContent = 'Pending';
            }
        });
    }

    function checkStatus() {
        const tasks = document.querySelectorAll('.task-item');
        tasks.forEach(task => {
            const statusSpan = task.querySelector('.status');
            const status = statusSpan.textContent;
            if (status === 'Completed') {
                task.classList.add('completed-task');
            } else {
                task.classList.remove('completed-task');
            }
        });
    }

    // Check status on page load
    checkStatus();
});
