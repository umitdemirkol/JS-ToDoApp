// variable 

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btndeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items; // textbox a girilecek değer

// load items 
loadItems();



// eventlistener call
eventListeners();
function eventListeners(e) {
    // submit item
    form.addEventListener('submit', addNewİtem);

    // delete item
    taskList.addEventListener('click', deleteItem);

    // delete all 
    btndeleteAll.addEventListener('click', deleteAllItems);
}

function loadItems() {


    items = getItemsFromLS();

    items.forEach(function (item) {
        createItem(item);

    });
}
// get items from local storage
function getItemsFromLS() {

    if (localStorage.getItem('items') === null) {
        items = [];

    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;

}

// set item to local storage

function setItemToLS(text) {
    items = getItemsFromLS();

    items.push(text);
    localStorage.setItem('items', JSON.stringify(items)); // json.stringfy kullanma sebebi : locale sadece string bilgiler aktarılıyor eklemezsem sadece aralarına virgül ekleyerek gene ekleme yapar eklersen köşeli parantez kullanarak ayırarak ekler

}

function deleteItemFromLS(text) {

    items = getItemsFromLS();
    items.forEach(function (item, index) {

        if (item === text) {
            items.splice(index, 1);
        }
    });

    localStorage.setItem('items', JSON.stringify(items));
}

function createItem(text) {
    // create li
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));

    // ccreate a
    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times" style:"font-family: serif;"></i>';

    // add a to li
    li.appendChild(a);

    // add li to ul

    taskList.appendChild(li);


}

function addNewİtem(e) {

    if (input.value === '') {
        alert("Plase don't  trying to add an empty task ! ");
    }
    else {

        // 
        createItem(input.value);

        // save to local storage
        setItemToLS(input.value);

        // clear input
        input.value = '';
    }

    e.preventDefault();
}

function deleteItem(e) {

    if (e.target.className === 'fas fa-times') {
        if (confirm('are you sure delete?!?')) {
            e.target.parentElement.parentElement.remove();

            // delete item local storage

            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();
}

function deleteAllItems(e) {

    //taskList.innerHTML=''; başka bir silme seçeneği
    if (confirm('are you sure?')) {

        while (taskList.firstChild) { // tasklistin ilk değerinde eeleman olduğu sürece

            taskList.removeChild(taskList.firstChild);
        }

        localStorage.clear();

    }
    e.preventDefault();



}