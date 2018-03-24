$(document).ready(() => {
    $("#searchform").on("submit", (event) => {
        let movietitle = $("#movietitle").val();
        searchMovies(movietitle);
        event.preventDefault();
    });
});

function searchMovies(movietitle) {
    axios.get("http://www.omdbapi.com/?apikey=b69472c7&s=" + movietitle).then((responseobj) => {
        // console.log(responseobj);
        let moviesarray = responseobj.data.Search; //Search is Array of movie data
        let searchresult = "";
    }).catch((error) => {
        // console.log(responseobj);
    });
}