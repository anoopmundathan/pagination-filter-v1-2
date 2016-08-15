"use strict";

// Seach and Pagination elements
var searchDiv = '<div class="student-search"><input placeholder="Search for students..."><button>Search</button></div>';
var pagination = '<div class="pagination"><ul></ul></div>';

// Add search box and search button into the page header
$('.page-header.cf').append(searchDiv);

// Split students into group of 10
var studentItems = $('.student-item.cf');
var studentList = splitStudentList(studentItems);

// Return an array of students
function splitStudentList(studentItems) {
	var array = [];
	var studentArray = studentItems.slice();
	while(studentArray.length > 0) {
		array.push(studentArray.splice(0,10));
	}
	return array;
}

// Search using name or e-mail
function studentSearch() {
	
	// Get input value from search box
	var input = $(this).val().toLowerCase().trim();
	
	// Filter method returns matching list items
	var filterList = studentItems.filter(function() {

		var name = $(this).find('h3').text();
		var email = $(this).find('.email').text();

		if(name.indexOf(input) > -1 || email.indexOf(input) > -1) {
			return true;
		} else {
			return false;
		}
	});

	// Remove page buttons from the DOM
	$('.pagination').remove();

	if (filterList.length === 0) {
		$('.page-header h2').text('NO MATCH FOUND');
	} else {
		$('.page-header h2').text('STUDENTS');
	}

	var list = splitStudentList(filterList);
	
	if (filterList.length >= 10) {
		addPageButton(list);
	}

	displayPage(0, list);

}

// Display current page and hide rest of the pages
function displayPage(pageNo, studentList) {
	studentItems.hide();
	$.each(studentList, function(index, list) {
		if (pageNo === index) {
			$.each(list, function(i,l) {
				$(l).fadeIn('slow');
			})
		}	
	});
}

// Append buttons to page
function addPageButton(studentList) {

	// Append pagination div into the DOM
	$('.page').append(pagination);

	// Create each page button
	var length = studentList.length;
	for (var i = 1; i <=length; i++) {
		$('.pagination ul').append("<li><a href='#'>" + i + "</a></li>");
	}

	// Make first page active
	$('.pagination ul li a').first().addClass("active");

	// Add event listener for each page button
	$('.pagination ul li a').click(function() {
		
		var pageNo = parseInt(this.text) - 1;
		
		displayPage(pageNo, studentList);

		// Remove all classes and make current page active
		$('.pagination ul li a').removeClass();
		$(this).addClass("active");
	});

}

// Add Event handlers
$('.student-search input').keyup(studentSearch);
$('.student-search button').click(studentSearch);

addPageButton(studentList);
displayPage(0, studentList);
