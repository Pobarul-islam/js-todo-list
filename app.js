const addUserBtn = document.getElementById('adduser');
const btnText = addUserBtn.innerText;
const userNameTextField = document.getElementById('username');
const displayRecords = document.getElementById('displayRecords');

let userArray = [];
let edit_id = null;

let objStr = localStorage.getItem('users');
// console.log(objStr);
if (objStr != null) {
  userArray = JSON.parse(objStr);
}
displayInfo();

addUserBtn.onclick = () => {
  const name = userNameTextField.value;
  if (edit_id != null) {
    userArray.splice(edit_id, 1, { name: name });
    edit_id = null;
  } else {
    userArray.push({ name: name });
  }
  saveInfo(userArray);
  userNameTextField.value = '';

  addUserBtn.innerText = btnText;
};

function saveInfo(userArray) {
  let str = JSON.stringify(userArray);
  localStorage.setItem('users', str);
  displayInfo();
}

function displayInfo() {
  let statement = '';
  userArray.forEach((user, i) => {
    statement += `<tr>
                <th>${i + 1}</th>
                <td>${user.name}</td>
                <td><button class="deletebtn" onclick= 'deleteInfo(${i})'>Delete</button> <button class="editbtn" onclick= 'editInfo(${i})'>Edit</button></td>
            </tr>`;
  });
  displayRecords.innerHTML = statement;
}

function editInfo(id) {
  edit_id = id;
  userNameTextField.value = userArray[id].name;
  addUserBtn.innerText = 'Save changes';
}

function deleteInfo(id) {
  userArray.splice(id, 1);
  saveInfo(userArray);
}
