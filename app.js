const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});


var firebaseConfig = {
  apiKey: "AIzaSyDJKJQjWPZ8KTdpYR5caHpqMpdlECRoamM",
  authDomain: "register-a4d6b.firebaseapp.com",
  databaseURL: "https://register-a4d6b-default-rtdb.firebaseio.com",
  projectId: "register-a4d6b",
  storageBucket: "register-a4d6b.appspot.com",
  messagingSenderId: "744290387467",
  appId: "1:744290387467:web:fb82b6e651d13148f7290e"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const database = firebase.database()

function register () {
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
  favourite_song = document.getElementById('zip_code').value
  milk_before_cereal = document.getElementById('contact_number').value

  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email kag Password mo day, saktoa mau!')
    return
  }
  if (validate_field(full_name) == false || validate_field(zip_code) == false || validate_field(contact_number) == false) {
    alert('Kulang pa day. Kompletoha, nugay padayaw!')
    return
  }
 
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    var user = auth.currentUser

    var database_ref = database.ref()

    var user_data = {
      email : email,
      full_name : full_name,
      zip_code : zip_code,
      contact_number : contact_number,
      last_login : Date.now()
    }

    database_ref.child('users/' + user.uid).set(user_data)

    alert('Huy! naubrahan kana day.')
  })
  .catch(function(error) {
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

function login () {
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Tadlonga ko, Nugay hinangag!')
    return
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    var user = auth.currentUser

    var database_ref = database.ref()

    var user_data = {
      last_login : Date.now()
    }

    database_ref.child('users/' + user.uid).update(user_data)

    alert('Yudiee! na-register na sa ba...')

  })
  .catch(function(error) {
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}




function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    return true
  } else {
    return false
  }
}

function validate_password(password) {
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}