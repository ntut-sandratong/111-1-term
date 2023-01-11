$(document).ready(function () {

    if( $('.booking__details--table').length > 0 ) {
        const query_uid = new URLSearchParams(window.location.search).get('uid');
        readUserData(query_uid);
    }
    
    $(".js-submit").click(function(e){
        e.preventDefault();

        window.show_loading();

        $('label').removeClass('error');

        let form_data = {
            people: $('select[name="people"]').val(),
            date: $('select[name="date"]').val(),
            time: $('select[name="time"]').val(),
            title: $('select[name="title"]').val(),
            name: $('input[name="name"]').val(),
            tel: $('input[name="tel"]').val(),
            email: $('input[name="email"]').val(),
            tnc: $('input[name="tnc"]').is(':checked'),
        }

        let allow_write = true;
        for (const prop in form_data) {
            if( prop == "tnc" && form_data[prop] == false) {
                allow_write = false;
                $('#' + prop).addClass('error');
            } else if ( form_data[prop] == null || form_data[prop] == "" ) {
                allow_write = false;
                $('#' + prop).addClass('error');
            }
        }
        if( allow_write ) {
            writeUserData(uuidv4(), form_data);
        } else {
            window.hide_loading();
        }

    });
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, child, get, onValue } from "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.15.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDoflNim9dLLoCTkyKPQmE3DekywuEfqHU",
    authDomain: "term-f5a2a.firebaseapp.com",
    databaseURL: "https://term-f5a2a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "term-f5a2a",
    storageBucket: "term-f5a2a.appspot.com",
    messagingSenderId: "399206228754",
    appId: "1:399206228754:web:0f5f40d7f3884d8eb649cb",
    measurementId: "G-YPYHQMKSLR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function writeUserData(userId, userData) {
    // Write data to DB
    const db = getDatabase();
    const reference = ref(db, 'users/' + userId);
    // set(reference, userData).addOnSuccessListener;
    set(reference, userData);
    onValue(reference, (snapshot) => {
        const data = snapshot.val();
        if(data) {
            console.log(data);
            setTimeout(function(){
                window.location = "thankyou?uid=" + userId;
            }, 1000);
        } else {
            console.log("No data available");
            window.hide_loading();
        }
    });
}

function readUserData(userId) {
    const db = getDatabase();
    const reference = ref(db, 'users/' + userId);
    get(child(ref(db), 'users/' + userId)).then((userDataInDb) => {
        if (userDataInDb.exists()) {
            for(let prop in userDataInDb.val()) {
                $('.data-'+prop).text(userDataInDb.val()[prop]);
            }
            console.log(userDataInDb.val()['title']);
            if(userDataInDb.val()['title'] == 'mr') {
                $('.data-title').text($('.data-name').text() + '先生');
            } else if(userDataInDb.val()['title'] == 'ms') {
                $('.data-name').text($('.data-name').text() + '小姐');
            } else if(userDataInDb.val()['title'] == 'mrs') {
                $('.data-name').text($('.data-name').text() + '女士');
            }
            return true;
        } else {
            console.log("No data available");
            return false;
        }
    }).catch((error) => {
        console.error(error);
        return false;
    });
}

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}