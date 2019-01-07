// array for movie titles
var topics = ["Home Alone", "Die Hard", "Coming to America", "Beverly Hills Cop", "Trading Places"];


// function for capturing the movie name from the data-attribute
function alertData() {
  var topics = $(this).attr("data-name");
}

function renderButtons() {

  // Deleting the movie topics to adding new topics
  $("#buttons-view").empty();

  // Looping through the array of topics
  for (var i = 0; i < topics.length; i++) {

    var a = $("<button>");
    // Adding a class of movie to our button
    a.addClass("movie");
    // Adding a data-attribute
    a.attr("data-movie", topics[i]);
    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the HTML
    $("#buttons-view").append(a);
  }
}

// This function handles events where one button is clicked
$("#add-movie").on("click", function (event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var movie = $("#movie-input").val().trim();

  topics.push(movie);

  renderButtons();

});

// Function for displaying the movie info// 
$(document).on("click", ".movie", alertData);

// Calling the renderButtons function to display the intial buttons
renderButtons();

$(document).on("click", ".movie", function () {

  var movies = $(this).attr("data-movie");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    movies +
    "&api_key=rqTcmyEArNSNEVTWJiZXhHVD0wNnciIQ&limit=10";
  // Performing an AJAX request with the queryURL
  $.ajax({
      url: queryURL,
      method: "GET"
    })

    // After data comes back from the request
    .then(function (response) {
      console.log(queryURL);

      console.log(response);

      var results = response.data;

      // Looping through each result item
      for (var i = 0; i < results.length; i++) {


        var movieDiv = $("<div class='dyn-div'>");

        var p = $("<p>").text("Rating: " + results[i].rating);

        var movieImage = $("<img>");
        // Setting the src attribute of the image
        movieImage.attr("src", results[i].images.fixed_height.url);
        movieImage.attr("data-still", results[i].images.fixed_height_still.url);
        movieImage.attr("data-animate", results[i].images.fixed_height.url);
        movieImage.attr("data-state", "animate");


        // Appending the paragraph and image tag to the movieDiv
        movieDiv.append(p);
        movieDiv.append(movieImage);
    
        $("#gifs-appear-here").prepend(movieDiv);


      }
    });
});

$("#movie-input").empty();
$(document).on("click", ".dyn-div", function () {

  var image = $(this).find("img")
  var state = image.attr("data-state");
  console.log(image)
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  if (state === "still") {
    
    image.attr("src", image.attr("data-animate"));
    image.attr("data-state", "animate");
  } else {
    image.attr("src", image.attr("data-still"));
    image.attr("data-state", "still");

    console.log(image.attr("data-state"))

  }



});