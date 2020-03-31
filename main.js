let redirect = function(url) {
	window.location.href = url;
}

let redirectCooldown = function(self, url, cooldown) {
	if (--cooldown.innerText <= 0)
	{
		clearInterval(self[0]);
		redirect(url);
	}
}

window.onload = function() {
	let moduleName = document.getElementById("moduleName");
	let moduleIcon = document.getElementById("moduleIcon");
	let cooldownText = document.getElementById("cooldownText");
	let redirectButton = document.getElementById("redirectButton");

	try {
		let moduleData = document.location.search.match(/[?&]redirect=(\w+)/i)[1].toLocaleLowerCase();
		if (!(moduleData in data)) throw null;

		document.title = "Redirecting to #" + moduleData;

		moduleName.innerText = moduleData;
		moduleData = data[moduleData];
		document.getElementById("owner").innerText = moduleData.owner;
		if ("icon" in moduleData)
			moduleIcon.src = `https://i.imgur.com/${moduleData.icon}.png`;

		if (document.location.search.match(/[?&]hasbutton=true/i))
		{
			cooldownText.remove();
			redirectButton.classList.remove("hidden");

			redirectButton.addEventListener("click", () => redirect(moduleData.url), false);
		}
		else
		{
			redirectButton.remove();
			cooldownText.classList.remove("hidden");

			let id = [ ];
			id[0] = setInterval(redirectCooldown, 1000, id, moduleData.url, document.getElementById("cooldown"));
		}
	}
	catch(_)
	{
		document.title = "Invalid module.";

		moduleName.className = "red";
		document.getElementById("moduleOwner").innerText = "Invalid module.";
		moduleIcon.src = "https://i.imgur.com/v4Iurtp.png";
		cooldownText.remove();
		redirectButton.remove();
	}
}