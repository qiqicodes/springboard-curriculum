// Build an application that uses jQuery to do the following:


// 4. Allow users to sort alphabetically by the title of the movie
//     or by the rating of the movie from lowest to highest and vice versa.

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
