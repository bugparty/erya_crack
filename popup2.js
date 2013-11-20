var winBackgroundPage = chrome.extension.getBackgroundPage();
	if(winBackgroundPage)
		document.write("<h2>Replaced:" + winBackgroundPage.Counter()+"</h2>");
	else 
		document.write("<h2>Error</h2>");
