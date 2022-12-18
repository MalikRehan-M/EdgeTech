


document.querySelector("form").addEventListener("submit",LoginUser);

// LOGIN function
function LoginUser(e){
    e.preventDefault();
    let email=document.getElementById("email").value;
    let pass=document.getElementById("password").value;
    if(email === "admin@edgetech.com" && pass ==="adminedgetech"){
        window.location.href="/Admin page/admin.html"
    }else{
        alert("It's a protected route, need Authorization")
    }
}
document.getElementById("logo").addEventListener("click",()=>{
    window.location.href="/index.html"
})