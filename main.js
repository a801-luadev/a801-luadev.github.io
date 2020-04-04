const BASE_URI = "https://a801-luadev.github.io"

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

let getMatchedModules = function(query) {
	let matches = {};
	for (let name of Object.keys(data)) {
		if (name.includes(query)) {
			matches[name] = (name.match(new RegExp(query, "gi")) || []).length;			

		}
	}
	return Object.entries(matches).sort((e1, e2) => e2[1] - e1[1]);
}

let updateModuleList = function(list) {
	
	moduleList.innerHTML = "";

	for (let mData of list) {
		let name = mData[0];
		let hoster = data[name].host || data[name].owner;
		moduleList.innerHTML += `<div class="module">
			<a href="${BASE_URI + "?redirect=" + name}" class="moduleName">
				<img src="https://i.imgur.com/${data[name].hasOwnProperty("icon") ? data[name].icon : "M22ygpZ"}.png">
				#${name}
			</a>
			<b>Owner:</b> <a href="https://atelier801.com/profile?pr=${htmlifyNickname(data[name].owner)}" class="profile">${data[name].owner}</a>
			<span class="hoster"><b>Hosted by:</b> <a href="https://atelier801.com/profile?pr=${htmlifyNickname(hoster)}" class="profile">${hoster}</a></span>

		</div>`
	}
}

window.onload = function() {
	let moduleSearch = document.getElementById("moduleSearch");
	let moduleList = document.getElementById("moduleList");
	let moduleName = document.getElementById("moduleName");
	let moduleIcon = document.getElementById("moduleIcon");
	let cooldownText = document.getElementById("cooldownText");
	let redirectButton = document.getElementById("redirectButton");


	if (/\/(index(\.html))?$/i.test(document.location)) {

		document.getElementById("modules").classList.remove("hidden")
		updateModuleList(getMatchedModules(""));
	} else {

		try {
			let moduleData = document.location.search.match(/[?&]redirect=(\w+)/i)[1].toLocaleLowerCase();
			if (!(data.hasOwnProperty(moduleData))) throw null;
		
			document.title = "Redirecting to #" + moduleData;
		
			moduleName.innerText = moduleData;
			moduleData = data[moduleData];
			document.getElementById("owner").innerText = moduleData.owner;
			if (moduleData.hasOwnProperty("icon"))
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
		
			moduleName.classList.remove("yellow");
			moduleName.classList.add("red");
		
			document.getElementById("moduleOwner").innerText = "Invalid module.";
			moduleIcon.src = "https://i.imgur.com/v4Iurtp.png";
		
			cooldownText.remove();
			redirectButton.remove();
		}
		finally {
			document.getElementById("moduleInfo").classList.remove("hidden")
		}

	}

	moduleSearch.onkeyup = () => {  
		updateModuleList(getMatchedModules(moduleSearch.value.replace(/\s+/g, "")))
	}

}
