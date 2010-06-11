const HIDDEN = "com_jev_statusbar-hide";
const DUCKED = "com_jev_statusbar-duck";
const SHOWN = "";

var StatusBarDiv = document.createElement("a");
StatusBarDiv.id = "com_jev_statusbar-StatusBarDiv";
StatusBarDiv.className = HIDDEN;
document.body.appendChild(StatusBarDiv);

var hideTimeout;

StatusBarDiv.addEventListener(
	"mouseover",
	function() {
		clearTimeout(hideTimeout);
		if (StatusBarDiv.className == SHOWN || StatusBarDiv.className == HIDDEN) {
			StatusBarDiv.className = DUCKED;
		} else {
			StatusBarDiv.className = SHOWN;
		}
	},
	true
);
StatusBarDiv.addEventListener(
	"mouseout",
	function() {
		hideTimeout = setTimeout(hideStatusDiv, 2);
	},
	true
);

function hideStatusDiv(event) {
	StatusBarDiv.className = HIDDEN;
}

function mouseover(event) {
	clearTimeout(hideTimeout);
    StatusBarDiv.innerHTML = event.currentTarget.href;
	StatusBarDiv.href = event.currentTarget.href;
    if (StatusBarDiv.className != DUCKED) StatusBarDiv.className = SHOWN;
}
function mouseout(event) {
	hideTimeout = setTimeout(hideStatusDiv, 2);
}
Array.prototype.forEach.call(document.links, function(link) {
    link.addEventListener("mouseover", mouseover, true);
    link.addEventListener("mouseout", mouseout, true);
});
