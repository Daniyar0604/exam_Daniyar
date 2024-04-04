document.addEventListener('DOMContentLoaded', function() {
    
    const input = document.querySelector('.input');
    const cardToDo = document.querySelector('.toDo');
    const cardInProgress = document.querySelector('.inProgress');
    const cardDone = document.querySelector('.done');
    const btnAdd = document.querySelector('.btn');

    // генератор айдишек
    const getRandomKey = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    
    //хранение данных 
    let toDoList = [];
    
    // создание карточки
    const createCard = (inputText) => {
        const key = getRandomKey();
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<div class="toDo-nav" id="${key}">
                             <div class="toDo-nav-line">
                                <h1>${inputText}</h1>
                                <div>
                                    <button class="remove">X</button>
                                </div>
                            </div>
                            <div class="toDo-nav-btn">
                                <button class="btn-todo">In Progress ></button>
                            </div>
                        </div>`;
        cardToDo.append(card);
        input.value = '';
        return key;
    };
    
    // проверяет есть ли данные в local storage если есть он их выводит на страницу
    if (localStorage.getItem('todoList')) {
        toDoList = JSON.parse(localStorage.getItem('todoList'));
        toDoList.forEach(item => createCard(item.todo));
    };

    // сохраняет в локал
    function saveLocalStorage() {
        localStorage.setItem('todoList', JSON.stringify(toDoList));
    }

    // добавление карточки
    btnAdd.addEventListener('click', (e) => {
        e.preventDefault();
        const inputText = input.value;
        const message = {
            todo: inputText,
        };

        toDoList.push(message);
        createCard(inputText); 
        saveLocalStorage();
    });

    // перемещение во вторую колонку
    const moveCardInProgress = (cardElement) => {
        cardInProgress.append(cardElement);
    };
    
    // перемещение в третью колонку
    const moveCardDone = (cardElement) => {
        cardDone.append(cardElement);
    };

    // перекидывает на 2 колонку
    cardToDo.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-todo')) {
            const btnDone = e.target.closest('.card').querySelector('.btn-todo');
            btnDone.innerHTML = 'Done >';
            const cardElementToDo = e.target.closest('.card');
            moveCardInProgress(cardElementToDo);
            saveLocalStorage();
        }
    });

    // перекидывает на 3 колонку
    cardInProgress.addEventListener('click', (e) => {
        if(e.target.classList.contains('btn-todo')) {
            const btnFinish = e.target.closest('.card').querySelector('.btn-todo');
            btnFinish.innerHTML = 'Delete';
            const cardElementinProgress = e.target.closest('.card');
            moveCardDone(cardElementinProgress);
            saveLocalStorage();
        }
    });

    cardToDo.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove')) {
            const cardElement = e.target.closest('.card');
            const key = cardElement.querySelector('.toDo-nav').id;
            cardElement.remove(); 
            toDoList = toDoList.filter(item => item.todo !== key);
            delete toDoList;
            saveLocalStorage();
        }
    });
});








