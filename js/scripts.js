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
    axios.get("http://www.omdbapi.com/?apikey=b69472c7&s=" + movietitle).then((responseobj) => {
        console.log(responseobj);
        let moviesarray = responseobj.data.Search; //Search is Array of movie data
        let searchresult = "";
        $.each(moviesarray, (index, moviedata) => {
            searchresult += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="${moviedata.Poster}">
                        <h5>${moviedata.Title} (${moviedata.Year})</h5>
                        <a href="#" class="btn btn-primary" onclick="">More Information</a>
                    </div>
                </div>
            `;
        });
        $("#searchresults").html(searchresult);
    }).catch((error) => {
        console.log(responseobj);
    });
}