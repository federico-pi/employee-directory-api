let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".employees-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

fetch(urlAPI)
  .then(res => res.json())
  .then(res => res.results)
  .then(displayEmployees)
  .catch(err => console.log(err))

function displayEmployees(employeeData) {
  employees = employeeData
  let employeeHTML = '';

  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

    employeeHTML += `
      <div class="employee" data-index="${index}">
        <div class="employee-picture">
          <img class="avatar" src="${picture.large}" />
        </div>
        <div class="employee-info">
          <h2 class="name target">${name.first} ${name.last}</h2>
          <p class="email">${email}</p>
          <p class="address">${city}</p>
        </div>
      </div>
    `
  });
  gridContainer.innerHTML = employeeHTML;
}

function displayModal(index) {
  let { name, dob, phone, email, location: { city, street, state, postcode }, picture } = employees[index];
  let date = new Date(dob.date);

  const modalHTML = `
  <img class="avatar" src="${picture.large}" />
  <div class="text-container">
    <h2 class="name">${name.first} ${name.last}</h2>
    <p class="email">${email}</p>
    <p class="address">${city}</p>
    <hr />
    <p>${phone}</p>
    <p class="address">${street}, ${state} ${postcode}</p>
    <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
  </div>
  `;

  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
}

gridContainer.addEventListener('click', e => {
  clearSearch();
  if (e.target !== gridContainer) {
    const employee = e.target.closest(".employee");
    const index = employee.getAttribute('data-index');
    displayModal(index);
  }
});

modalClose.addEventListener('click', () => {
  overlay.classList.add("hidden");
});

let employeeName = document.getElementsByClassName('target');

function searchEmployees() {
  let input = document.getElementById('search').value;
  input = input.toLowerCase();
  for (let i=0; i<employeeName.length; i++) {
    if (!employeeName[i].innerHTML.toLowerCase().includes(input)) {
        employeeName[i].parentNode.parentNode.style.display="none";
      }
      else {
        employeeName[i].parentNode.parentNode.style.display="flex";
      }
  }
}

const modal = document.getElementById('modal');

function clearSearch() {
   document.getElementById('search').value = '';
   for (let i=0; i<employeeName.length; i++) {
     employeeName[i].parentNode.parentNode.style.display="flex";
   }
}

modal.addEventListener('click', (e) => {
  if (e.target.classList.contains('right-arrow')) {
    let z = null
    for (let i=0; i<12; i++) {
      if (employeeName[i].innerText.toLowerCase() === document.querySelector('.text-container').children[0].innerText.toLowerCase()) {
        z = employeeName[i].parentNode.parentNode.getAttribute('data-index');
        z++;
        return displayModal(z)
      }
    };
  }
  if (e.target.classList.contains('left-arrow')) {
    let z = null
    for (let i=0; i<12; i++) {
      if (employeeName[i].innerText.toLowerCase() === document.querySelector('.text-container').children[0].innerText.toLowerCase()) {
        z = employeeName[i].parentNode.parentNode.getAttribute('data-index');
        z--;
        return displayModal(z)
      }
    };
  }
});
