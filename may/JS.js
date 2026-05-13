//technicians page


const reviewsBox = document.getElementById("reviewsBox");
const nextReview = document.getElementById("nextReview");
const prevReview = document.getElementById("prevReview");

nextReview.addEventListener("click", function() {
reviewsBox.scrollBy({
left: 280,
behavior: "smooth"
});
});

prevReview.addEventListener("click", function() {
reviewsBox.scrollBy({
left: -280,
behavior: "smooth"
});
});
