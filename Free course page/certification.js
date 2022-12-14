
async function fetchData(){
    let result= await fetch("https://different-pocketbook-bear.cyclic.app/users?_limit=9&_page=1")
    let obj= await result.json();
    display(obj)
}
fetchData();

  let container= document.querySelector(".certification_box");


  function display(Data){
    container.innerHTML=""
    Data.forEach((ele)=>{
        let div= document.createElement("div");
         div.setAttribute("class","cert_cards")
         let h2=document.createElement("h2");
         h2.innerText= ele.title
         let h4=document.createElement("h4");
         h4.innerText= `${ele.coursetype} COURSE`
         let h5=document.createElement("h5");
         h5.setAttribute("class","lesson")
         let span= document.createElement("span");
         span.setAttribute("class","hours")
         span.innerText=` ${ele.hours} hours`
         h5.innerText= `${ele.lessons} lessons`
         let p=document.createElement("p");
         p.innerText=ele.description
    
         div.append(h2,h4,h5,span,p);
         container.append(div);
      })
  }
  


  
 