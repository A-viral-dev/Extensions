chrome.storage.local.get({ enabled: true }, (data) => {
    if (!data.enabled) {
        console.log("Extension is OFF — default script disabled");
        return;
    }

    function loadFont(fontName) {
        const formattedFont = fontName.replace(/ /g, "+");
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = `https://fonts.googleapis.com/css2?family=${formattedFont}:wght@400;700&display=swap`;
        document.head.appendChild(link);
    }

    // ===== Create Panel =====
    const panel = document.createElement("div");
    panel.id = "reader-settings-panel";
    panel.style.cssText = `
        position: fixed;
        top: 50px;
        right: 20px;
        width: 240px;
        background: #ffffff;
        border-radius: 10px;
        padding: 15px;
        z-index: 9999;
        display: none;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
        transform: translateY(-10px);
        opacity: 0;
    `;

    panel.innerHTML = `
        <label style="display:block;margin-bottom:5px;font-weight:bold;">Font:</label>
        <select id="font-selector" style="width:100%;margin-bottom:10px;padding:5px;border-radius:5px;border:1px solid #ccc;">
            <option value="Georgia">Georgia</option>
            <option value="Verdana">Verdana</option>
            <option value="Open Sans">Open Sans</option>
            <option value="Merriweather">Merriweather</option>
            <option value="Lato">Lato</option>
        </select>

        <label style="display:block;margin-bottom:5px;font-weight:bold;">Font Size:</label>
        <div style="display:flex;align-items:center;gap:5px;">
            <button id="increase-font" style="flex:1;">+</button>
            <span id="font-size-display" style="flex:1;text-align:center;">16px</span>
            <button id="decrease-font" style="flex:1;">-</button>
        </div>
    `;
    document.body.appendChild(panel);

    // ===== Font logic =====
    let currentFontSize = 16;
    let currentFont = "Georgia";

    function applyFontSettings() {
        try {
            const allElements = document.querySelectorAll("body *:not(#reader-settings-panel):not(#reader-settings-panel *)");

            if (allElements.length === 0) {
                console.warn("No elements found to apply font changes.");
                return { success: false, message: "No elements found to update" };
            }

            allElements.forEach(el => {
                el.style.setProperty("font-family", currentFont, "important");
                el.style.setProperty("font-size", currentFontSize + "px", "important");
            });

            // Reset panel font to default
            panel.style.fontSize = "";
            panel.style.fontFamily = "";

            console.log(`Font settings applied: ${currentFont}, ${currentFontSize}px`);
            return { success: true, message: `Applied font: ${currentFont}, size: ${currentFontSize}px` };

        } catch (err) {
            console.error("Error applying font settings:", err);
            return { success: false, message: "Error occurred while applying font settings" };
        }
    }

    // ===== Buttons Styling =====
    panel.querySelectorAll("button").forEach(btn => {
        btn.style.padding = "5px 10px";
        btn.style.border = "none";
        btn.style.background = "#4f46e5";
        btn.style.color = "white";
        btn.style.borderRadius = "5px";
        btn.style.cursor = "pointer";
        btn.style.transition = "background 0.3s";
        btn.addEventListener("mouseenter", () => btn.style.background = "#4338ca");
        btn.addEventListener("mouseleave", () => btn.style.background = "#4f46e5");
    });

    // ===== Font Size Change =====
    panel.querySelector("#increase-font").addEventListener("click", () => {
        currentFontSize += 2;
        panel.querySelector("#font-size-display").textContent = currentFontSize + "px";
        applyFontSettings();
    });

    panel.querySelector("#decrease-font").addEventListener("click", () => {
        currentFontSize -= 2;
        panel.querySelector("#font-size-display").textContent = currentFontSize + "px";
        applyFontSettings();
    });

    // ===== Font Change =====
    panel.querySelector("#font-selector").addEventListener("change", (e) => {
        loadFont(e.target.value);
        currentFont = e.target.value;
        applyFontSettings();
    });

    applyFontSettings();

    // ===== Show/Hide Animation =====
    function showPanel() {
        panel.style.display = "block";
        setTimeout(() => {
            panel.style.opacity = "1";
            panel.style.transform = "translateY(0)";
        }, 10);
    }

    function hidePanel() {
        panel.style.opacity = "0";
        panel.style.transform = "translateY(-10px)";
        setTimeout(() => {
            panel.style.display = "none";
        }, 300);
    }

    // ===== Click Toggle =====
    document.addEventListener("click", (event) => {
        if (panel.contains(event.target)) return;

        let el = event.target;
        while (el && el !== document.body) {
            if (el.tagName && el.tagName.toLowerCase() === "a") return;
            el = el.parentElement;
        }

        if (panel.style.display === "none") {
            showPanel();
        } else {
            hidePanel();
        }
    });
});
