var moduleName = new URLSearchParams(document.location.search).get("redirect").toLocaleLowerCase();
var module = data[moduleName]

function redirect() {
  let button = document.getElementById("donateButton");
  button.textContent = "Loading...";
  button.classList += "loading";
  window.location.href = module["url"].toLocaleLowerCase();
}

window.onload = function() {
  //Name
  document.getElementById("moduleName").textContent = "#" + moduleName.toString();

  //Owner
  let owner = document.getElementById("moduleOwner");
  owner.textContent = "by " + module["owner"].toString();

  /*
  //Host
  if("host" in module) {
    owner.appendChild(document.createElement("br"));
    owner.appendChild(document.createTextNode("(Hosted by " + module["host"].toString() + ")"));
  }
  */

  //Icon
  if("icon" in module) {
    document.getElementById("moduleIcon").src = "https://i.imgur.com/" + module["icon"] + ".png";
  }

  //Button
  if("url" in module) {
    document.getElementById("donateButton").disabled = false;
  }
}
