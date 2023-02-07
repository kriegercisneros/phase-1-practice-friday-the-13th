
//retrieving data from our json array 
fetch(" http://localhost:3000/movies")
 .then(response => response.json())
 .then(data => {
    createImage(data)
    renderMovie(data[0])
});


//global variables declared to access the form in HTML 
const title = document.querySelector('h1#title');
const year = document.querySelector('h3#year-released');
const description = document.querySelector('p#description');
const watched = document.querySelector('button#watched');
const img2 = document.querySelector('#detail-image');   
const blood = document.querySelector('#amount');

//this populates the HTML form with the first element in our json array
function renderMovie(movies){
    title.innerText = movies.title;
    year.innerText = movies.release_year;
    description.innerText = movies.description;
    img2.src = movies.image;
    blood.innerText = movies.blood_amount;
    toggleWatched(movies)
}
//allow user to toggle between watched and unwatched
//stays the same when user clicks on a different image

//can I get help making this into a seperately called function
//
function toggleWatched(element) {    
    const watchedBtn = document.querySelector('button#watched');
    watchedBtn.addEventListener('click', () => {
        if(watchedBtn.innerText === "Watched"){
            watchedBtn.innerText = "Unwatched";
        }else{
            watchedBtn.innerText = "Watched";
        };
         updateWatch(element)
});

}



//generates 12 images from our json array at the top of the page
//allows user to click on each image to see more details displayed in form
 function createImage(listAPI){
    const movieList = document.querySelector('nav#movie-list');
    
    listAPI.forEach(item =>{
        const img = document.createElement("img");
        img.src = item.image;
        img.id = item.id;
        // img.alt = item.title;
        // img.classList.add('imgs');
        movieList.appendChild(img);
    
        img.addEventListener('click', () => {
            renderMovie(item);
            toggleWatched(item)
        });
    });
 };

 function updateWatch(input){
    const updatedWatchedStatus = !input.watched 
    input.watched = updatedWatchedStatus;
    // console.log(updatedWatchedStatus);
    fetch(`http://localhost:3000/movies/${input.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            watched: updatedWatchedStatus
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
}


//event listener for blood form submission 
const bForm = document.querySelector('#blood-form')
.addEventListener('submit', handleSubmit);

//event handler for blood form submission
function handleSubmit(event){
    event.preventDefault();
    let bloodInput = e.target.blood-amount.value
    pushToAPI(bloodInput);
}

function pushToAPI(blood){
    fetch(`http://localhost:3000/movies${blood}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(blood)
    })
    .then(res => res.json())
    .then(data => console.log(data))
}
