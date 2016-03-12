function sendMsgToTab(msgObj, callback) {
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, msgObj);
	});
}

function turnOn() {
	chrome.browserAction.setTitle({
		title: 'Turn off upfront x-ray'
	})
	chrome.browserAction.setIcon({
		path: 'icons/icon-16-on.png'
	});
}

function turnOff() {
	chrome.browserAction.setTitle({
		title: 'Turn on upfront x-ray'
	})
	chrome.browserAction.setIcon({
		path: 'icons/icon-16-off.png'
	});
}

chrome.browserAction.onClicked.addListener(function (tab) {
	sendMsgToTab({
		action: 'addOrRemoveCSS',
		toggle: true
	});
});

chrome.tabs.onActivated.addListener(function (info) {
	turnOff();
	sendMsgToTab({
		action: 'addOrRemoveCSS',
		toggle: false
	});
});

chrome.tabs.onCreated.addListener(function (tab) {
	turnOff();
});

chrome.runtime.onMessage.addListener(function (req, sender, res) {
	if (req.status === 'on') {
		turnOn();
	}
	if (req.status === 'off') {
		turnOff();
	}
});
