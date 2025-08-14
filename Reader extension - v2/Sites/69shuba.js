chrome.storage.local.get({ enabled: true }, (data) => {
    if (!data.enabled) {
        console.log("Reader extension is OFF — skipping modifications");
        return;
    }

console.log("Running 69shuba.com reader cleanup");

// === Remove Google Translate tooltip ===
const removeTranslateTooltip = () => {
    const tt = document.querySelector('#goog-gt-tt');
    if (tt) {
        tt.remove();
        console.log("Removed #goog-gt-tt");
    }
};
removeTranslateTooltip();
new MutationObserver(removeTranslateTooltip).observe(document.body, { childList: true, subtree: true });

// === Navigation cleanup ===
const bookmarkLink = document.querySelector('.page1 #a_addbookcase');
if (bookmarkLink) {
    bookmarkLink.remove();
    console.log("Removed Bookmarks link");
}

const tocLink = document.querySelector('.page1 a[title]');
if (tocLink) {
    tocLink.textContent = "≡";
    console.log("Changed Table of Contents text to ≡");
}

// === Chapter content cleanup ===
const mainContent = document.querySelector('.mybox');
const navLinks = document.querySelector('.page1');

if (mainContent && navLinks) {
    // Remove unwanted elements
    ['h3.mytitle', '.tools', '.top_Scroll', '#baocuo'].forEach(sel => {
        const el = mainContent.querySelector(sel);
        if (el) el.remove();
    });

    // Clone navigation for top placement
    const topNavLinks = navLinks.cloneNode(true);

    // Clear page content
    document.body.innerHTML = '';
    document.head.innerHTML = '';

    // Add clean styles
    const style = document.createElement('style');
    style.textContent = `
        body {
            font-family: Georgia, serif;
            line-height: 1.6;
            background-color: #f5f5f5;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .mybox, .page1 {
            max-width: 800px;
            margin: 20px auto;
            padding: 2em;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .page1 {
            text-align: center;
            padding: 1em;
        }
        .page1 a {
            margin: 0 20px;
            text-decoration: none;
            color: #0056b3;
            font-weight: bold;
            font-size: 1.1em;
        }
    `;
    document.head.appendChild(style);

    // Append layout
    document.body.appendChild(topNavLinks);
    document.body.appendChild(mainContent);
} else {
    console.warn("Could not find required chapter elements on this page.");
}
})
