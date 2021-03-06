$(document).ready(() => {
    $("#searchform").on("submit", (event) => {
        let movietitle = $("#movietitle").val();
        searchMovies(movietitle);
        $('html, body').animate({
            scrollTop: ($('#result').offset().top)
        }, 1500);
        event.preventDefault();
    });
});

function searchMovies(movietitle) {
    axios.get("https://www.omdbapi.com/?apikey=b69472c7&s=" + movietitle).then((responseobj) => {
        console.log(responseobj);
        let moviesarray = responseobj.data.Search; //Search is Array of movie data
        let searchresult = "";
        $.each(moviesarray, (index, moviedata) => {
            searchresult += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="${moviedata.Poster}">
                        <h5>${moviedata.Title} (${moviedata.Year})</h5>
                        <a href="#" class="btn btn-primary" onclick="setMovieID('${moviedata.imdbID}')">More Information</a>
                    </div>
                </div>
            `;
        });
        $("#searchresults").html(searchresult);
    }).catch((error) => {
        console.log(responseobj);
    });
}

function setMovieID(imdbid) {
    sessionStorage.setItem("movieid", imdbid);
    window.location = "movieinfo.html";
    return false;
}

function showMoreInfo() {
    let movieid = sessionStorage.getItem("movieid");    
    axios.get("https://www.omdbapi.com/?apikey=b69472c7&i=" + movieid).then((responseobj) => {
        console.log(responseobj);
        let moviedata = responseobj.data;
        let movieinformation = `
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <img class="thumbnail" src="${moviedata.Poster}">
                    </div>
                    <div class="col-lg-6">
                        <h2>${moviedata.Title}</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Rating:</strong> ${moviedata.Rated}</li>
                            <li class="list-group-item"><strong>IMDb Rating:</strong> ${moviedata.imdbRating}</li>
                            <li class="list-group-item"><strong>Director:</strong> ${moviedata.Director}</li>
                            <li class="list-group-item"><strong>Actors:</strong> ${moviedata.Actors}</li>
                            <li class="list-group-item"><strong>Writer:</strong> ${moviedata.Writer}</li>
                            <li class="list-group-item"><strong>Release:</strong> ${moviedata.Released}</li>
                            <li class="list-group-item"><strong>Genre:</strong> ${moviedata.Genre}</li>
                    </div>
                </div>
                <div class="row">
                    <div class="well">
                        <h3>Synopsis<h3>
                        <p>${moviedata.Plot}</p>
                        <hr>
                        <a href="https://imdb.com/title/${moviedata.imdbID}" class="btn btn-primary" target="_blank">IMDb</a>
                        <!--
                        <a href="index.html" class="btn btn-primary">Home</a>
                        -->
                    </div>
                </div>
            </div>
        `;
        $("#movieinfo").html(movieinformation);
    }).catch((error) => {
        console.log(responseobj);
    });
}