function modifyLocationMapLinks() {
  const locationSpan = Array.from(
    document.querySelectorAll("span.ynRLnc")
  ).find((span) => span.textContent.trim() === "Location:");

  // If the locationSpan is found (it won't be if the event doesn't have a location)
  if (locationSpan) {
    const parentDiv = locationSpan.parentElement;

    // Get the next sibling <div>
    const nextSiblingDiv = locationSpan.nextElementSibling;

    // Select the second internal <div> of this sibling <div>
    const targetDiv = nextSiblingDiv.querySelector("div:nth-child(2)");

    const locationContent = targetDiv.textContent.trim();

    // Add a click event listener directly to this <div>
    targetDiv.addEventListener("click", (event) => {
      event.stopPropagation();
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          locationContent
        )}`,
        "_blank"
      );
    });
  }
}

const observer = new MutationObserver((mutations, obs) => {
  // Loop through all mutations
  for (const mutation of mutations) {
    // Check for added nodes in each mutation record
    if (mutation.addedNodes.length) {
      const addedNodes = Array.from(mutation.addedNodes);
      // Check if any added node (or its descendants) is the specific <span>
      const locationSpanAdded = addedNodes.some(
        (node) =>
          node.nodeType === Node.ELEMENT_NODE &&
          ((node.classList.contains("ynRLnc") &&
            node.textContent.trim() === "Location:") ||
            node.querySelector("span.ynRLnc")?.textContent.trim() ===
              "Location:")
      );

      if (locationSpanAdded) {
        modifyLocationMapLinks();
        break;
      }
    }
  }
});

const config = { childList: true, subtree: true };
const targetNode = document.body;
observer.observe(targetNode, config);
