let user = JSON.parse(localStorage.getItem("user"));
    
if (!user) {
    alert("Please log in first.");
    window.location.href = "login.html";
}

let fetchData = async () => {
    let url = "http://localhost:3000/MovieTicket";
    let res = await fetch(url, { method: "GET" });
    let data = await res.json();

    let userinfo = document.querySelector(".userinfo");
    userinfo.innerHTML = "";

    if (user.role === "admin") {
        // Admin sees all bookings
        data.forEach((e) => {
            userinfo.innerHTML += `
                <p><strong>Name:</strong> ${e.name}</p>
                <p><strong>Email:</strong> ${e.email}</p>
                <p><strong>Contact:</strong> ${e.contact}</p>
                <p><strong>Persons:</strong> ${e.person}</p>
                <p><strong>Meals:</strong> ${e.Meals}</p>
                <p><strong>Seat:</strong> ${e.seat}</p>
                <p><strong>Price:</strong> ₹${e.price}</p>
                <hr>
            `;
        });
    } else {
        // User sees only their last booking
        let userBooking = data.find(e => e.email === user.email);

        if (userBooking) {
            userinfo.innerHTML = `
                <p><strong>Name:</strong> ${userBooking.name}</p>
                <p><strong>Email:</strong> ${userBooking.email}</p>
                <p><strong>Contact:</strong> ${userBooking.contact}</p>
                <p><strong>Persons:</strong> ${userBooking.person}</p>
                <p><strong>Meals:</strong> ${userBooking.Meals}</p>
                <p><strong>Seat:</strong> ${userBooking.seat}</p>
                <p><strong>Price:</strong> ₹${userBooking.price}</p>
            `;
        } else {
            userinfo.innerHTML = "<p>No booking found.</p>";
        }
    }
};

window.onload = fetchData;