const HIDDEN = "com_jev_statusbar-hide";
const DUCKED = "com_jev_statusbar-duck";
const SHOWN = "";

var StatusBarDiv; // the DOM element with status text
var hideTimeout; // holds timer used to prevent StatusBarDiv from flickering on/off

/** Event Handler Functions **/
/*****************************/

/*
 * hideStatusDiv
 *  Hides the StatusBarDiv.  Should normally be called with a delay (using
 *  setTimeout) to avoid flicker from other event handlers immidiately re-showing it.
 */
function hideStatusDiv(event) {
	StatusBarDiv.className = HIDDEN;
}

/*
 * linkHover
 *  Updates the StatusBarDiv with the href of the currently hovered link.  Attached
 *  as the "mouseover" event of all links on the page.
 */
function linkHover(event) {
	clearTimeout(hideTimeout); // cancel delayed hideStatusDiv()
    StatusBarDiv.innerHTML = event.currentTarget.href;
	StatusBarDiv.href = event.currentTarget.href;
    if (StatusBarDiv.className == HIDDEN) StatusBarDiv.className = SHOWN;
	 // note: if StatusBarDiv.className == DUCKED, it is not hidden
}

/*
 * linkUnHover
 *  Queues hiding of the StatusBarDiv.  Attached as the "mouseout" event of all links
 *  on the page.
 */
function linkUnHover(event) {
	hideTimeout = setTimeout(hideStatusDiv, 2);
}

/*
 * checkDuck
 *  Used to "unduck" the StatusBarDiv when the mouse moves beyond its right edge.
 *  Vertical movement doesn't need to be checked here, since this is already handled
 *  sufficiently by mouseover and mouseout events elsewhere.
 */
function checkDuck(mouseEvent) {
	if (mouseEvent.clientX > StatusBarDiv.offsetWidth) {
		StatusBarDiv.className = SHOWN;
		window.removeEventListener("mousemove", checkDuck, true);
	}
}


/**  Initialization **/
/*********************/

var StatusBarDiv = document.createElement("a");
StatusBarDiv.id = "com_jev_statusbar-StatusBarDiv";
StatusBarDiv.className = HIDDEN;
document.body.appendChild(StatusBarDiv);

StatusBarDiv.addEventListener(
	"mouseover",
	function() {
		clearTimeout(hideTimeout); // don't hide while it is being hovered
		if (StatusBarDiv.className != DUCKED) {
			StatusBarDiv.className = DUCKED;
			window.addEventListener("mousemove", checkDuck, true);
		} else {
			// mouse is crossing from bottom edge while ducked; unduck
			StatusBarDiv.className = SHOWN;
			window.removeEventListener("mousemove", checkDuck, true);
		}
	},
	true
);
StatusBarDiv.addEventListener(
	"mouseout",
	function() {
		// hide unless linkHover event happens again immediately
		hideTimeout = setTimeout(hideStatusDiv, 2);
	},
	true
);

// attach event listeners to all existing links
Array.prototype.forEach.call(document.links, function(link) {
    link.addEventListener("mouseover", linkHover, true);
    link.addEventListener("mouseout", linkUnHover, true);
});
