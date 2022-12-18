const baseURL = "http://127.0.0.1:9090";
const recipeIngredientURL = "http://127.0.0.1:9090/recipeIngredients";
const employeeURL = "http://localhost:9090/employees";
const todosURL = "http://localhost:9090/todos?_limit=10&_page=1";
const userRegisterURL = "http://localhost:9090/user/register";
const userLoginURL = "http://localhost:9090/user/login";

let mainSection = document.getElementById("data-list-wrapper");
let paginationWrapper = document.getElementById("pagination-wrapper");

let registerUserUsername = document.getElementById("register-user-username");
let registerUserFirstname = document.getElementById("register-user-firstname");
let registerUserLastname = document.getElementById("register-user-lastname");
let registerUserEmail = document.getElementById("register-user-email");
let registerUserPassowrd = document.getElementById("register-user-passowrd");
let registerUserAvatar = document.getElementById("register-user-avatar");
let registerUserLevel = document.getElementById("register-user-level");
let registerUserButton = document.getElementById("register-user");

let updateUserUsername = document.getElementById("update-user-username");
let updateUserFirstname = document.getElementById("update-user-firstname");
let updateUserLastname = document.getElementById("update-user-lastname");
let updateUserEmail = document.getElementById("update-user-email");
let updateUserPassowrd = document.getElementById("update-user-passowrd");
let updateUserAvatar = document.getElementById("update-user-avatar");
let updateUserLevel = document.getElementById("update-user-level");
let updateUserButton = document.getElementById("update-user");

let loginUserUsername = document.getElementById("login-user-username");
let loginUserPassword = document.getElementById("login-user-passowrd");
let loginUserButton = document.getElementById("login-user");

let getTodoButton = document.getElementById("fetch-todos");

let userAuthToken = localStorage.getItem("localAccessToken") || null;

window.addEventListener("load", () => {
  
});

getTodoButton.addEventListener("click", async function() {
  let res = await fetch(todosURL, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${userAuthToken}`
    }
  })
  let data = await res.json();

  mainSection.innerHTML = `
    <pre>
      ${JSON.stringify(data, null, 2)}
    </pre>  
  `
})

loginUserButton.addEventListener("click", async function(){
  let userName = loginUserUsername.value;
  let password = loginUserPassword.value;

  let userObj = {
    username: userName,
    password: password
  }

  try {
    let res = await fetch(userLoginURL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userObj)
    })
  
    let data = await res.json();
    let userAuthToken = data.accessToken;
    localStorage.setItem("localAccessToken", data.accessToken); 
    alert('user successfully logged in.')
  } catch (error) {
    alert('Err.', JSON.stringify(error))
  }
})



// registerUserButton.addEventListener('click', function(){
//   let userName = registerUserUsername.value;
//   let firstName = registerUserFirstname.value;
//   let lastName = registerUserLastname.value;
//   let email = registerUserEmail.value;
//   let password = registerUserPassowrd.value;
//   let avatar = registerUserAvatar.value;
//   let level = registerUserLevel.value;

//   let userObject = {
//     username: userName,
//     password: password,
//     email: email,
//     firstname: firstName,
//     lastname: lastName,
//     avatar: avatar,
//     userLevel: level
//   }

//   fetch(userRegisterURL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(userObject)
//   })
//   .then(res => res.json())
//   .then(data => alert(JSON.stringify(data)))
//   .catch(err => alert('error'))
// })

registerUserButton.addEventListener('click', async function(){
  let userName = registerUserUsername.value;
  let firstName = registerUserFirstname.value;
  let lastName = registerUserLastname.value;
  let email = registerUserEmail.value;
  let password = registerUserPassowrd.value;
  let avatar = registerUserAvatar.value;
  let level = registerUserLevel.value;

  let userObject = {
    username: userName,
    password: password,
    email: email,
    firstname: firstName,
    lastname: lastName,
    avatar: avatar,
    userLevel: level
  }

  try {
    let res = await fetch(userRegisterURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userObject)
    })
  
    let data = await res.json();
    alert(JSON.stringify(data))
  } catch (error) {
    alert('Error')
  }
})


