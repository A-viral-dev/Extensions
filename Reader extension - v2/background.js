chrome.action.onClicked.addListener(async (tab) => {
    let { enabled } = await chrome.storage.local.get({ enabled: true });
    enabled = !enabled; // Toggle
    await chrome.storage.local.set({ enabled });

    chrome.action.setBadgeText({ text: enabled ? "ON" : "OFF" });
    chrome.action.setBadgeBackgroundColor({ color: enabled ? "green" : "red" });

    // Reload current page so changes apply immediately
    if (tab.id) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => location.reload()
        });
    }
});
