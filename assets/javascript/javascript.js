var topics = ["charlie the unicorn", "puppies"];
var quantityGifs = 5;
var Rating = "R";

function loadButtons(){
	for(var i = 0; i < topics.length; i+=1) {
		var newButton = $("<button>");
		newButton.addClass("btn");
		newButton.addClass("display-button");
		newButton.text(topics[i]);
		$("#button-container").append(newButton);
	}
	$(".display-button").unbind("click");

	$(".display-button").on("click", function(){
		$(".gif-image").unbind("click");
		$("#gif-container").empty();
		$("#gif-container").removeClass("border");
		displayGifsInContainer($(this).text());
	});

}

function addButton(gifSearch){
	if(topics.indexOf(gifSearch) === -1) {
		topics.push(gifSearch);
		$("#button-container").empty();
		loadButtons();
	}
}

function displayGifsInContainer(gifSearch){
	$.ajax({
		url: "https://api.giphy.com/v1/gifs/search?q=" + gifSearch + 
		"&api_key=dc6zaTOxFJmzC&rating=" + Rating + "&limit=" + quantityGifs,
		method: "GET"
	}).then(function(response){
		response.data.forEach(function(element){
			newDiv = $("<div>");
			newDiv.addClass("primary-gif-container");
			newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
			var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
			newImage.addClass("gif-image");
			newImage.attr("state", "still");
			newImage.attr("still-data", element.images.fixed_height_still.url);
			newImage.attr("animated-data", element.images.fixed_height.url);
			newDiv.append(newImage);
			$("#gif-container").append(newDiv);
		});
		
		$("#gif-container").addClass("border");
		$(".gif-image").unbind("click");
		$(".gif-image").on("click", function(){
			if($(this).attr("state") === "still") {
				$(this).attr("state", "animated");
				$(this).attr("src", $(this).attr("animated-data"));
			}
			else {
				$(this).attr("state", "still");
				$(this).attr("src", $(this).attr("still-data"));
			}
		});
	});
}

$(document).ready(function(){
	loadButtons();
	$("#submit").on("click", function(){
		event.preventDefault();
		addButton($("#display-gif").val().trim());
		$("#display-gif").val("");
	});
});
