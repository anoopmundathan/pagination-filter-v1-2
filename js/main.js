
(function () {

	var page = document.querySelector('.page');
	var header = document.querySelector('.page-header');
	var searchDiv;
	var studentObject = [];

	addSearch();
	addSearchBox();
	addSearchButton();

	header.appendChild(searchDiv);

	pagination();

	function addSearch() {
		searchDiv = document.createElement('div');
		searchDiv.className = 'student-search';
	}

	function addSearchBox() {
		var searchBox = document.createElement('input');
		searchBox.placeholder = "Search for students...";
		searchDiv.appendChild(searchBox);
		searchBox.addEventListener('keyup', searchStudent);
	}


	function addSearchButton() {
		var searchButton = document.createElement('button');
		searchButton.innerHTML = "Search";
		searchDiv.appendChild(searchButton);
		searchButton.addEventListener('click', searchStudent)
	}

	function searchStudent() {

		hideAllStudents();
		removeAllPagination();
		addMatchedStudentsToArray();
		createPagination();
		showMatchedStudents();

		function hideAllStudents() {
			for (var j =0; j < 54; j++) {
				studentItems[j].style.display="none";
			}
		}
		
		function showMatchedStudents() {
			for (var i =0;  i<54 ; i++) {
				if (studentObject[i].name.indexOf(this.value) >= 0) {
					var index = parseInt(studentObject[i].index);
					studentItems[index].style.display="block";
				}	
			}
		}
	}

	var studentList, 
		studentItems;

	function pagination () {
		//create pagination class
		var pageDiv = document.createElement('div');
		pageDiv.className = "pagination";

		var ulElement = document.createElement('ul');

		//get ul 'student-list' element
		studentList = document.querySelector('.student-list');
		//get li 'student-it'
		studentItems = studentList.getElementsByClassName('student-item');

		var studentsLength = studentItems.length;
		var noOfPages = Math.floor(studentsLength / 10);
		var studentReminder = noOfPages % 10;

		if (studentReminder > 0) {
			noOfPages += 1;
		}

		for (var i = 1; i <= noOfPages; i++) {

			var liElement = document.createElement('li');
			var aElement = document.createElement('a');
		
			aElement.innerHTML = i;
			aElement.addEventListener('click', pageNavigation);
			liElement.appendChild(aElement);
			ulElement.appendChild(liElement);
			pageDiv.appendChild(ulElement);
			page.appendChild(pageDiv)
		}

		
		for (var i = 0; i<studentsLength; i++) {
			var students = {};
			students.name = studentItems[i].children[0].children[1].innerHTML;
			students.email = studentItems[i].children[0].children[2].innerHTML;
			students.index = i;
			studentObject.push(students);
		}
	
		// Pagination
		function pageNavigation() {

			var pageNumber = parseInt(this.text);
			var startPagination = (pageNumber * 10) - 10;

			// Hide contacts
			function makeContactsHidden() {
				for (var i =0; i < studentsLength; i++) {
					studentItems[i].style.display="none";
				}
			}

			// Show contacts
			function makeContactsShow() {
				for (var i=startPagination; i<startPagination+10 ; i++) {

					if (studentItems[i] === undefined) {
						break;
					}
					studentItems[i].style.display="block";
				}
			}

			makeContactsHidden();	
			makeContactsShow();
		}
	}

})();
