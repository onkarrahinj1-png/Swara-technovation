// Default Initial Reviews
let reviews = JSON.parse(localStorage.getItem('swara_reviews')) || [
    { id: 1, name: "Amit Sharma", rating: "5", message: "Installed CCTV cameras at my shop. Great service and installation by Dinesh!" },
    { id: 2, name: "Rahul Verma", rating: "5", message: "Biometric attendance system working smoothly. Fast support by Onkar." }
];

let isAdmin = false;

// Render Reviews
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
            ${isAdmin ? `<button class="delete-btn" onclick="deleteReview(${review.id})">Delete</button>` : ''}
        `;
        container.appendChild(reviewDiv);
    });
}

// Add New Review
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

// Delete Review (Admin Only)
function deleteReview(id) {
    reviews = reviews.filter(r => r.id !== id);
    localStorage.setItem('swara_reviews', JSON.stringify(reviews));
    displayReviews();
}

// Toggle Admin Panel Mode
function toggleAdminPanel() {
    const adminPanel = document.getElementById('admin-panel');
    isAdmin = !isAdmin;
    
    if(isAdmin) {
        adminPanel.style.display = 'block';
        alert("Admin Mode Activated. You can now delete reviews or add team members.");
    } else {
        adminPanel.style.display = 'none';
    }
    displayReviews();
}

// Add New Employee dynamically
document.getElementById('add-employee-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('emp-name').value;
    const role = document.getElementById('emp-role').value;
    const empId = document.getElementById('emp-id').value;
    const img = document.getElementById('emp-img').value;

    const container = document.getElementById('engineers-container');
    const newCard = document.createElement('div');
    newCard.classList.add('team-card', 'engineer');

    newCard.innerHTML = `
        <img src="${img}" alt="${name}">
        <h4>${name.toUpperCase()}</h4>
        <p class="designation">${role}</p>
        <p class="id-no">ID No.: ${empId}</p>
    `;

    container.appendChild(newCard);
    this.reset();
    alert('New Employee added successfully!');
});

// Initial Load
displayReviews();
