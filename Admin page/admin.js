// // // // // // // // URL's for Fetching Data // // // // // // // // // // // //
let course_URL = "https://639ac82bd5141501973ed8b0.mockapi.io/edgeTech/courses";
let demoForm_URL = "";
let users_data_URL = "";

// // // // // // // // // // // // // // // // // // // // // // // // // // // // //



// // // // // // // // Wrappers and Selectors // // // // // // // // // // // // //


let setPageLimit = document.querySelector("#page-limit");
let Notification = document.querySelector(".notifications-wrapper");
let pageNot = document.querySelector(".notifications-wrapper > p");
let num = 0;


// // // // // // // // // // // // // // // // // // // // // // // // // // // // //



// // // // // // // Fetching Course Data  // // // // // // // // // // 
let dataListWrapper = document.querySelector(".data-list-wrapper");
let showCoursesButton = document.querySelector(".show-courses");
showCoursesButton.addEventListener("click", async function () {
    try {
        num = 1;
        let res = await fetch(`${course_URL}?page=1&limit=5&sortBy=title&order=asc`);
        let data = await res.json();
        getData(data);
        paginationButtons();
    } catch (error) {
        notification();
    }
});

// // // // // // // // // // // // // // // // // // // // // // // // // // // // //



let addCoursesButton = document.querySelector(".show-courses");
addCoursesButton.addEventListener("click", async function () {
    try {

        let res = await fetch(`${course_URL}?page=1&limit=5&sortBy=title&order=asc`);
        let data = await res.json();
        getData(data);
        paginationButtons();
    } catch (error) {
        notification();
    }
});





// // // // // // // Fetching Form Data // // // // // // // // // // // // // // //

let showFormsButton = document.querySelector(".show-form-submissions");
showFormsButton.addEventListener("click", async function () {
    try {
        num = 2;
        let res = await fetch(`${demoForm_URL}?page=1&limit=5&sortBy=title&order=asc`);
        let data = await res.json();
        getData(data);
        paginationButtons();
    } catch (error) {
        notification();
    }
});

// // // // // // // // // // // // // // // // // // // // // // // // // // // // //




// // // // // // // Fetching Users Data // // // // // // // // // // // // // // 


let showUsersButton = document.querySelector(".add-courses");
showUsersButton.addEventListener("click", addCourse);


function addCourse() {

    dataListWrapper.innerHTML = `
        <div class="card-wrapper">
        <span>Title</span><input id="addtitle">
        <span>Course Type</span><input id="addcourse">
        <span>Lessons</span><input id="addlesson">
        <span>Hours</span><input id="addhour">
        <span>Description</span><input id="adddescription">
          <div class="list-buttons">
          <button class="save-data">Save</button>
          </div>
        </div>
    `;


    

    let savingCourse = document.querySelector(".save-data");
    savingCourse.addEventListener("click", () => {
        let title = document.querySelector("#addtitle");
        let addcourse = document.querySelector("#addcourse");
        let addlesson = document.querySelector("#addlesson");
        let addhour = document.querySelector("#addhour");
        let adddescription = document.querySelector("#adddescription");
        

        let obj = {
            "name": "Ejajul Ansari",
            "avatar": "https://drive.google.com/file/d/1NOmPdzSgDqKPAVYmOyzRDXJK2UaS3yeG/view?usp=sharing",
            "title": `${title.value}`,
            "coursetype": `${addcourse.value}`,
            "lessons": `${addlesson.value}`,
            "hours": `${addhour.value}`,
            "description": `${adddescription.value}`
        };

        saveCourse(obj);
    })
}

async function saveCourse(data) {
    try {
        let res = await fetch(`${course_URL}`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        });
        if(res.ok) {
            pageNot.innerText = "Course Successfully Added";
            notification();
        }
    } catch (error) {
        notification();
    }
}



// // // // // // // // // // // // // // // // // // // // // // // // // // // // //




// // // // // // // // Cards Template and Render Area // // // // // // // // // //


function getAsCard(title, coursetype, lessons, hours, description, courseId, identifier) {
    return `
        <div class="card-wrapper">
        <span>Title</span><input id="title" value="${title}" disabled>
        <span>Course Type</span><input id="course" value="${coursetype}" disabled>
        <span>Lessons</span><input id="lesson" value="${lessons} lessons" disabled>
        <span>Hours</span><input id="hour" value="${hours} hours" disabled>
        <span>Description</span><input value="${description}" disabled>
          <div class="list-buttons">
          <button class="edit-data" data-id="${courseId}" data-identifier="${identifier}">Edit Course</button>
          <button class="delete-data" data-id="${courseId}" data-identifier="${identifier}">Delete Course</button>
          </div>
        </div>
    `;
}

function getData(data) {
    dataListWrapper.innerHTML = "";
    dataListWrapper.innerHTML = `
      <div class="card-list">
          ${data
            .map((item) => {
                let title = item.title;
                let coursetype = item.coursetype;
                let lessons = item.lessons;
                let hours = item.hours;
                let description = item.description;
                let courseId = item.id;
                let identifier = num;
                return getAsCard(title, coursetype, lessons, hours, description, courseId, identifier);
            })
            .join("")}
      </div>
  `;
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // //



// // // // // // // // // // // Fetching by Page Limit // // // // // // // // // //



setPageLimit.addEventListener("change", () => {
    if (num == 0) {
        pageNot.innerText = "Please get the data first";
        notification(pageNot)
    } else if (num == 1) {
        Fetching(course_URL, setPageLimit.value)
    } else if (num == 2) {
        Fetching(demoForm_URL, setPageLimit.value)
    } else {
        Fetching(users_data_URL, setPageLimit.value)
    }
})

async function Fetching(url, pagelimit = 5) {
    try {
        let res = await fetch(`${url}?page=1&limit=${pagelimit}&sortBy=title&order=asc`);
        let data = await res.json();
        getData(data);
        paginationButtons();
    } catch (error) {
        notification()
    }
}


// // // // // // // Notification Section // // // // // // // // // // // // // // //


function notification() {
    setTimeout(() => {
        Notification.style.display = "none";
    }, 3000);
    Notification.style.display = "block";
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // //




// // // // // // // Pagination Section // // // // // // // // // // // // // // //

function paginationButtons() {
    let paginationSection = document.querySelector(".pagination-section");
    paginationSection.innerHTML = "";
    paginationSection.innerHTML = `
        ${renderPageButtons(1, 1)}
        ${renderPageButtons(2, 2)}
        ${renderPageButtons(3, 3)}
   `;

    let paginationButtons = document.querySelectorAll(".pagination-buttons");
    for (let paginationButton of paginationButtons) {
        paginationButton.addEventListener("click", function (element) {
            let data = element.target.dataset.id;
            showpages(`${course_URL}?page=${data}&limit=${setPageLimit.value}&sortBy=title&order=asc`)
        })
    }

    let deletingData = document.querySelectorAll(".delete-data");
    for (let deleteButton of deletingData) {
        deleteButton.addEventListener("click", function (element) {
            let data = element.target.dataset.id;
            let link = element.target.dataset.identifier;
            deleteFunction(data, link)
        })
    }


    let editData = document.querySelectorAll(".edit-data");
    for (let editingdata of editData) {
        editingdata.addEventListener("click", function (element) {
            let data = element.target.dataset.id;
            let link = element.target.dataset.identifier;
            // editDataFunction(data, link)
        })
    }
}

async function showpages(url) {
    try {
        let res = await fetch(url);
        let data = await res.json();
        getData(data)
    } catch (error) {
        notification();
    }
}

function renderPageButtons(text, id) {
    return `<button class="button pagination-buttons" data-id="${id}">${text}</button>`
}


// // // // // // // // // // // // // // // // // // // // // // // // // // // // //

