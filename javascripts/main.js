"use strict";

$("#right-arrow").click(next);
$("#left-arrow").click(previous);

$("#auto").click(queueRotation);


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

var images = [];
var currentIndex = 0;
var numberOfImages = 0;

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
		// $("#main-image").attr("src", images[numberOfImages - 1].url);
		setPicture(images[numberOfImages - 1]);
	}else{
		currentIndex--;
		// $("#main-image").attr("src", images[currentIndex].url);
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

function queueRotation(event){
	var i = 0;
	var timeout = setTimeout(startRotation, 2000);
	$("#stopBtn").click(stopRotation);


	function startRotation(event){
		console.log("i: ", i);
		$("#stopBtn").show();
		$("#imageDesc").show();
		setPicture(images[i]);
		timeout = setTimeout(startRotation, 2000);
		if(i + 1 === images.length){
			i = 0;
		}else{
			i++;
		}
	}

	function stopRotation(){
		clearInterval(timeout);
		$("#stopBtn").hide();

	}



}


