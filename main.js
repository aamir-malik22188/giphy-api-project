
$(document).ready(function() {

  var giphy = [];

  function displayGiphs() {
    $("#gifs-appear-here").empty();
    $("#giphyButton").removeClass("active");
    $(this).addClass("active");

    var a = $(this).data("search");
  
    var myKey = config.myKey;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + a + myKey;
    
    console.log(queryURL);
  
  $.ajax({
      url: queryURL,
      method: "GET"
  }).done(function(response) {
      var results = response.data;
      console.log(results);

      for (var i = 0; i < results.length; i++) {
        	
        var showDiv = $("<div class='col-sm-4 col-md-4 col-lg-4'>");

        var rating = results[i].rating;
        var defaultAnimatedSrc = results[i].images.fixed_height.url;
        var staticSrc = results[i].images.fixed_height_still.url;
        var showImage = $("<img>");
        var p = $("<p>").text("Rating: " + rating);

        showImage.attr("src", staticSrc);
        showImage.addClass("giphy");
        showImage.attr("data-state", "still");
        showImage.attr("data-still", staticSrc);
        showImage.attr("data-animate", defaultAnimatedSrc);
        showDiv.append(showImage);
        showDiv.append(p);
        	$("#gifsAppearHere").append(showDiv);

    }
  });
  }


// Make the search button function and push the user input into a buttons
  $("#giphyButton").on("click", function(event) {
    event.preventDefault();
    var newGiphy = $("#userInputSearch").val().trim();
    giphy.push(newGiphy);
    console.log(giphy);
    $("#userInputSearch").val('');
    displayButtons();
});

// Display the buttons from the code above
function displayButtons() {
  $("#search-btn-appear-here").empty();
  for (var i = 0; i < giphy.length; i++) {
    var a = $('<button class="btn btn-primary">');
    a.attr("id", "show");
    a.attr("data-search", giphy[i]);
    a.text(giphy[i]);
    $("#search-btn-appear-here").append(a);
  }
}

displayButtons();


//Click event on the new buttons to displayGiphs
$(document).on("click", "#show", displayGiphs);

//Click event on gifs that allow it stay still or play
$(document).on("click", ".giphy", pausePlayGifs);


function pausePlayGifs() {
   var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
}
}


});

