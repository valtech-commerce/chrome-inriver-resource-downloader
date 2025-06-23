# Browser extension: inRiver Resource Downloader

## Installation
## From the addons store
### Mozilla Firefox

You can find it [here](https://addons.mozilla.org/en-CA/firefox/addon/inriver-resource-downloader/) 

### From source code
> [!IMPORTANT]
> You won't receive updates automatically with this method. You will need to refresh files yourself **and** reload the extension.

#### Google Chrome
To install, download the source folder on your local drive. Then, add the extension to Chrome [chrome://extensions/](chrome://extensions/):
1. Activate the developer mode checkbox.
2. Load the unpacked extension from the source folder. 

The extension needs to stay in the folder. It will stop working if it's moved or deleted.

#### Chromium-based browser (Microsoft Edge, Opera, Brave, ...)

The steps are the same as [Google Chrome](#google-chrome) except that the quick url we provide, to where to install the extension, is specific for your browser.

See the table below to know what URL to use instead of [chrome://extensions/](chrome://extensions/):

| Browser  | URL |
| ------------- | ------------- |
| Microsoft Edge  | [edge://extensions/](edge://extensions/)  |
| Opera  | [opera://extensions/](opera://extensions/)  |
| Brave | [brave://extensions/](brave://extensions/) |

For other browsers, search for how to install an extension as a developer in your browser documentation.

#### Firefox
> [!IMPORTANT]
> Currently, It isn't possible to permanently install it this way. 

1. To install, download the source folder on your local drive.
2. Then follow the Firefox [Loading a temporary extension](https://firefox-source-docs.mozilla.org/devtools-user/about_colon_debugging/index.html#loading-a-temporary-extension) page instruction.
   - When requested, select the `manifest.json` in the downloaded source folder.

## Prerequisite
The extension uses the title attribute of the entity card as the filename for the download in inriver. This is the Display Name of the entity. So, you will get better results if you set the ResourceFilename field as the Display Name.

## How to Use
### 1. List your inriver resources
To download resources, there must be resource entities in the workarea (it won't download main pictures for Products, Items, Tasks or other entities).

Only the resources that are loaded in the page (visible) will be downloaded. You can scroll to the end of the results to make sure that all the resources you want to download have been loaded on the page.

It can take a little while for your browser to start the download of all the resources.

The downloaded resource will be of the selected image configuration unless it is not one of these file types: jpg, jpeg, gif, png, tif, tiff. Then, the original image configuration will be downloaded (i.e.: a PDF file).

To download only a subset of the displayed resources, select them in the UI and check the "Selected only" option.

### 2. Configure & download
Find the extension icon ![inriver logo with an green arrow pointing down](source/icon48.png) in your browser toolbar and click on it.

A new popup will show up and you will be able to configure some limited options such as: a regular expression to sub-filter on your inriver resources or the inriver image configuration to download from.

When you are ready, click the `Start Download` button.

> ![IMPORTANT]
> Your browser may block downloads because it detected multiples download at the same time. Usually, if this happens, the browser will warn you and you will still be able to ask it to continue the operation.

> ![CAUTION]
> It can take some time before you see downloads starting.

## Notes
The extension is sort of a workaround and could stop working after an update if inRiver makes modifications that change the HTML markup of the workarea page.

You can add image configurations to download by adding options to the select element of the popup.html file.