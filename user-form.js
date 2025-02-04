  const url = "http://localhost:3000/MovieTicket"
let insert = function() {
  
    // Get the form data
    let inpname = document.querySelector('#name').value.trim();
    let inpemail = document.querySelector('#email').value.trim();
    let inpcontact = document.querySelector('#contact').value.trim();
    let inpperson = document.querySelector('#person').value.trim();
    let selectMeals = document.querySelector("#meals").value;
    
    let error = document.querySelector(".show_error");

    // Form validation
    if (inpname == "" || inpemail == "" || inpcontact == "") {
        error.innerHTML = "Please, Fill out required fields";
        error.style.color = "red";
        return false;
    } 
    else if (!inpemail.includes("@") || !inpemail.endsWith(".com")) {
        error.innerHTML = "Invalid email format";
        error.style.color = "red";
        return false;
    } 
    else if (isNaN(inpcontact) || inpcontact.length !== 10 || inpcontact.includes('-')) {
        error.innerHTML = "Please, Enter a valid contact number";
        return false;
    } 
    else if (isNaN(inpperson) || inpperson < 1 || inpperson > 10) {
        error.innerHTML = "Number of person can range from 1-10";
        error.style.color = "red";
        return false;
    }
    error.innerHTML = "";

    // Validate seat class selection
    let selectClass = document.querySelector("#select").value;
    if (selectClass == "") {
        alert("Please, select class category first to further proceed");
        return false;
    }
    localStorage.setItem("Class Category", selectClass);

    // Get the selected rate and save to localStorage
    const selectrate = document.getElementById('select');
    let selectedOption = selectrate.options[selectrate.selectedIndex];
    let rate = selectedOption.getAttribute('data-rate');
    if (rate && rate !== "0") {
        localStorage.setItem('selectedMealRate', rate);
    } else {
        localStorage.removeItem('selectedMealRate');
    }

    // Retrieve rate and calculate price
    rate = localStorage.getItem('selectedMealRate');
    if (!rate || rate === "0") {
        rate = 0;
    }

    let personCount = inpperson || 1;
    let price = rate * personCount;

    // Post request to save the booking
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "name": inpname,
            "email": inpemail,
            "contact": inpcontact,
            "person": personCount,
            "Meals": selectMeals,
            "rate": rate,
            "price": price,
            "seat":selectClass,
        })
    }).then(response => response.json())
      .then(data => {
          alert("Booking Successful");
          window.location.href = "confirm.html";
      }).catch(error => {
          console.error("Error:", error);
      });


      location.href="userpanel.html"
    return false;
};
