$(document).ready(() => {
    $("#searchform").on("submit", (event) => {
        let movietitle = $("movietitle").val();
        searchMovies(movietitle);
        event.preventDefault();
    });
});

function searchMovies(movietitle) {
    axios.get("http://www.omdbapi.com?s" + movietitle).then((response) => {

    }).catch((error) => {
        
    });
}