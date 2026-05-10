window.MathJax = {
    tex: {
        inlineMath: [["$", "$"], ["\\(", "\\)"]],
        displayMath: [["$$", "$$"], ["\\[", "\\]"]],
        processEscapes: true
    },
    svg: {
        fontCache: "global"
    }
};

document.addEventListener("DOMContentLoaded", () => {
    for (const button of document.querySelectorAll("[data-section-action]")) {
        button.addEventListener("click", () => {
            const shouldOpen = button.dataset.sectionAction === "expand";
            for (const section of document.querySelectorAll(".collapsible-section")) {
                section.open = shouldOpen;
            }
        });
    }

    document.querySelectorAll("[data-force-download]").forEach((link) => {
        link.addEventListener("click", async (event) => {
            event.preventDefault();

            const url = link.getAttribute("href");
            const filename = link.getAttribute("download") || url.split("/").pop();

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Download failed: ${response.status}`);
                }

                const blob = await response.blob();
                const blobUrl = URL.createObjectURL(blob);
                const downloadLink = document.createElement("a");

                downloadLink.href = blobUrl;
                downloadLink.download = filename;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                downloadLink.remove();
                URL.revokeObjectURL(blobUrl);
            } catch (error) {
                window.location.href = url;
            }
        });
    });
});
