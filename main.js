function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

var moduleName = getUrlParameter("redirect");
var module = data[moduleName]

function redirect() {
  let button = document.getElementById("donateButton");
  button.textContent = "Loading...";
  button.className += " loading";
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
