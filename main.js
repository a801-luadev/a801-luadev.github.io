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
			matches[name] = name.match(new RegExp(query, "gi") || []).length;			
		}
	}
	return Object.entries(matches).sort((e1, e2) => e2[1] - e1[1]);
}

let updateModuleList = function(list) {
	
	moduleList.innerHTML = "<tr><th>Module</th><th>Owner</th><th>Host</th></tr>";

	for (let mData of list) {
		let name = mData[0];
		moduleList.innerHTML += `<tr>
			<td>${name}</td>
			<td>${data[name].owner}</td>
			<td>${data[name].host || data[name].owner}</td>
		</tr>`
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
		for (let name of Object.keys(data)) {
			moduleList.innerHTML += `<tr>
				<td>${name}</td>
				<td>${data[name].owner}</td>
				<td>${data[name].host || data[name].owner}</td>
			</tr>`
		}


	} else {

		try {
			let moduleData = document.location.search.match(/[?&]redirect=(\w+)/i)[1].toLocaleLowerCase();
			if (!(data.hasOwnProperty(moduleData))) throw null;
		
			document.title = "Redirecting to #" + moduleData;
		
			moduleName.innerText = moduleData;
			moduleData = data[moduleData];
			document.getElementById("owner").innerText = moduleData.owner;
			if (moduleData.hasOwnProperty("icon")) moduleIcon.src = `https://i.imgur.com/${moduleData.icon}.png`;
		
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
		console.log(moduleSearch.value.replace(/\s+/g, ""))
		updateModuleList(getMatchedModules(moduleSearch.value.replace(/\s+/g, "")))
	}

}