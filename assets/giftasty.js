var topics = ["Home Alone", "Elf", "Die Hard", "Christmas Story"];


 // Generic function for capturing the movie name from the data-attribute
 function alerttopics() {
   var topics = $(this).attr("data-name");
 }

 // Function for displaying movie data
 function renderButtons() {

   // Deleting the movie topics to adding new topics
   // (this is necessary otherwise we will have repeat buttons)
   $("#buttons-view").empty();

    // i need to set the internal data-movie attribute value to topics[i]
   // Looping through the array of topics
   for (var i = 0; i < topics.length; i++) {

     // Then dynamicaly generating buttons for each movie in the array
     // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
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
 $("#add-movie").on("click", function(event) {
   // Preventing the buttons default behavior when clicked (which is submitting a form)
   event.preventDefault();
   // This line grabs the input from the textbox
   var movie = $("#movie-input").val().trim();

   // Adding the movie from the textbox to our array
   topics.push(movie);

   // Calling renderButtons which handles the processing of our movie array
   renderButtons();

 });

 // Function for displaying the movie info
// 


$(document).on("click", ".movie", alerttopics);

 // Calling the renderButtons function to display the intial buttons
 renderButtons();

$(document).on("click", ".movie", function () {
  

// $("button").on("click", function() {
  // Grabbing and storing the data-movie property value from the button
  var movies
   = $(this).attr("data-movie");

  // Constructing a queryURL using the animal name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    movies
     + "&api_key=hFzmqKwBT6astLROhFMHhBWP5aTfsads&limit=10";



  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  
    // After data comes back from the request
    .then(function(response) {
      console.log(queryURL);

      console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;

      // Looping through each result item
      for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        var movieDiv = $("<div class='dyn-div'>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var movieImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        movieImage.attr("src", results[i].images.fixed_height.url);
        movieImage.attr("data-still",results[i].images.fixed_height_still.url);
        movieImage.attr("data-animate",results[i].images.fixed_height.url);
        movieImage.attr("data-state","animate");
        
        
        // Appending the paragraph and image tag to the movieDiv
        movieDiv.append(p);
        movieDiv.append(movieImage);
        
        

        // Prependng the movieDiv to the HTML page in the "#gifs-appear-here" div
        $("#gifs-appear-here").prepend(movieDiv);
        
       
      }
    });
});

$(document).on("click", ".dyn-div", function () {
// $('.dyn-div').on("click", function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
 
  var image = $(this).find("img")
  var state = image.attr("data-state");
  console.log(image)
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  console.log("asfasdf")
  if (state === "still") {
    // var AnimateURL = image.attr("data-animate")
    image.attr("src", image.attr("data-animate"));
    image.attr("data-state", "animate");
  } else {
    image.attr("src", image.attr("data-still"));
    image.attr("data-state", "still");

    console.log(image.attr("data-state"))
    
  }
  
  
});