async function signup() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    // Validate inputs
    if (!name || !email || !password) {
        alert("All fields are required!");
        return false;
    }
    else if(!email.includes("@") || !email.endsWith(".com")){
        alert("Invalid Email format")
        return false;
    }
    else if(isNaN(password) || password.length<6){
        alert("password should be a 6 digit numeric number")
        return false;
    }

    // Check if email already exists
    let res = await fetch("http://localhost:3000/users");
    let users = await res.json();
    let existingUser = users.find(user => user.email === email);

    if (existingUser) {
        alert("Email already registered! Please login.");
        window.location.href="login.html"
        return;
    }

    // Create new user object
    let newUser = {
        id: users.length + 1,  // Auto-generate ID
        name: name,
        email: email,
        password: password,
        role: "user" // Assign user role automatically
    };

    // Save user to backend
    await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
    });

    alert("Signup successful! Please login.");
    
    setTimeout(() => {
        window.location.href = "login.html";
    }, 100);

    
}