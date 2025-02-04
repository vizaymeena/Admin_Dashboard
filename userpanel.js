const fetchData = async () => {
    const bookingList = document.getElementById("booking-list");
    bookingList.innerHTML = ""; // Clear any previous content

    try {
        // Fetch all bookings from backend
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
            <h2 class="booking-title">${latestBooking.name}</h2>
            <p class="booking-info"><strong>Email:</strong> ${latestBooking.email}</p>
            <p class="booking-info"><strong>Contact:</strong> ${latestBooking.contact}</p>
            <p class="booking-info"><strong>Persons:</strong> ${latestBooking.person}</p>
            <p class="booking-info"><strong>Meals:</strong> ${latestBooking.Meals}</p>
            <p class="booking-info"><strong>Seat Class:</strong> <span class="highlight">${latestBooking.seat}</span></p>
            <p class="booking-info"><strong>Rate:</strong> ₹${latestBooking.rate}</p>
            <p class="booking-info"><strong>Total Price:</strong> <span class="highlight">₹${latestBooking.price}</span></p>
            <a href="#" class="cancel-btn" onclick="del('${latestBooking.id}')">Cancel Booking</a>
            <a href="#" class="edit-btn" onclick="update('${latestBooking.id}')">Edit Details</a>


        `;

        bookingList.appendChild(bookingCard);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        bookingList.innerHTML = "<p>Error loading bookings. Please try again later.</p>";
    }
};

// Function to handle canceling a booking
let del=(id)=> {
    let url = `http://localhost:3000/MovieTicket/${id}`
    fetch(url,{method:"DELETE"})

    alert("Booking Successfully Canceled")
}



/* Edit "GET" */
// let update = async (id) => {
//     let url = `http://localhost:3000/MovieTicket/${id}`;
//     let res = await fetch(url, { method: "GET" });
//     let data = await res.json();

//     let editinfo = document.getElementById("update");

//     editinfo.innerHTML = `
//         <h2>TICKET BOOKING FORM</h2>
       
//         <div>
//             <label for="name2">Name :</label>
//             <input value="${data.name}" type="text" id="name2" placeholder="Full Name">
//         </div>

//         <div>
//             <label for="email2">Email :</label>
//             <input value="${data.email}" type="text" id="email2" placeholder="Email">
//         </div>

//         <div>
//             <label for="contact2">Contact :</label>
//             <input value="${data.contact}" type="text" id="contact2" placeholder="Contact">
//         </div>

//         <div>
//             <label for="person2">Person :</label>
//             <input value="${data.person}" type="text" id="person2" placeholder="No. of Persons">
//         </div>

//         <div>
//             <label for="class2">Class Category :</label>
//             <select id="select2" name="select2" value="${data.seat}">
//                 <option value="0">Select</option>
//                 <option data-rate="200" value="silver">Silver</option>
//                 <option data-rate="280" value="gold">Gold</option>
//                 <option data-rate="350" value="platinum">Platinum</option>
//             </select>
//         </div>

//         <div>
//             <label for="meals2">Meals :</label>
//             <select id="meals2" name="meals2" value="${data.Meals}">
//                 <option data-rate="0" value="None">None</option>
//                 <option value="popcorn">Pop Corn</option>
//                 <option value="cold drink">Cold Drink</option>
//                 <option value="water bottle">Water Bottle</option>
//             </select>
//         </div>
//         <div class="submit2">
//             <input onclick="finalupdate('${data.id}')" id="submit2" type="submit" value="Submit">
//         </div>
//     `;
// };

// let finalupdate = async (id) => {
//     // Form 2 Input Values
//     let name = document.getElementById("name2").value;
//     let email = document.getElementById("email2").value;
//     let contact = document.getElementById("contact2").value;
//     let person = document.getElementById("person2").value;
//     let seat = document.getElementById("select2").value;
//     let meals = document.getElementById("meals2").value;

//     // Define rates based on seat class
//     let rate = 0;
//     if (seat === "silver") rate = 200;
//     if (seat === "gold") rate = 280;
//     if (seat === "platinum") rate = 350;

//     // Define price (rate * number of persons)
//     let price = rate * person;

//     let url = `http://localhost:3000/MovieTicket/${id}`;

//     // PUT request to update the booking details
//     fetch(url, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             name: name,
//             email: email,
//             contact: contact,
//             person: person,
//             Meals: meals,
//             rate: rate,
//             price: price,
//             seat: seat
//         })
//     })
//     .then(response => response.json())
//     .then(updatedBooking => {
//         alert("Booking updated successfully!");
//         closeModal(); // Close the modal after update
//         fetchData(); // Refresh the booking list to show the updated data
//     })
//     .catch(error => {
//         console.error("Error updating booking:", error);
//         alert("There was an error updating the booking. Please try again later.");
//     });
// };

// // Close the modal function
// function closeModal() {
//     document.querySelector(".form2").style.display = "none";
// }

