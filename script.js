
// Selecting DOM elements
let contenInput = document.querySelectorAll(".my-input input");
let taskContent = document.querySelector(".task-content");
let contentClick = document.querySelectorAll(".element-search .content-click > div");
let searchInput = document.querySelector(".main-input input[type='search']");
let mYnumber = document.querySelector(".my-input input[type='number']");
let passwordInput = document.querySelector(".my-input input[type='password']");
let removeAll = document.querySelector(".removeAll");
let addSubmit = document.querySelector(".add-submit");
let mainNumber = document.querySelector(".main-number");
let addSearch = document.querySelector(".add-search");
let usernameInput = document.getElementById("username");
let number1Input = document.getElementById("number1");
let number2Input = document.getElementById("number2");

let balance = 0;

window.onload = function() {
    let storedItems = JSON.parse(localStorage.getItem("taskItems")) || [];
    storedItems.forEach(item => {
        createItem(item, true); 
    });
}


addSubmit.onclick = function () {
    addInput();

    mainCalck();

};

addSearch.onclick = () => {
    checkItem();

};

removeAll.onclick = () => {
    removeAllLocal();
}


function createItem(itemText, isPositive) {
    let createElem = document.createElement("div");
    createElem.className = 'task-content';

    let createText = document.createElement("div");
    createText.textContent = itemText;
    createText.classList.add('item-text');

    if (isPositive) {
        createText.classList.add('positive');
    } else {
        createText.classList.add('negative');
    }

    createElem.appendChild(createText);

    let createDelete = document.createElement("div");
    createDelete.className = 'Delete';
    createDelete.textContent = "Delete";
    createElem.appendChild(createDelete);

    taskContent.appendChild(createElem);
}


function geleteElement() {

    let myArray = [];

    taskContent.querySelectorAll('.task-content').forEach(task => {

        let text = task.firstChild.textContent;
        myArray.push(text);
    });

    let myjson = JSON.stringify(myArray);

    localStorage.setItem("taskItems", myjson);
}


document.addEventListener("click", (e) => {

    if (e.target.className === "Delete") {

        e.target.parentNode.remove();

        geleteElement();

    }

});


function myLocalStorig() {

    let myArray = [];

    taskContent.querySelectorAll('.task-content').forEach(task => {

        let text = task.firstChild.textContent;

        myArray.push(text);

    });

    let myjson = JSON.stringify(myArray);

    localStorage.setItem("taskItems", myjson);
}



// /////////////////////////////////


function checkItem() {

    let searchValue = searchInput.value.trim().toLowerCase();
    let localStorageItems = JSON.parse(localStorage.getItem("taskItems")) || [];

    let lastItem = findLastItemByUsernameOrPassword(localStorageItems, searchValue);

    if (lastItem) {
        displayLastItem(lastItem);
    } else {
        alert(`No items found added by ${searchValue}`);
    }
    
};

function findLastItemByUsernameOrPassword(items, searchValue) {
    for (let i = items.length - 1; i >= 0; i--) {
        let item = items[i];
        if (item.toLowerCase().includes(searchValue)) {
            
            return item; 
            
        }
    }
  
    return null;
}




function displayLastItem(lastItem) {

    taskContent.innerHTML = "";

    let cont = document.createElement("div");
    cont.className = 'task-content';

    let text = document.createTextNode(lastItem);

    let Delete = document.createElement("div");
    let DeleteText = document.createTextNode("Delete");

    Delete.className = 'Delete';
    Delete.appendChild(DeleteText);

    cont.appendChild(text);
    cont.appendChild(Delete);

    taskContent.appendChild(cont);
}



function addInput() {


    let usernameValue = document.getElementById('username').value.trim();
    let passwordValue = document.getElementById('password').value.trim();
    let numberValue = document.getElementById('number');

    // Check if all fields are filled
    if (usernameValue !== '' || passwordValue !== "" || numberValue !== "") {
        alert('All fields are already filled.');
        return false;
    }

    alert('not.');

    document.querySelector('.main-class').submit();

   
}



function mainCalck() {
    let usernameValue = usernameInput.value.trim();
    let passwordValue = passwordInput.value.trim();
    let number1Value = parseFloat(number1Input.value.trim());
    let number2Value = parseFloat(number2Input.value.trim());

    if (!isNaN(number1Value)) {
        balance += number1Value;
        createItem(`Date/Time: ${getCurrentDateTime()} - Username: ${usernameValue}, Password: ${passwordValue}, Salary++: ${number1Value}, Balance: ${balance}`);
       
        number1Input.value = "";

    }

    if (!isNaN(number2Value)) {
        if (balance - number2Value >= 0) {
            balance -= number2Value;
            createItem(`Date/Time: ${getCurrentDateTime()} - Username: ${usernameValue}, Password: ${passwordValue}, Salary--: ${number2Value}, Balance: ${balance}`);
           
            number2Input.value = "";

        } else {
            alert("Balance insufficient for withdrawal.");
        }
    }

    myLocalStorig();
    
}

function getCurrentDateTime() {
    let now = new Date();

    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayName = daysOfWeek[now.getDay()];

    let date = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let period = "AM";
    if (hours >= 12) {
        period = "PM";
        if (hours > 12) {
            hours -= 12;
        }
    } else if (hours === 0) {
        hours = 12; 
    }

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    let formattedDate = `${dayName}, ${date}/${month}/${year}`;
    let formattedTime = `${hours}:${minutes}:${seconds} ${period}`;

    return `${formattedDate} ${formattedTime}`;
}

function removeAllLocal() {
    localStorage.removeItem("taskItems");
    taskContent.innerHTML = "";
};


