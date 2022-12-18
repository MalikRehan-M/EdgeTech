const baseURL = "http://127.0.0.1:9090";
const recipeIngredientURL = "http://127.0.0.1:9090/recipeIngredients";
const employeeURL = "http://localhost:9090/employees";
let page = 1;

let mainSection = document.getElementById("data-list-wrapper");
let fetchIngredientsButton = document.getElementById("fetch-ingredient");
let fetchEmployeesButton = document.getElementById("fetch-employees");
let addEmployeeButton = document.getElementById("add-employee");
let paginationWrapper = document.getElementById("pagination-wrapper");


window.addEventListener("load", () => {
  // fetchAndRenderEmployees();
  // fetchAndRenderIngredients(`${recipeIngredientURL}?_limit=40&_page=1`);
});

fetchIngredientsButton.addEventListener("click", function(){
  fetchAndRenderIngredients(recipeIngredientURL)
});
 
fetchEmployeesButton.addEventListener("click", function(){
  fetchAndRenderEmployees(employeeURL)
});

addEmployeeButton.addEventListener("click", createEmployee);


// pagination functions
// 105 pages 
// 10
// MAth.ceil(total/10)
function renderPaginationButtons(totalCount) {
  let totalNumberOfButtons = Math.ceil(totalCount / 40);

  function asListOfButtons() {
    let arr = [];
    for (let i = 1; i<=totalNumberOfButtons; i++) {
      arr.push(getAsButton(i, 'pagination-btn button', i));
    }
    return arr.join('');
  }

  paginationWrapper.innerHTML = `
    <div class="pagination-btn-list">
      ${asListOfButtons()}
      <div>
        total items: ${totalCount}
      </div>
    </div>
  `
  let paginationButtons = document.querySelectorAll('.pagination-btn');

  for (let paginationButton of paginationButtons) {
    paginationButton.addEventListener('click', function(e){
      let dataId = e.target.dataset.id;
      fetchAndRenderIngredients(`${recipeIngredientURL}?_limit=40&_page=${dataId}`);
      resetPrimaryClassInPaginationButtons();
      e.target.classList.add('button-primary');
    })
  }

  function resetPrimaryClassInPaginationButtons() {
    for (let paginationButton of paginationButtons) {
      paginationButton.classList.remove('button-primary');
    }
  }

}


function getAsButton(text, cls, dataId ) {
  return `<button class="${cls}" ${dataId ? `data-id = ${dataId}` : ''} >${text}</button>`  
}



// CRUD functions

function fetchAndRenderEmployees(employeeURL) {
  fetch(employeeURL, {
    method: 'GET'
  })
  .then(res => {
    return res.json();
  })
  .then(data => {
    let employeesCardData = data.map(item => {
      let obj = {...item};
      obj.image = baseURL + item.image
      obj.description = '$' + item.salary
      return obj;
    })
    renderCardList(employeesCardData, 'Employee list');
  })
}

fetch('https://jsonplaceholder.typicode.com/comments?_limit=40&_page=1')
  .then( response => response.headers.get( "X-Total-Count" ) )
  .then((data) => { console.log(data)});

function fetchAndRenderIngredients(recipeIngredientURL) {
  fetch(recipeIngredientURL)
  .then(res => {
    return Promise.all([res.json(),res.headers.get("X-Total-Count")])
  })
  .then(data => {
    let [recipeDataRaw, recipeDataCount] = data;
    let recipeCardData = recipeDataRaw.map(item => {
      let obj = {...item};
      obj.image = baseURL + item.image
      obj.description = item.description && item.description.substring(1,75) + '...'
      return obj;
    })
    renderCardList(recipeCardData, 'Recipe list');
    renderPaginationButtons(recipeDataCount);
  })
}

function createEmployee() {
  // any validation here - the type is number
  
  let newEmp = {
    name: document.getElementById('employee-name').value,
    image: document.getElementById('employee-image').value,
    department: document.getElementById('employee-dept').value,
    salary: document.getElementById('employee-salary').value
  }

  fetch(employeeURL, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(newEmp)
  }).then((res) => {
    // check here if the respose was ok
     return res.json();
  }).then((data) => {
    alert(`${data.name} was successfully created.`)
  }).catch((err)=>{
    alert(`${err} happened.`)
  })
}

// card functions

function renderCardList(cardData, heading) {
  mainSection.innerHTML = `
  <h1>${heading ? heading : 'Data list'}</h1>
  <hr>
  <div class="card-list">
    ${cardData
      .map((item) => {
        let imageURL = item.image;
        let title = item.name;
        let description = item.description;
        let link = `#`;

        return getAsCard(imageURL, title, description, link);
      })
      .join("")}
  </div>
`;
}

function getAsCard(imgSrc, title, description, link) {
  return `
    <div class="card">
    <div class="card__img">
      <img
        src=${imgSrc}
        alt= ${title}'s image
      />
    </div>

    <div class="card__body">
      <h3 class="card__item card__title">${title}</h3>
      <div class="card__item card__description">
        ${description || 'Info not provided'}
      </div>
      <div class="card__item card__actions-wrapper">
        <button class="capsule">Edit</button>
        <button class="capsule">Delete</button>
      </div>
    </div>
  </div>
`;
}



let removeStudent = async (id) => {
  let res = await fetch(`${recipeIngredientURL}/${id}`, {
    method: "DELETE",
  });
  getData();
};

let updateData = async (id) => {
  let score = document.getElementById("new_score");
  score.removeAttribute("disabled");
  score.onkeypress = () => {
    updateScore(event, id);
  };
  let student = await fetch(`${recipeIngredientURL}/${id}`);
  student = await student.json();
  score.value = student.score;
};

let updateScore = async (e, id) => {
  let new_score = document.getElementById("new_score");
  let student = await fetch(`${recipeIngredientURL}/${id}`);
  student = await student.json();
  if (e.key === "Enter") {
    let data = { score: +new_score.value || +student.score };
    let res = await fetch(`${recipeIngredientURL}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    new_score.value = null;
    new_score.setAttribute("disabled", true);
    getData();
  }
};

let sortLowToHigh = async () => {
  let res = await fetch(`${recipeIngredientURL}?_sort=score&_order=asc`);
  res = await res.json();
  renderDom(res);
};

let sortHighToLow = async () => {
  let res = await fetch(`${recipeIngredientURL}?_sort=score&_order=desc`);
  res = await res.json();
  renderDom(res);
};

let greaterThan = async () => {
  let res = await fetch(`${recipeIngredientURL}?score_gt=5`);
  res = await res.json();
  renderDom(res);
};

let lessThan = async () => {
  let res = await fetch(`${recipeIngredientURL}?score_lte=5`);
  res = await res.json();
  renderDom(res);
};


// async function getUser(userId){
//   try {
//     let res = await fetch(`http://localhost:9090/users/${userId}`);
//     if (res.ok) {
//       let data = await res.json();
//       return data;
//     } else {
//       return `server responded with a ${res.status} error.`
//     }
//   } catch (error) {
//     return 'error';
//   }
// }

// getUser(51).then(dat => console.log(dat));




// function renderPaginationButtons() {
//   paginationWrapper.innerHTML = `
//     <div className="pagination-btn-list">
//       ${getAsButton('1', 'pagination-btn button button-primary', 1)}
//       ${getAsButton('2', 'pagination-btn button', 2)}
//       ${getAsButton('3', 'pagination-btn button', 3)}
//     </div>
//   `;

//   // handle click of pagination-btn(s)
//   let paginationButtons =  document.querySelectorAll('.pagination-btn'); 
//   for (let paginationButton of paginationButtons) {
//     paginationButton.addEventListener('click', function(e){
//       let dataId = e.target.dataset.id;
//       fetchAndRenderIngredients(`${recipeIngredientURL}?_limit=10&_page=${dataId}`);
//       resetPrimaryClassInPaginationButtons();
//       e.target.classList.add('button-primary');
//       // you may set a page level variable called pageNumber here.
//     })
//   }

//   // reset /remove primary from all buttons
//   function resetPrimaryClassInPaginationButtons() {
//     for (let paginationButton of paginationButtons) {
//       paginationButton.classList.remove('button-primary');
//     }
//   }
// }


async function getData(){
  try {
    let res = await fetch(`http://localhost:9090/todos`, {
      method: 'GET',
      headers: { 
        'Content-type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImZpcnN0bmFtZSI6IkFkIiwibGFzdG5hbWUiOiJNaW5pc3RlciIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRsTG01THA0MHVCUjlDVXJabjU4Q2RPbDh5dTVHcDJ1bUFPLjZseS52V2NaMGEwdlVLc0hpQyIsImF2YXRhciI6Imh0dHBzOi8vY2xvdWRmbGFyZS1pcGZzLmNvbS9pcGZzL1FtZDNXNUR1aGdIaXJMSEdWaXhpNlY3NkxoQ2taVXo2cG5GdDVBSkJpeXZIeWUvYXZhdGFyLzc2Mi5qcGciLCJ1c2VyTGV2ZWwiOjQsImNyZWF0ZWRBdCI6MTY3MDE2NTk4MDYzOCwiaWF0IjoxNjcwNDg3NDMwLCJleHAiOjE2NzA1MDkwMzB9.VtoT7t0WMMtfBAgiB8WowRi43yQOSQ0hsOhuB2OJ5WQ`
      },
    });
    if (res.ok) {
      let data = await res.json();
      return data;
    } else {
      return `server responded with a ${res.status} error.`
    }
  } catch (error) {
    return 'error';
  }
}

// getData().then(dat => console.log(dat));

async function createData(){
  try {
    let res = await fetch(`http://localhost:9090/todos`, {
      method: 'POST',
      headers: { 
        'Content-type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImZpcnN0bmFtZSI6IkFkIiwibGFzdG5hbWUiOiJNaW5pc3RlciIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRsTG01THA0MHVCUjlDVXJabjU4Q2RPbDh5dTVHcDJ1bUFPLjZseS52V2NaMGEwdlVLc0hpQyIsImF2YXRhciI6Imh0dHBzOi8vY2xvdWRmbGFyZS1pcGZzLmNvbS9pcGZzL1FtZDNXNUR1aGdIaXJMSEdWaXhpNlY3NkxoQ2taVXo2cG5GdDVBSkJpeXZIeWUvYXZhdGFyLzc2Mi5qcGciLCJ1c2VyTGV2ZWwiOjQsImNyZWF0ZWRBdCI6MTY3MDE2NTk4MDYzOCwiaWF0IjoxNjcwNDg3NDMwLCJleHAiOjE2NzA1MDkwMzB9.VtoT7t0WMMtfBAgiB8WowRi43yQOSQ0hsOhuB2OJ5WQ`
      },
      body: JSON.stringify({
        userId: 48,
        title: "New loyal Minskin",
        completed: false
      })
    });
    if (res.ok) {
      let data = await res.json();
      return data;
    } else {
      return `server responded with a ${res.status} error.`
    }
  } catch (error) {
    return 'error';
  }
}

// createData().then(dat => console.log(dat));