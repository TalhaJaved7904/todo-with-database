// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import {
  ref,
  set,
  getDatabase,
  push,
  onValue,
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
const auth = getAuth();

var model = {};

var userName = document.getElementById("userName")
var email = document.getElementById("email")
var password = document.getElementById("password")

window.signUp = function (e){
    e.preventDefault()
    model.email = email.value;
    model.userName = userName.value;
    model.password = password.value;
    console.log(model)
    createUserWithEmailAndPassword(auth, model.email, model.password)
    .then(
        function(res){
            console.log(res.user.uid,"Success Response")
            model.id = res.user.uid
            var reference = ref(database,`users/${model.id}`)
            set(reference, model).then(function(dbRes){
                alert("User Created Successfully")
                window.location.href = '/index.html'
            })
            .catch(function(dbErr){
                alert("dbErr.message")
            })
            email.value = ""
            userName.value = ""
            password.value = ""
        }).catch(function(err){
            console.log(err,"Response Failed")
            alert(err.message)
        })
}