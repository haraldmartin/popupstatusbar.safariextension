var StatusBarDiv = document.createElement("div");
StatusBarDiv.className = "com_jev_statusbar-StatusBarDiv";
document.body.appendChild(StatusBarDiv);

var onTheDiv = false;
StatusBarDiv.addEventListener("mouseover",
function() {
    onTheDiv = true
},
true);

function mouseover(event) {
    if (!onTheDiv) {
        StatusBarDiv.innerHTML = event.currentTarget.href;
        StatusBarDiv.style.display = "block"
    }
}
function mouseout(event) {
    StatusBarDiv.innerHTML = "";
    StatusBarDiv.style.display = "none";
    onTheDiv = false
}
for (var i in document.links) {
    document.links[i].addEventListener("mouseover", mouseover, true);
    document.links[i].addEventListener("mouseout", mouseout, true);
}
