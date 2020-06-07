// Documentation: https://developer.chrome.com/apps/contextMenus
chrome.contextMenus.create({ 
    id: 'SandboxTimer',
    title: 'Start Timer',
    contexts: ['all']
  });


chrome.contextMenus.onClicked.addListener(
    function(tab) {
      chrome.windows.create({
        url: chrome.runtime.getURL("index.html"),
        type: "popup",
        width: 300,
        height: 300
      })
});
