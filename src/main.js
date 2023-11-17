const locationSpan = Array.from(document.querySelectorAll("span.ynRLnc")).find(
  (span) => span.textContent.trim() === "Location:"
);

// If the locationSpan is found
if (locationSpan) {
  const parentDiv = locationSpan.parentElement;

  // Get the next sibling <div>
  const nextSiblingDiv = locationSpan.nextElementSibling;

  // Select the second internal <div> of this sibling <div>
  const targetDiv = nextSiblingDiv.querySelector("div:nth-child(2)");

  const locationContent = targetDiv.textContent.trim();

  // Add a click event listener directly to this <div>
  targetDiv.addEventListener("click", (event) => {
    event.preventDefault();
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        locationContent
      )}`,
      "_blank"
    );
  });
} else {
  console.log("Could not find locationSpan");
}
