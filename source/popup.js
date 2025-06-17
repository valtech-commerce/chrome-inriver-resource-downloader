function onPageDetailsReceived(results) {
  document.getElementById('results').innerText = results;
}

var _requestId = 1;

/**
 * Get the current URL.
 *
 * @param {function(string)} callback called when the URL of the current tab
 *   is found.
 */
function getCurrentTab(callback) {
  // Query filter to be passed to chrome.tabs.query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
	if(tabs === undefined) {
		return;
	}

    callback(tabs[0]);
  });
}

/**
 * Download resources of the current tab.
 *
 * @param {string} config The configurations to download the resources.
 */
 
async function downloadResources(config) {
	getCurrentTab(tab => {
		chrome.runtime.sendMessage({type: 'inriverDownloadResources', configuration: config, requestId: ++_requestId, tabId: tab.id });
	});
}

chrome.runtime.onMessage.addListener(
	function(msg) {
		if(msg.type === 'inriverDownloadResourcesProgression') {
			if(msg.requestId !== _requestId) {
				return;
			}
			var resultsDom = document.getElementById('results');
			if(resultsDom) {
				resultsDom.innerHTML = msg.message;
			}
		}
	});

document.addEventListener('DOMContentLoaded', () => {
    var selectedOnly = document.getElementById('selected-only');
    var dropdown = document.getElementById('image-configuration');
    var downloadButton = document.getElementById('download-button');
  
    downloadButton.addEventListener('click', () => {
      downloadButton.disabled = true;
      downloadResources({imageConfig:dropdown.value, selectedOnly:selectedOnly.checked, imageFileNameRegex: document.getElementById('image-filename-regex').value});
    });
	
	dropdown.addEventListener('change', function() {
		var [selectedOption] = this.selectedOptions;
		if (selectedOption === undefined) {
			return;
		}
		
		document.getElementById('image-configuration-custom-input').style.display = selectedOption.id === 'image-configuration-custom-option' ? 'block' : 'none';
	});
	
	document.getElementById('image-configuration-custom-input')
		.addEventListener('change', function() {		
			document.getElementById('image-configuration-custom-option').value = this.value;
		});	
});
