let login= async ()=> {

    event.preventDefault();


    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");

    // Clear previous errors
    emailError.textContent = "";
    passwordError.textContent = "";

    // Validate email
    if (!email) {
        emailError.textContent = "Email is required.";
        return;
    } else if (!email.includes("@") && !email.endsWith(".com")) {
        emailError.textContent = "Invalid email format.";
        return;
    }

    // Validate password
    if (!password) {
        passwordError.textContent = "Password is required.";
        return;
    } else if (password.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters.";
        return;
    }

    // Fetch users from backend
    let res = await fetch("http://localhost:3000/users");
    let users = await res.json();

    // Find user with matching email & password
    let user = users.find(u => u.email === email && u.password === password);

    if (user.role === "admin") {
        alert("Welcome, Admin!");
        console.log("Redirecting to dashboard.html");  
        setTimeout(() => {
            window.location.href = "dashboard.html";  
        }, 100);
    } else {
        alert("Login successful!");
        console.log("Redirecting to userpanel.html");
        
        setTimeout(() => {
            window.location.href = "userpanel.html";  
        }, 100);
    }
    return false
}