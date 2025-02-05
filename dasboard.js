let fetchData = async () => {
    try {
        let url = "http://localhost:3000/MovieTicket";
        let res = await fetch(url, { method: "GET" });

        let data = await res.json();

        let userinfo = document.querySelector(".tbody");
        userinfo.innerHTML = ""; // Clear previous content

        data.forEach((e) => {
            userinfo.innerHTML += `

               
                <tr class="headdetails">
                    <td>${e.moviename}</td>  
                    <td>${e.name}</td>  
                    <td>${e.contact}</td>  
                    <td>${e.person}</td>  
                    <td>${e.seat}</td>
                    <td>${e.Meals}</td>    
                    <td>₹${e.price}</td>
                    <td>
                        <button onclick="deleteBooking('${e.id}')">Cancel</button>
                        
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Function to delete a booking
let deleteBooking = async (id) => {
    
    let url = `http://localhost:3000/MovieTicket/${id}`;
    await fetch(url, { method: "DELETE" });

    alert("Booking successfully canceled");
    fetchData(); // Reload the data
};

window.onload = fetchData;

