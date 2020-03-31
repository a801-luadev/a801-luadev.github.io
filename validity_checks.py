from urllib.request import Request, urlopen
import traceback
import json


searching = "*/\n"
with open("redirections.js", "r") as file:
	while True:
		line = file.readline()
		if line == "":
			raise Exception("redirections.js is not valid.")

		if line == searching:
			if searching == "*/\n":
				searching = "data = {\n"
			else:
				donations = json.loads("{" + file.read())
				break

module_list = urlopen("https://atelier801.com/topic?f=612619&t=933743&p=1").read()

def check_website(website, header=False):
	try:
		urlopen(Request(website, headers={"User-Agent": "Mozilla/5.0"} if header else {}))
	except Exception as exc:
		traceback.print_exc()
		return False
	return True

def check_user(data, field):
	if not check_website(f"https://cheese.formice.com/api/mouse/@{data[field].replace('#', '%23')}", True):
		raise Exception(f"#{module}'s {field} does not exist.")

for module, data in donations.items():
	if (f"#{module}<").encode() not in module_list:
		raise Exception(f"The module #{module} has not been found in the list.")

	if not check_website(data["url"]):
		raise Exception(f"#{module}'s donation link does not return a 200 status code.")

	check_user(data, "owner")
	if "host" in data:
		check_user(data, "host")

	if "icon" in data and not check_website(f"https://i.imgur.com/{data['icon']}.png"):
		raise Exception(f"#{module}'s icon is invalid.")
