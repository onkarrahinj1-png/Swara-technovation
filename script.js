let reviews = JSON.parse(localStorage.getItem('swara_reviews')) || [
    { id: 1, name: "Amit Sharma", rating: "5", message: "Installed CCTV cameras at my shop. Excellent service!" },
    { id: 2, name: "Rahul Verma", rating: "5", message: "Biometric attendance system working smoothly. Fast support by engineers." }
];

function displayReviews() {
    const container = document.getElementById('reviewsContainer');
    container.innerHTML = '';

    reviews.forEach(review => {
        const reviewDiv = document.createElement('div');
        reviewDiv.classList.add('review-item');

        let stars = "⭐".repeat(parseInt(review.rating));

        reviewDiv.innerHTML = `
            <h4>${review.name} <span style="font-size: 12px; color: #f39c12;">${stars}</span></h4>
            <p>${review.message}</p>
        `;
        container.appendChild(reviewDiv);
    });
}

document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('userName').value;
    const rating = document.getElementById('userRating').value;
    const message = document.getElementById('userMessage').value;

    const newReview = {
        id: Date.now(),
        name: name,
        rating: rating,
        message: message
    };

    reviews.push(newReview);
    localStorage.setItem('swara_reviews', JSON.stringify(reviews));
    displayReviews();
    this.reset();
    alert('Thank you for your feedback!');
});

displayReviews();
