let reviewReviewWrapper = document.querySelector("section");
let editId = null;
let overlay = document.querySelector("#overlay");
overlay.style.display = "none";
let showReviewInputs = document.querySelector("#show-review-inputs");
showReviewInputs.onclick = function(){
    overlay.style.display = "flex";
    addReviewButton.style.display = "block";
    saveReviewButton.style.display = "none";
}
let inputMovieName = document.querySelector("#input-movie-name")
let inputMovieReview = document.querySelector("#input-movie-review")
let inputMovieRating = document.querySelector("#rating")
let inputMovieDirector = document.querySelector("#input-movie-director")
let saveReviewButton = document.querySelector("#save-review-button")

function addMovieReview(data){
    let movieWrapper = document.createElement("div");
    movieWrapper.classList.add("movie-wrapper");
    let topWrapper = document.createElement("div");
    topWrapper.classList.add("top-wrapper");
    let changeWrapper = document.createElement("div");
    changeWrapper.classList.add("change-wrapper");
    let reviewName = document.createElement("h3");
    reviewName.textContent = data["name"];
    let movieDirector = document.createElement("p");
    movieDirector.textContent = "Directed by: " + data["director"];
    let reviewReview = document.createElement("p");
    reviewReview.textContent = data["review"];

    //stars
    let star = document.createElement("span");
    star.classList.add("star");
    for (let i = 0; i < parseInt(data["rating"]); i++) {
        star.textContent += "★ ";
    }

    
    let reviewDate = document.createElement("p");
    reviewDate.textContent = data["date"];
    topWrapper.appendChild(reviewName);
    movieWrapper.appendChild(topWrapper);
    topWrapper.appendChild(changeWrapper);
    movieWrapper.appendChild(movieDirector);
    let editButton = document.createElement("button");
    editButton.innerHTML = "<img src='https://img.icons8.com/ios-glyphs/30/000000/edit.png'/>";
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<img src='https://img.icons8.com/ios-glyphs/30/000000/delete-sign.png'/>";
    changeWrapper.appendChild(editButton);
    changeWrapper.appendChild(deleteButton);
    movieWrapper.appendChild(star);
    movieWrapper.appendChild(reviewReview);
    let botWrapper = document.createElement("div");
    botWrapper.classList.add("bot-wrapper");
    botWrapper.appendChild(reviewDate);
    movieWrapper.appendChild(botWrapper);
    reviewReviewWrapper.appendChild(movieWrapper);
    

    editButton.onclick = function(){
        console.log("edit button clicked on: ", data["id"])
        inputMovieName.value = data["name"];
        inputMovieReview.value = data["review"];
        inputMovieRating.value = data["rating"];
        inputMovieDirector.value = data["director"];
        editId = data["id"];
        overlay.style.display = "flex";
        addReviewButton.style.display = "none";
        saveReviewButton.style.display = "block";
    }
    saveReviewButton.onclick = function(){
        let date = new Date();
        // trim date to date and time and fix for local timezone
        date = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
        date = date.toISOString().substring(0, 16)
        date = date.replace("T", " ")
        let editData = "name="+encodeURIComponent(inputMovieName.value) + "&review="+encodeURIComponent(inputMovieReview.value)+ "&rating="+encodeURIComponent(inputMovieRating.value)+ "&date="+encodeURIComponent(date)+ "&director="+encodeURIComponent(inputMovieDirector.value)
        // send new review value to the server
        fetch(`http://localhost:8080/reviews/${editId}`, {
            method: "PUT",
            body: editData,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function(response){
            console.log("response: ", response)
            clearLoadedReviews()
            loadReviewsFromServer()
            inputMovieName.value = ""
            inputMovieReview.value = ""
            inputMovieRating.value = ""   
            inputMovieDirector.value = ""
            overlay.style.display = "none";
        })

    }
    deleteButton.onclick = function(){
        if(confirm("Are you sure you want to delete this review?")){
            
            let deleteId = data["id"]
            // send new review value to the server
            fetch(`http://localhost:8080/reviews/${deleteId}`, {
            method: "DELETE",
            body: "",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function(response){
            console.log("response: ", response)
            clearLoadedReviews()
            loadReviewsFromServer()
        })
        
    }
    }
}
function loadReviewsFromServer() {
    fetch("http://localhost:8080/reviews")
        .then(function(response){
        response.json()
        .then(function(data){

            let rollerReviews = data
            rollerReviews.forEach(addMovieReview)
        });
    })
}
function clearLoadedReviews(){
    reviewReviewWrapper.textContent = ""
}

let addReviewButton = document.querySelector("#add-review-button");
function addNewReview(){
    // let inputMovieName = document.querySelector("#input-review-name")
    // let inputMovieReview = document.querySelector("#input-review-review")
    // let inputMovieRating = document.querySelector("#rating")
    let date = new Date();
    // trim date to date and time and fix for local timezone
    date = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
    date = date.toISOString().substring(0, 16)
    date = date.replace("T", " ")

    console.log(date)
    //prep data to send to server
    let data = "name="+encodeURIComponent(inputMovieName.value) + "&review="+encodeURIComponent(inputMovieReview.value)+ "&rating="+encodeURIComponent(inputMovieRating.value)+ "&date="+encodeURIComponent(date)+ "&director="+encodeURIComponent(inputMovieDirector.value)
    // send new review value to the server
    console.log(data)
    fetch("http://localhost:8080/reviews", {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response){
        console.log("response: ", response)
        clearLoadedReviews()
        loadReviewsFromServer()
        inputMovieName.value = ""
        inputMovieReview.value = ""
        inputMovieRating.value = ""
        inputMovieDirector.value = ""
        overlay.style.display = "none";   
    })
}


addReviewButton.onclick = addNewReview;
loadReviewsFromServer()