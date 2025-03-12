document.addEventListener("DOMContentLoaded", function () {
    loadReviews();
    generateStars(); // Generar estrellas al cargar la página
    document.getElementById("reviewForm").addEventListener("submit",
        function (event) {
            event.preventDefault();
            let title = document.getElementById("bookTitle").value.trim();
            let author = document.getElementById("bookAuthor").value.trim();
            let review = document.getElementById("bookReview").value.trim();
            let rating =
                document.querySelector("#ratingStars .selected")?.getAttribute("datavalue") || 0;
            if (title && author && review) {
                let newReview = { title, author, review, rating };
                let reviews = JSON.parse(localStorage.getItem("bookReviews")) ||
                    [];
                reviews.push(newReview);
                localStorage.setItem("bookReviews", JSON.stringify(reviews));
                document.getElementById("reviewForm").reset();
                resetStars(); // Reiniciar estrellas
                loadReviews();
            }
        });
});

function generateStars() {
    let starsContainer = document.getElementById("ratingStars");
    starsContainer.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
        let star = document.createElement("span");
        star.innerHTML = `<svg width="30" height="30" viewBox="0 0 24 24"
fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
stroke-linejoin="round" class="feather feather-star">
<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18
21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
</svg>`;
        star.classList.add("star");
        star.setAttribute("data-value", i);
        star.addEventListener("click", function () {
            selectRating(i);
        });
        starsContainer.appendChild(star);
    }
}
function selectRating(rating) {
    let stars = document.querySelectorAll("#ratingStars .star svg");
    stars.forEach((star, index) => {
        if (index < rating) {
            star.style.fill = "gold";
        } else {
            star.style.fill = "none";
        }
    });
    // Marcar la estrella seleccionada
    document.querySelectorAll("#ratingStars .star").forEach(star => {
        star.classList.remove("selected");
    });
    document.querySelector(`#ratingStars .star:nth-child($
{rating})`).classList.add("selected");
}

function resetStars() {
    document.querySelectorAll("#ratingStars .star svg").forEach(star => {
        star.style.fill = "none";
    });
}
function loadReviews() {
    let reviewsList = document.getElementById("reviewsList");
    reviewsList.innerHTML = "";
    let reviews = JSON.parse(localStorage.getItem("bookReviews")) || [];
    reviews.forEach((review, index) => {
        let li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = `<strong>${review.title}</strong> de $
    {review.author}<br>${review.review}<br>
    <span>Calificación: ${generateStarSVG(review.rating)}</span>
    <button class="btn btn-danger btn-sm float-end"
    onclick="deleteReview(${index})"><i class="bi
    bi-trash"></i>Eliminar</button>`;
        reviewsList.appendChild(li);
    });
}
function generateStarSVG(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
        stars += `<svg width="20" height="20" viewBox="0 0 24 24" fill="${i
            <= rating ? 'gold' : 'none'}" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round" class="feather featherstar">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12
    17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>`;
    }
    return stars;
}

function deleteReview(index) {
    let reviews = JSON.parse(localStorage.getItem("bookReviews")) || [];
    reviews.splice(index, 1);
    localStorage.setItem("bookReviews", JSON.stringify(reviews));
    loadReviews();
}