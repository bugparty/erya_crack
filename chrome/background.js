
// http://heuet.tsk.erya100.com/flash/videoplay/flash_main.js?t=201204060226
 var Counter = (function(){
				var i = 0;
				return function(){ return ++i; }
			})();

chrome.webRequest.onBeforeRequest.addListener(
  function(info) {
    
    // Redirect the lolcal request to a random loldog URL.
	if(info.url.match(/flash\_main\.js/) ){
		console.log("url redirected: " + info.url);
		Counter();
		return {redirectUrl:"http://rawgithub.com/bugparty/erya_crack/master/flash_main.js" };
		}
		
	},
  // filters
  {
    urls: [
      "http://*.tsk.erya100.com/*"
    ],
  },
  // extraInfoSpec
  ["blocking"]
  );
 
