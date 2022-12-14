document.getElementById("topbanner").setAttribute("src","https://www.hubspot.com/hubfs/SUI-Homepage-Header-Desktop@2x.png")

let btnDiv = document.querySelector(".btn div");
let btn = document.querySelector(".btn");
console.log(btn,btnDiv);

let orgebtn=document.getElementsByClassName("orangebtn");
let orgebtn2=document.getElementsByClassName("orangebtn2");
let serachicon=document.getElementById("serachicon");
let anco

btn.addEventListener("click",()=>{
    console.log(btnDiv.style.marginLeft)
    if(btnDiv.style.marginLeft== "2px" || btnDiv.style.marginLeft==""){
        btnDiv.style.marginLeft = "15px"
    }
    else if(btnDiv.style.marginLeft == "15px"){
        btnDiv.style.marginLeft ="2px"
    }

})
