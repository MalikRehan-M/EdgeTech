//  URL's for Fetching
course_URL = "https://639ac82bd5141501973ed8b0.mockapi.io/edgeTech/courses";




// // // // // // // Fetching Course Data  // // // // // // // // // // 
let dataListWrapper = document.querySelector(".data-list-wrapper");
let showCoursesButton = document.querySelector(".show-courses");
showCoursesButton.addEventListener("click", async function () {
    try {
        let res = await fetch(`${course_URL}?page=1&limit=5`);
        let data = await res.json();
        getData(data);
    } catch (error) {
        notification();
    }
});




function getAsCard(title, coursetype, lessons, hours, description, courseId) {
    return `
        <div class="card-wrapper">
          <h2>${title}</h2>
          <hr />
          <p><b>${coursetype}</b></p>
          <p> <b>${lessons} lessons</b> <span>${hours} hours</span></p>
          <p>
            ${description}
          </p>
          <div class="list-buttons">
          <button class="edit-data" data-id="${courseId}">Edit Course</button>
          <button class="delete-data" data-id="${courseId}">Delete Course</button>
          </div>
        </div>
    `;
}

function getData(data) {
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
                return getAsCard(title, coursetype, lessons, hours, description, courseId);
            })
            .join("")}
      </div>
  `;
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // //



// // // // // // // // // // // Fetching by Page Limit // // // // // // // // // //


let setPageLimit = document.querySelector("#page-limit");
setPageLimit.addEventListener("change", () => {
    Fetching(setPageLimit.value)
})

async function Fetching(pagelimit) {
    try {
        let res = await fetch(`${course_URL}?page=1&limit=${pagelimit}`);
        let data = await res.json();
        getData(data)
    } catch (error) {
        notification()
    }
}


// // // // // // // Notification Section // // // // // // // // // // // // // // //

let Notification = document.querySelector(".notifications-wrapper");
function notification() {
    setTimeout(() => {
        Notification.style.display = "none"; 
    }, 3000);
    Notification.style.display = "block";
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // //

