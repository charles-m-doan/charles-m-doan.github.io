const defaultPage = "home-page";
const defaultTab = document.getElementById("home-button");

function openPage(pageName, clickedTab) {
	// Hide all elements with class="tabcontent" */
	let i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Show the specific tab's page content
	document.getElementById(pageName).style.display = "flex";

	// Reset the background color of all tablink buttons
	tablinks = document.getElementsByClassName("header__tablink");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].style.backgroundColor = "var(--primary-1)";
		tablinks[i].style.color = "var(--primary-7)";
	}

	//Change button used to open the tab content to highlight color
	clickedTab.style.backgroundColor = "var(--primary-3)";
	clickedTab.style.color = "var(--primary-max)";
}

document.getElementById("home-button").onclick = function() {
	openPage("home-page", this);
};

document.getElementById("projects-button").onclick = function() {
	openPage("projects-page", this);
};

document.getElementById("about-button").onclick = function() {
	openPage("about-page", this);
};

document.getElementById("contact-button").onclick = function() {
	openPage("contact-page", this);
};

openPage(defaultPage, defaultTab);
