// User login management

document.querySelector("#login-button").addEventListener("click",()=> {
    const username = document.querySelector("#username1").value;
    const password = document.querySelector("#password1").value;
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUsers = users.find((user) => user.username === username);
    if (!existingUsers) {
        alert("Please create your account");
        setInterval(()=>{
            window.location.href = "signup.html";
        },100);
    }else if(existingUsers.password !== password){
        alert("Passwords don't match");
    }else {
        alert("Login successful");
        window.location.href = "homepage.html";
    }
})