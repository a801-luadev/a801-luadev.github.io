let redirect = function(url, cooldown) {
	if (--cooldown.innerText <= 0)
	{
		clearInterval(1);
		window.location.href = url;
	}
}

window.onload = function() {
	let moduleName = document.getElementById("moduleName");
	let moduleIcon = document.getElementById("moduleIcon");

	try {
		let moduleData = document.location.search.match("redirect=(\\w+)")[1].toLocaleLowerCase();
		if (!(moduleData in data)) throw null;

		document.title = "Redirecting to #" + moduleData;

		moduleName.innerText = moduleData;
		moduleData = data[moduleData];
		document.getElementById("owner").innerText = moduleData.owner;
		if ("icon" in moduleData)
			moduleIcon.src = `https://i.imgur.com/${moduleData.icon}.png`;

		setInterval(redirect, 1000, moduleData.url, document.getElementById("cooldown"));
	}
	catch(_)
	{
		document.title = "Invalid module.";

		moduleName.className = "red";
		document.getElementById("moduleOwner").innerText = "Invalid module.";
		moduleIcon.src = "https://i.imgur.com/v4Iurtp.png";
		document.getElementById("cooldownText").remove();
	}
}