// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  ref,
  set,
  getDatabase,
  push,
  onValue,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAK1RyOewsM3M50j9ntqahrjRkl3lgi_Eo",
  authDomain: "todo-app-b39b2.firebaseapp.com",
  databaseURL: "https://todo-app-b39b2-default-rtdb.firebaseio.com",
  projectId: "todo-app-b39b2",
  storageBucket: "todo-app-b39b2.appspot.com",
  messagingSenderId: "808953284094",
  appId: "1:808953284094:web:a36d7f0f0222108d672caf",
  measurementId: "G-DLWVC3DG3H"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();

var inp = document.getElementById("inp");
var tasks;


window.add = function () {
  var obj = {
    text: inp.value,
  };

  obj.id = push(ref(database, "Tasks/")).key;

  var reference = ref(database, `Tasks/${obj.id}`);

  set(reference, obj);
};



function renderList() {
  for (var i = 0; i < tasks.length; i++) {
    showList.innerHTML += `<li> ${tasks[i].text} </li> <button onclick="TodoUpdate('${tasks.id}')" class="btn bg-success p-2 px-5  text-light">EDIT</button> <button onclick="Tododel('${tasks.id}')" class="btn bg-danger text-center p-2 px-5  text-light">DELETE</button>`;
  }
  // var inp = document.getElementById('inp').value = ''
}

function getData() {
  var reference = ref(database, "Tasks/");

  onValue(reference, function (data) {
    tasks = Object.values(data.val())
    console.log(data.val());
    renderList();
  });
}
window.deleteAllTasks = function (id) {

  remove(ref(database, `Tasks/`))

}
getData();

window.Tododel = function (id) {
  remove(ref(database, `Tasks/${id}`))
}

window.TodoUpdate = function (id) {
  console.log(id);
  var NewTodo = prompt('Enter Update')

  update(ref(database, `Tasks/${id}`), {
    tasks: Tasks
  })
}
// TodoUpdate()