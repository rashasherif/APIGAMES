//variabels

var allGames =[];

var gameData =document.getElementById("gameData");

var loading = document.querySelector(".loading");
var mmorpg = document.querySelector('.mmorpg');
var shooter= document.querySelector('.shooter');
var sailing = document.querySelector('.sailing');
var permadeath = document.querySelector('.permadeath');
var superhero = document.querySelector('.superhero');
var pixel = document.querySelector('.pixel');


//getGames and display 
async function getGames(categoryOption) {

    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": "d18f7a927amsh38656e008fc8bbcp1d956djsn101fb16ec4f2",
            "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com"
        },
    };

    let api= await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoryOption}` ,
        options);
    let response= await api.json();
    console.log(response);
    allGames=response;

    displayGames();
    
    loading.classList.add("d-none");


    var cards =document.querySelectorAll('.card');
    cards.forEach((card) =>{
        card.addEventListener('click', ()=> {
        
            getDetails("582");
        });
    });


    document.querySelectorAll(".menu a").forEach((link) => {
        link.addEventListener("click", (e) => {
            document.querySelector(".menu .active").classList.remove("active");
            e.target.classList.add("active");
            this.getGames(e.target.dataset.category);
        });
});
}

getGames('mmorpg');
function displayGames(){
    var cartona=``;
    for (var i = 0; i < allGames.length; i++) {
        cartona +=`
        <div class="col">
        <div  class="card h-100 bg-transparent" role="button" "="">
            <div class="card-body">
                <figure class="position-relative">
                    <img class="card-img-top object-fit-cover h-100" src="${allGames[i].thumbnail}">
            
                </figure>

                <figcaption>

                    <div class="hstack justify-content-between">
                        <h3 class="h6 small">${allGames[i].title}</h3>
                        <span class="badge text-bg-primary p-2">Free</span>
                    </div>

                    <p class="card-text small text-center opacity-50">
                    ${allGames[i].short_description.split(" ", 8)}
                    </p>

                </figcaption>
            </div>

            <footer class="card-footer small hstack justify-content-between">

                <span class="badge badge-color">${allGames[i].genre}</span>
                <span class="badge badge-color">
                ${allGames[i].platform}
                </span>

            </footer>
        </div>
    </div>
        
    `
}

gameData.innerHTML=cartona;
}

mmorpg.addEventListener('click',function(){
    getGames('mmorpg');
});

shooter.addEventListener('click',function(){
    getGames('shooter');
})


sailing.addEventListener('click',function(){
    getGames('sailing');
})

permadeath.addEventListener('click',function(){
    getGames('permadeath');
})


superhero.addEventListener('click',function(){
    getGames('superhero');
})


pixel.addEventListener('click',function(){
    getGames('pixel');
})




//getDetails

async function getDetails(idGames) {
    
    document.getElementById("btnClose").addEventListener("click", () => {
        document.querySelector(".games").classList.remove("d-none");
        document.querySelector(".details").classList.add("d-none");
        });

    document.querySelector(".games").classList.add("d-none");
    document.querySelector(".details").classList.remove("d-none");
    const options = {
        method: "GET",
        headers: {
        "x-rapidapi-key": "d18f7a927amsh38656e008fc8bbcp1d956djsn101fb16ec4f2",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
        
        },
    };

    let gameId= await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${idGames}`, 
        options);
    let responseDetails = await gameId.json();
        
    allGames=responseDetails;
        console.log(allGames);
        displayDetails(allGames);
        loading.classList.add("d-none");

}





function displayDetails(allGames){

        var content = `
        <div class="col-md-4">
            <img src="${allGames.thumbnail}" class="w-100" alt="image details" />
        </div>
        <div class="col-md-8">
            <h3>Title: ${allGames.title}</h3>
            <p >Category: <span class="badge text-bg-info"> ${allGames.genre}</span> </p>
            <p>Platform: <span class="badge text-bg-info"> ${allGames.platform}</span> </p>
            <p>Status: <span class="badge text-bg-info"> ${allGames.status}</span> </p>
            <p class="small">${allGames.short_description}</p>
            <a class="btn btn-outline-warning" target="_blank" href="${allGames.game_url}">Show Game</a>
        </div>
    
        `;


        document.getElementById("detailsContent").innerHTML = content;


}
