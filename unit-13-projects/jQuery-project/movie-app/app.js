let currentId = 0;
let movieList = [];

// append new movies to the table
$(function () {
  $("#movieForm").on("submit", function (event) {
    event.preventDefault();

    // Ensure that a title has at least 2 characters in it.
    if ($("#movieTitle").val() < 3) {
      alert("A title should have at least 2 characters in it");
      $("#movieForm").trigger("reset");
    } else {
      let title = $("#movieTitle").val();
      let rating = $("#movieRating").val();

      let movieData = {
        title,
        rating,
        currentId,
      };
      const newMovie = appendMovieData(movieData);

      currentId++;
      movieList.push(movieData);

      $("#tableBody").append(newMovie);
      $("#movieForm").trigger("reset");
    }
  });
});

function appendMovieData(data) {
  return `
        <tr>
            <td>${data.title}</td>
            <td>${data.rating}</td>
            <td>
                <button class="btn-xl btn-warning font-weight-bold font-dark" id=${data.currentID}>
                    Delete
                </button>
            </td>
        </tr>
    `;
}

//when delete button is clicked, delete the current row
$("body").on("click", ".btn-warning", function (event) {
  let removeMovieIndex = movieList.findIndex(
    (movie) => movie.currentId === +$(event.target).data("Id")
  );
  movieList.splice(removeMovieIndex, 1);
  // console.log(movieList);
  $(event.target).closest("tr").remove();
});

//toggle arrow and append sorted list
// $(".fas").on("click", function(event){
//     let direction = $(event.target).hasClass("fa-sort-up") ? "up" : "down";
//     let movieId = $(event.target).attr("id");
//     let sortedMovies = sortMovie(movieList, movieId, direction)

//     $("#tableBody").empty()

//     for (let movie of sortedMovies) {
//         const newMovie = appendMovieData(movie);
//         $("#tableBody").append(newMovie);
//     }

//     $(event.target).toggleClass("fa-sort-up");
//     $(event.target).toggleClass("fa-sort-down");
// })

// Sort movies alphabetically


// Sort movies by the rating 

// function sortMovie(movieList, id, arrowDirection) {
//     return movieList.sort(function(a, b) {
//         // since rating is a number, we have to convert these strings to numbers
//         if (id === "rating") {
//           a[id] = +a[id];
//           b[id] = +b[id];
//         }
//         if (a[id] > b[id]) {
//           return arrowDirection === "up" ? 1 : -1;
//         } else if (b[id] > a[id]) {
//           return arrowDirection === "up" ? -1 : 1;
//         }
//         return 0;
//       });
// }