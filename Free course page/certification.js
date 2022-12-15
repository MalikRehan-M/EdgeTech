
async function fetchData(page){
    let result= await fetch(`https://639ac82bd5141501973ed8b0.mockapi.io/edgeTech/courses?page=${page}&limit=9`)
    let obj= await result.json();
    display(obj)
}
fetchData(1);

  let container= document.querySelector(".certification_box");


  function display(Data){
    container.innerHTML=""
    Data.forEach((ele)=>{
        let div= document.createElement("div");
         div.setAttribute("class","cert_cards")
         let h2=document.createElement("h2");
         h2.innerText= ele.title
         let hr= document.createElement("hr");
         let h4=document.createElement("h4");
         h4.innerText= `${ele.coursetype} COURSE`
         let h5=document.createElement("h5");
         h5.setAttribute("class","lesson")
         let span= document.createElement("span");
         span.setAttribute("class","hours")
         span.innerText=` ${ele.hours} hours`
         h5.innerText= `${ele.lessons} lessons`
         let p=document.createElement("p");
         p.innerText=ele.description.substring(0,75) + '...';
         let read= document.createElement("h5");
          read.innerText="Read more"
          let btn_div= document.createElement("div");
          btn_div.setAttribute("class","btn_cont")
          let btn= document.createElement("button");
          btn.setAttribute("class","btn");
          btn.innerText="Start Course"
          btn_div.append(btn)
    
         div.append(h2,hr,h4,h5,span,p,read,btn_div);
         container.append(div);
      })
  }

  let page_cont= document.querySelector(".page_cont")
  let page1=document.createElement("button");
  page1.innerText="1"
  let page1=document.createElement("button");
  page1.innerText="2"
  let page1=document.createElement("button");
  page1.innerText="3"
  let page1=document.createElement("button");
  page1.innerText="4"
  page_cont.append(page1,page2)

  


  
 