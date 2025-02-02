
/* Fucntion Running On Webpage Loads */

/* GET METHOD */
 const fetchData = async()=>{
    const url = "http://localhost:3000/moviePanel" // Storing json data into url
    
   try{ let res = await fetch(url,{method:"GET"})  
    let data = await res.json(); // Converting json data into json format to understand

    let show = document.querySelector("#show")
    

    data.map((e) => {

        show.innerHTML +=
         // Showing Data Through method: "GET" inside tbody 
        `
         <tr>
                <td> <input value="${e.title}" id="title-${e.id}"> </td>

                <td> <input value="${e.genre}" id="genre-${e.id}"> </td>

                <td> <input value="${e.duration}" id="duration-${e.id}"> </td>

                <td> <input value="${e.showtime}" id="showtime-${e.id}"> </td>
                <td> <span>"${e.screen}"</span> </td>
                <td> <span> "${e.capacity}"</span> </td>

                <td>
                    <button onclick="updateMovie(${e.id})">Update</button>
                    <button onclick="deleteMovie(${e.id})">Delete</button>
                </td>

        </tr>

        `
    });
} catch (error){
    console.error("404 Not found:",Error)
}
}

/* POST METHOD */
const addmovie = document.querySelector("#addmovie")
addmovie.addEventListener('click',()=>{

    



})

