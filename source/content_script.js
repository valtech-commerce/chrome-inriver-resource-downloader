var regexPictureUrl = /^(.*\/api\/assetstorage\/.*\/)[^\/]+$/;
var regexSupportedImageConfigs = /.*\.(jpg|jpeg|gif|png|tif|tiff)/i;
  
var resources = [];
var filenames = [];

// Loop all resource cards. Need to update if inRiver changes HTML structure of workareas
$("div[entity-type-id='Resource']"+ (scriptOptions.selectedOnly ? ".card-selected" : "")).each(function(){
  var resourceDom = $(this).find('img.card-picture');
  if (resourceDom === undefined) {
		console.error("Unable to find the inriver card-picture tags. Script is likely too old to work.");	  
	
		return false;
  }
  
  var parsedUrl = resourceDom.attr('src').match(regexPictureUrl);
  var resourceFilename = resourceDom.attr("title");
  var config = "Original";
  
  if(resourceFilename.match(regexSupportedImageConfigs)) {
    config = scriptOptions.imageConfig;
  }
  
  if (parsedUrl != undefined && parsedUrl.length > 0) {
	  var resource = {
		url: parsedUrl[1] + config,
		filename: resourceFilename
	  };
	  
	  if(!filenames.includes(resource.filename)) {
		filenames.push(resource.filename);
		resources.push(resource);
	  }
  }
  else {
	  console.log("Skipping resource "+ resourceFilename +" ("+ resourceUrl +") because the pattern did not match");
  }
});

resources;