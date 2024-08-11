document.querySelector("#login-button").addEventListener("click",()=> {
    const username = document.querySelector("input[type='text']").value;
    const password = document.querySelector("input[type='password']").value;
    const now = new Date();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUsers = users.find((user) => user.username === username);
    if (existingUsers) {
        alert("User already exist");
    }else{
        users.push({
            username: username,
            password: password,
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString(),
        });
        localStorage.setItem("users", JSON.stringify(users));
        alert("User created");
        setInterval(()=>{
            window.location.href = "login.html";
        },100);
    }
});