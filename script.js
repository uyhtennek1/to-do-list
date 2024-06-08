const taskForm = document.querySelector('form');
const taskItemPrefab = document.querySelector('.task-item');
const highPriorityTaskList = document.querySelector('#lists #high-priority-tasks');
const mediumPriorityTaskList = document.querySelector('#lists #medium-priority-tasks');
const lowPriorityTaskList = document.querySelector('#lists #low-priority-tasks');

taskForm.addEventListener('submit', evt => {
    evt.preventDefault();

    const data = new FormData(taskForm);
    addTaskToList(data.get('task'), data.get('priority'));

    taskForm.reset();
    taskForm.querySelector(`input[type="radio"][value="${data.get('priority')}"]`).checked = true;
});

function addTaskToList(task, priority) {
    if (!['high', 'medium', 'low'].includes(priority)) {
        priority = 'low';
    }

    const newTaskItem = taskItemPrefab.cloneNode(true);
    const taskP = newTaskItem.querySelector('p');

    taskP.setAttribute('data-content', taskP.textContent = task);
    switch(priority) {
        case 'high':
            highPriorityTaskList.insertBefore(newTaskItem, highPriorityTaskList.firstElementChild.nextElementSibling);
            break;
        case 'medium': mediumPriorityTaskList.insertBefore(newTaskItem, mediumPriorityTaskList.firstElementChild.nextElementSibling); break;
        case 'low': lowPriorityTaskList.insertBefore(newTaskItem, lowPriorityTaskList.firstElementChild.nextElementSibling); break;
    }
    newTaskItem.querySelector('button').addEventListener('click', function() {
        newTaskItem.classList.add('finished');
        setTimeout(() => {
            newTaskItem.parentElement.removeChild(newTaskItem);
        }, 2500);
    });
    newTaskItem.classList.add('new');

    newTaskItem.removeAttribute('hidden');

    setTimeout(() => {
        newTaskItem.classList.remove('new');
    }, 1500);
}

// UI test
// addTaskToList('Example', 'high');
// addTaskToList('This is a long long very meaninglessly long example task.', 'high');
// addTaskToList('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'high');
// addTaskToList(' ', 'high');
