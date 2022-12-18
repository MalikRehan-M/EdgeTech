var sliderMain=document.getElementById("slider-main");
var item= sliderMain.getElementsByClassName("item")

function next(){
    sliderMain.append(item[0]);
    console.log(item[0])
}

function prev(){
    sliderMain.prepend(item[item.length-1])
}

var sliderMainP=document.getElementById("slider-main2");
var itemP= sliderMainP.getElementsByClassName("item2")

function nextImg(){
    sliderMainP.append(itemP[0]);
    console.log(itemP[0])
}

function preImg(){
    sliderMainP.prepend(itemP[itemP.length-1])
    // console.log("pre")
}
document.getElementById("logo").addEventListener("click",()=>{
    window.location.href="/index.html"
})

