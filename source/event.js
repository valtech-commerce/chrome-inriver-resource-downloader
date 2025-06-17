// This function is called from the popup code
function downloadImages(tabId, config, callback) {
  chrome.scripting.executeScript({target: {tabId: tabId}, files: ["jquery-3.3.1.min.js"]}, function(){
      chrome.scripting.executeScript({target: {tabId: tabId}, files: ["content_script.js"]}, function(){
		  chrome.scripting.executeScript({target: {tabId: tabId}, func: config => { return fetchResources(config); }, args: [ config ]}, function(injectionResult){
      
		var result = injectionResult[0].result;
		var message = '';
		
		if(result.length > 0) {
			message =  'Downloading ' + result.length + ' resources...';
			for(var i = 0; i < result.length; i++) {
				chrome.downloads.download({
					url: result[i].url,
					filename: result[i].filename
				});
			}
		}
		else {
			message = 'There are no resource entities on this page.';
		}
		callback(message);
      });
    });
  });
};

chrome.runtime.onMessage.addListener(
	function(msg) {
			if(msg.type === 'inriverDownloadResources') {
					downloadImages(msg.tabId, msg.configuration, (progressionDescription) => {
						chrome.runtime.sendMessage({type: 'AbsolunetDownloadResourcesProgression', message: progressionDescription, requestId: msg.requestId});
					});
			}
	});