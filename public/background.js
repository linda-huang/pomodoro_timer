
/*global chrome*/
// Documentation: https://developer.chrome.com/apps/contextMenus


chrome.contextMenus.create({ 
    id: 'PawmodoroTimer',
    title: 'Start Timer',
    contexts: ['all']
  });


chrome.contextMenus.onClicked.addListener(
    function(tab) {
      chrome.windows.create({
        url: chrome.runtime.getURL("index.html"),
        type: "popup",
        height: 360,
        width: 300,
      })

});



/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.window.html
 */

/*chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    id: 'main',
    'innerBounds': {
      'width': 400,
      'height': 500
    }
  });
});*/

/*chrome.contextMenus.onClicked.addListener(
  function() {
    chrome.app.window.create('index.html', {
      id: 'main',
      'innerBounds': {
        'width': 400,
        'height': 500
      }
    }); 
});*/