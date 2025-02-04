const fetchData = async () => {
    const bookingList = document.getElementById("booking-list");
    bookingList.innerHTML = ""; // Clear any previous content

    try {
        /* Get Method */
        let response = await fetch("http://localhost:3000/MovieTicket");
        let bookings = await response.json();

        if (bookings.length === 0) {
            bookingList.innerHTML = "<p>No bookings found.</p>";
            return;
        }

        // Get the last booking (assumed to be the most recent one)
        let latestBooking = bookings[bookings.length - 1];

        // Create booking card for the latest booking
        let bookingCard = document.createElement("div");
        bookingCard.classList.add("booking-card");
        bookingCard.innerHTML = `
            <h3 class="confirmed"> Booking has Confirmed <i class="fa-solid fa-check checked"></i> </h3>
            <p class="booking-title">Movie :<span class="moviename">${latestBooking.moviename}</span></p>
            <p class="booking-info"><strong>Email:</strong> ${latestBooking.email}</p>
            <p class="booking-info"><strong>Contact:</strong> ${latestBooking.contact}</p>
            <p class="booking-info"><strong>Persons:</strong> ${latestBooking.person}</p>
            <p class="booking-info"><strong>Meals:</strong> ${latestBooking.Meals}</p>
            <p class="booking-info"><strong>Seat Class:</strong> <span class="highlight">${latestBooking.seat}</span></p>
            <p class="booking-info"><strong>Rate:</strong> ₹${latestBooking.rate}</p>
            <p class="booking-info"><strong>Total Price:</strong> <span class="highlight">₹${latestBooking.price}</span></p>
            <a href="#" class="cancel-btn" onclick="del('${latestBooking.id}')">Cancel Booking</a>

        `;

        bookingList.appendChild(bookingCard);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        bookingList.innerHTML = "<p>Error loading bookings. Please try again later.</p>";
    }
};

/* Delete Method */
let del=async(id)=> {
    let url = `http://localhost:3000/MovieTicket/${id}`

    try{
    await fetch(url,{method:"DELETE"})
    }catch(error){
        console.log("Error:",error)
    }

    alert("Booking Successfully Canceled")

   
        location.href="user-form.html"
       
}


