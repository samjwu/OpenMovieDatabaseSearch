$(document).ready(() => {
    $("#searchform").on("submit", (event) => {
        let movietitle = $("#movietitle").val();
        searchMovies(movietitle);
        event.preventDefault();
    });
});

function searchMovies(movietitle) {
    axios.get("http://www.omdbapi.com/apikey=b69472c7&?s=" + movietitle).then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(response)
    });
}