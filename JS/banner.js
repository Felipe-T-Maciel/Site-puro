var slideIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.opacity = "0"; // Set opacity to 0 for all slides
    x[i].style.display = "none"; // Hide all slides
  }
  slideIndex++;
  if (slideIndex > x.length) {slideIndex = 1}
  x[slideIndex-1].style.display = "block"; // Show the current slide
  setTimeout(() => {
    x[slideIndex-1].style.opacity = "1"; // Fade in the current slide
  }, 50); // Small delay to trigger the transition
  setTimeout(carousel, 2000); // Change slide every 2 seconds
}