class Task {
    content;
    priority;

    constructor(task, priority) {
        this.content = task;
        this.priority = priority;
    }
}

const taskForm = document.querySelector('form');
const taskInputField = taskForm.querySelector('input[type="text"]');

const taskItemPrefab = document.querySelector('.task-item');
const highPriorityTaskList = document.querySelector('#lists #high-priority-tasks');
const mediumPriorityTaskList = document.querySelector('#lists #medium-priority-tasks');
const lowPriorityTaskList = document.querySelector('#lists #low-priority-tasks');

let tasks = [];

function drawTask(taskObj, animated) {
    const newTaskItem = taskItemPrefab.cloneNode(true);
    const taskP = newTaskItem.querySelector('p');

    taskP.setAttribute('data-content', taskP.textContent = taskObj.content);
    switch(taskObj.priority) {
        case 'high':
            highPriorityTaskList.insertBefore(newTaskItem, highPriorityTaskList.firstElementChild.nextElementSibling);
            break;
        case 'medium': mediumPriorityTaskList.insertBefore(newTaskItem, mediumPriorityTaskList.firstElementChild.nextElementSibling); break;
        case 'low': lowPriorityTaskList.insertBefore(newTaskItem, lowPriorityTaskList.firstElementChild.nextElementSibling); break;
    }
    newTaskItem.querySelector('button').addEventListener('click', () => {
        deleteTask(taskObj);
        eraseTask(newTaskItem);
    });
    newTaskItem.removeAttribute('hidden');

    if (!animated)
        return;

    newTaskItem.classList.add('new');
    setTimeout(() => {
        newTaskItem.classList.remove('new');
    }, 1500);
}

function eraseTask(taskElem) {
    taskElem.classList.add('finished');
    setTimeout(function() {
        taskElem.parentElement.removeChild(taskElem);
    }, 2500);
}

function storeTask(taskObj) {
    tasks.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(taskObj) {
    const removeIndex = tasks.indexOf(taskObj);
    if (removeIndex < 0)
        return false;

    tasks.splice(removeIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

taskForm.addEventListener('submit', evt => {
    evt.preventDefault();

    const data = new FormData(taskForm);
    const task = new Task(data.get('task'), data.get('priority'));

    if (!['high', 'medium', 'low'].includes(task.priority)) {
        task.priority = 'low';
    }

    storeTask(task);
    drawTask(task, true);

    taskForm.reset();
    taskForm.querySelector(`input[type="radio"][value="${data.get('priority')}"]`).checked = true;
    taskInputField.focus();
});

if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.tasks);
    for (const task of tasks) {
        drawTask(task, false);
    }
}
