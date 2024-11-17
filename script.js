const button = document.querySelector('#generate');
const userDisplay = document.querySelector('#user');
const container = document.querySelector('.container');

// Fetching Data from the Api---
function fetchUser() {
    container.style.display = 'none';
    userDisplay.style.display = 'block';

    fetch('https://randomuser.me/api/')
    .then((response) => response.json())
    .then((data) => {
        displayUser(data.results[0])
    })
}

// creating header h1 and button----
function createHeader() {
    userDisplay.innerHTML = '';
    const div = document.createElement('div');
    const h1 = document.createElement('h1');
    h1.textContent = 'Random User Generator';

    // button---
    const button = document.createElement('button');
    const text = document.createTextNode('Generate User');
    button.type = 'button';
    button.id = 'generate';

    button.appendChild(text);

    div.appendChild(h1);
    div.appendChild(button);

    // Adding to the DOM--
    userDisplay.appendChild(div);

    // Re-attaching the event-listener to the new button--
    button.addEventListener('click' , fetchUser);
}

// creating a div in which we can create user details---
function createUserDetails(user) {
    const containerDiv = document.createElement('div');
    containerDiv.className = 'detailsContainer';

    // creating image--
    const image = document.createElement('img');
    image.src = user.picture.large;
    image.alt = 'Loading';

    containerDiv.appendChild(image);

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('details');

    // Adding directly the paragraph to the details div---
    detailsDiv.appendChild(userDetails('Name: ' , `${user.name.first} ${user.name.last}`));
    detailsDiv.appendChild(userDetails('Age: ' , user.dob.age));
    detailsDiv.appendChild(userDetails('Email: ' , user.email));
    detailsDiv.appendChild(userDetails('Phone: ', user.phone));
    detailsDiv.appendChild(userDetails('Location: ', `${user.location.state} ${user.location.country}`));


    // Adding details div to details Container div----
    containerDiv.appendChild(detailsDiv);

    // Adding to DOM---
    userDisplay.appendChild(containerDiv);
}

// Creating a paragraph element---
function userDetails(label, value) {
    const para = document.createElement('p');
    const span = document.createElement('span');

    span.textContent = label;
    para.appendChild(span);

    const valueText = document.createTextNode(value);
    para.appendChild(valueText);

    return para;
}

// After fetching the data , data will come to this function first--
function displayUser(user) {
    if(user.gender === 'female') {
        document.body.style.backgroundColor = 'rebeccapurple';
    }
    else {
        document.body.style.backgroundColor = 'steelblue';
    }

    createHeader();

    createUserDetails(user);
}

// Initial Setup---   
button.addEventListener('click' , fetchUser);