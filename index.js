


const movies = { 
    action: [
        {
            name: "VENOM",
            poster: "https://rukminim2.flixcart.com/image/750/900/jr0y9ow0/poster/m/a/s/medium-venom-marvel-movie-poster-multicolour-13-x-19-inch-matte-original-imafcwzwnz8zxz8c.jpeg?q=20&crop=false"
        },
        {
            name:"BLACK WIDOW",
            poster:"https://m.media-amazon.com/images/M/MV5BZTMyZTA0ZTItYjY3Yi00ODNjLWExYTgtYzgxZTk0NTg0Y2FlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"

        },
        {
            name:"KINGDOM:PLANET OF THE APES",
            poster:"https://m.media-amazon.com/images/M/MV5BZDRlZTc3YTItOTk3Yi00NmU4LWFiOGUtNjgwMDZjNjIzNTU1XkEyXkFqcGc@._V1_.jpg"
        }
    ],
    adventure:[
        {
            name:"ALLADIN",
            poster:"https://cdn.cultura.com/cdn-cgi/image/width=830/media/pim/TITELIVE/7_9782017087816_1_75.jpg"
        },{
            name:"JUMANJI",
            poster:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpmyhjH1t_keIHH2v0lVh6sGRztLCZtwJ450IlZ35OeyVRGAAAujYKXUVaWL2kgCO7HKM&usqp=CAU"
        },{
            name:"DUNE",
            poster:"https://lozierinstitute.org/wp-content/uploads/2023/09/dune.webp"
        }
    ],
    horror:[
        {
            name:"The Nun",
            poster:"https://cf-img-a-in.tosshub.com/sites/visualstory/wp/2023/09/nun2-scaled.jpg?size=*:900"
        },{
            name:"28 Days Later",
            poster:"https://m.media-amazon.com/images/M/MV5BMTUxMjc2MTcxNV5BMl5BanBnXkFtZTcwMzgzOTY0MQ@@._V1_.jpg"
        },{
            name:"NO EXIT",
            poster:"https://m.media-amazon.com/images/I/71cQFlcRZKL._UF1000,1000_QL80_.jpg"
        }
    ]
};

let genreSelect = document.querySelector("#genreselect");
let genreshow = document.querySelector(".genreshow");

genreSelect.addEventListener("change", (event) => {
    let selectedGenre = event.target.value; 

    // Clear previous movies before adding new ones
    genreshow.innerHTML = "";

    if (selectedGenre && movies[selectedGenre]) {
        movies[selectedGenre].forEach((e) => {
            const movieDiv = document.createElement("div");
            movieDiv.innerHTML = `
                <img src="${e.poster}" alt="${e.name}" height="200px" width="300px">
                <h3>${e.name}</h3>
                <div class = "sub_moviediv"> 
                  <h5> Select class </h5>
                  <button data-rate="200" data-class="Silver: ₹200" class="silver"> Silver: ₹200 </button>
                  <button data-rate="280" data-class="Gold: ₹280" class="gold"> Gold: ₹280 </button>
                  <button data-rate="350" data-class="Platinum: ₹350 " class="platinum"> Platinum: ₹350 </button>
                </div>
                <button id="bookMovie" data-movie="${e.name}">Book</button> 
            `;  // above through book function storing movie name value to localstorage for further use in another page
            genreshow.appendChild(movieDiv);  
        });
    }

    /* Book Now */
    let bookMovie = document.querySelector("#bookMovie")

    bookMovie.addEventListener("click", function() { // Regular function

    
      const movieName = this.getAttribute("data-movie"); // Correct: this is the button
     
      localStorage.setItem("selectedMovie",movieName)

    });
});






/* Select Class Category Javascript Code */

document.addEventListener("DOMContentLoaded", () => {
    const genreShow = document.querySelector(".genreshow");

    // Event Delegation: Handle single click for class selection
    genreShow.addEventListener("click", function (event) {

        event.preventDefault()
        
        const target = event.target;

        // Condition 1: When a class selection button is clicked
        if (target.matches(".sub_moviediv button")) {
            // Remove 'activeclass' from all buttons in the same div
            const parentDiv = target.closest(".sub_moviediv");
            parentDiv.querySelectorAll("button").forEach(btn => {
                btn.classList.remove("activeclass");
            });

            // Add 'activeclass' to the clicked button
            target.classList.add("activeclass");

            // Store selected class in localStorage
            const selectedClass = target.getAttribute("data-class");
            if (selectedClass) {
                localStorage.setItem("class", selectedClass);
            }
        }

        // Condition 2: When the "Book" button is clicked
        if (target.matches("#bookMovie")) {
            const selectedClass = localStorage.getItem("class");

            // If no class is selected, prevent booking
            if (!selectedClass) {
                alert("Please select a class before booking.");
                return false;
            }

            // Store movie name in localStorage for confirmation page
            const movieName = target.getAttribute("data-movie");
            localStorage.setItem("selectedMovie", movieName);

            // Redirect to confirmation page
    
            window.location.href = "user-form.html";
            
        }
    });

    // Event Delegation: Handle double-click to reset selection
    genreShow.addEventListener("dblclick", function (event) {
        const target = event.target;

        // Condition 3: When a class selection button is double-clicked
        if (target.matches(".sub_moviediv button")) {
            // Remove 'activeclass' from all buttons in the same div
            const parentDiv = target.closest(".sub_moviediv");
            parentDiv.querySelectorAll("button").forEach(btn => {
                btn.classList.remove("activeclass");
            });

            // Remove class from localStorage ONLY IF the clicked button was the selected one
            const selectedClass = localStorage.getItem("class");
            if (selectedClass === target.getAttribute("data-class")) {
                localStorage.removeItem("class");
            }
        }
    });
});
