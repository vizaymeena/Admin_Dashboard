let fetchData=()=>{

    let url ="http://localhost:3000/MovieTicket"
    fetch(url,{method:"GET"})

    let data = url.json()

    

    let userinfo=document.querySelector(".userinfo")

    userinfo.innerHTML += data.forEach((e) => {
       
        // form statement
        `

        

        `
        
    });

}