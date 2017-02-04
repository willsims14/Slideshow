"use strict";

// Global Variables
var images = [];
var currentIndex = 0;
var numberOfImages = 0;

// Event Handlers
$("#right-arrow").click(next);
$("#left-arrow").click(previous);
$("#auto").click(queueRotation);

// Hides all images (briefly) so they can be faded in
$("img").hide();
$("img").each(function(i){
	$(this).fadeIn();
});

// Event Handlers for mouse over and mouse out
let mainImage = $("#main-content");
mainImage[0].onmouseover = show;
mainImage[0].onmouseout = hide;

// Load images from json file
$.ajax({
	url: "images.json"
}).done(imagesLoaded);




/*************************************/
/************* Functions *************/
/*************************************/

// Event Handler for completed ajax request 
function imagesLoaded(myImages){
	// Set first image
	images = myImages;
	currentIndex = myImages[0].index;
	numberOfImages = myImages.length;
	setPicture(myImages[0]);
	$("#imageDesc").hide();
}

// When user hits next button
function next(){
	if((currentIndex + 1) >= numberOfImages){
		currentIndex = 0;
		setPicture(images[0]);
	}else{
		currentIndex++;
		setPicture(images[currentIndex]);
	}
}

// When user hits previous button
function previous(){
	if(currentIndex - 1 < 0){
		currentIndex = numberOfImages - 1;
		setPicture(images[numberOfImages - 1]);
	}else{
		currentIndex--;
		setPicture(images[currentIndex]);
	}
}


// Sets the main image and description equal to the object
// 		that was passed to its properties
function setPicture(imageObj){
	// Fade out old picture
	$("img").hide();
	$("img").each(function(i){
		$(this).fadeOut();
	});

	// Set new picture
	$("#main-image").attr("src", imageObj.url);
	$("#imageDesc").html(imageObj.desc);

	// Fade in new picture
	$("img").hide();
	$("img").each(function(i){
		$(this).fadeIn();
	});
}


function show(event){
	$("#imageDesc").show();
}

function hide(event){
	$("#imageDesc").hide();
}

// * Starts chain of events to control slideshow
// * When user decides to enter automated slideshow, the image descriptions
// 		are always shown.
function queueRotation(event){
	$("#stopBtn").click(stopRotation);
	$("#imageDesc").show();

	var userInterval = parseInt($("#interval").find(":selected").val()) * 1000;

	var timeout = setTimeout(startRotation, userInterval);


	// Temporarily remove event listeners so image
	//		descriptions are always shown during rotation
	mainImage[0].onmouseover = show;
	mainImage[0].onmouseout = show;


	function startRotation(event){
		// Show/hide necesary buttons and image description
		$("#auto").hide();
		$("#stopBtn").show();
		$("#imageDesc").show();
		setPicture(images[i]);
		timeout = setTimeout(startRotation, userInterval);
		if(i + 1 === images.length){
			i = 0;
		}else{
			i++;
		}
	}
	// Whens user hits stop button, stop the rotation
	function stopRotation(){
		// Clear the interval and show/hide necesary buttons
		clearInterval(timeout);
		$("#imageDesc").hide();
		$("#stopBtn").hide();
		$("#auto").show();

		// Reset mouse over/out events
		mainImage[0].onmouseover = show;
		mainImage[0].onmouseout = hide;
	}
}


