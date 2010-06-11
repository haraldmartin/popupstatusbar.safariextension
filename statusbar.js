var StatusBarDiv = document.createElement("a");
StatusBarDiv.className = "com_jev_statusbar-StatusBarDiv";
document.body.appendChild(StatusBarDiv);

var hideTimeout;

StatusBarDiv.addEventListener("mouseover",
	function() {
		clearTimeout(hideTimeout);
		if (StatusBarDiv.style.bottom == "" || StatusBarDiv.style.bottom === "0px") {
			StatusBarDiv.style.bottom = "20px"; // height + padding-top/bottom + 1
			StatusBarDiv.style.borderBottomRightRadius = "5px";
		} else {
			StatusBarDiv.style.bottom = "0px";
			StatusBarDiv.style.borderBottomRightRadius = "0";
		}
	},
	true);
StatusBarDiv.addEventListener("mouseout",
	function() {
		hideTimeout = setTimeout(hideStatusDiv, 2);
	});

function hideStatusDiv(event) {
	StatusBarDiv.style.display = "none";
	StatusBarDiv.style.bottom = 0;
	StatusBarDiv.style.borderBottomRightRadius = "0";
}

function mouseover(event) {
	clearTimeout(hideTimeout);
    StatusBarDiv.innerHTML = event.currentTarget.href;
	StatusBarDiv.href = event.currentTarget.href;
    StatusBarDiv.style.display = "block";
}
function mouseout(event) {
	hideTimeout = setTimeout(hideStatusDiv, 2);
}
Array.prototype.forEach.call(document.links, function(link) {
    link.addEventListener("mouseover", mouseover, true);
    link.addEventListener("mouseout", mouseout, true);
});
