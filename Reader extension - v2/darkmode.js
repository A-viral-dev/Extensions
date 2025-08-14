// darkmode.js
console.log("Dark mode script loaded");
chrome.storage.local.get('enabled', ({ enabled }) => {
    let darkModeEnabled = false;

    const darkModeStyles = document.createElement("style");
    darkModeStyles.id = "dark-mode-styles";
    darkModeStyles.textContent = `
    body, body *:not(#my-extension-panel):not(#my-extension-panel *) {
        background-color: #2b3337 !important;  /* Dark grey */
        color: #d1d5db !important;            /* Light grey text */
    }
    a {
        color: #93c5fd !important; /* Soft blue links */
    }
    img {
        filter: brightness(0.85);
    }
    #my-extension-panel {
        background-color: white !important;
        color: black !important;
    }
`;

    const darkModeToggle = document.createElement("button");
    darkModeToggle.textContent = "🌙 Dark Mode";
    darkModeToggle.style.position = "fixed";
    darkModeToggle.style.bottom = "20px";
    darkModeToggle.style.right = "20px";
    darkModeToggle.style.padding = "10px 15px";
    darkModeToggle.style.border = "none";
    darkModeToggle.style.borderRadius = "5px";
    darkModeToggle.style.backgroundColor = "#333";
    darkModeToggle.style.color = "white";
    darkModeToggle.style.cursor = "pointer";
    darkModeToggle.style.zIndex = "999999";

    darkModeToggle.addEventListener("click", () => {
        if (!enabled) {
            alert("Extension is OFF. Turn it ON to enable Dark Mode.");
            return;
        }

        darkModeEnabled = !darkModeEnabled;
        if (darkModeEnabled) {
            document.head.appendChild(darkModeStyles);
            darkModeToggle.textContent = "☀️ Light Mode";
        } else {
            const existing = document.getElementById("dark-mode-styles");
            if (existing) existing.remove();
            darkModeToggle.textContent = "🌙 Dark Mode";
        }
    });

   if (document.body) {
    document.body.appendChild(darkModeToggle);
} else {
    document.addEventListener("DOMContentLoaded", () => {
        document.body.appendChild(darkModeToggle);
    });
}
});
