

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

  
  const singlePlan = document.getElementById("singlePlan");
  const doublePlan = document.getElementById("doublePlan");

  const singleContent = document.getElementById("singleContent");
  const doubleContent = document.getElementById("doubleContent");
  const featuresList = document.getElementById("featuresList");

  singlePlan.addEventListener("change", () => {
    singleContent.style.display = "block";
    doubleContent.style.display = "none";
    featuresList.style.display = "block";   
  });

  doublePlan.addEventListener("change", () => {
    singleContent.style.display = "none";
    doubleContent.style.display = "block";
    featuresList.style.display = "none";   
  });

  /* ======================
 PRODUCT IMAGE GALLERY
====================== */

const galleryImages = [
  "assets/pink.jpeg",
  "assets/img 1.jpeg",
  "assets/img 2.jpeg",
  "assets/img 3.jpeg",
  "assets/img 4.jpeg"
];

let currentIndex = 0;

const mainImg = document.querySelector(".main-image img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dots = document.querySelectorAll(".dots span");
const thumbs = document.querySelectorAll(".thumbnails img");

function updateGallery(index) {
  currentIndex = index;
  mainImg.src = galleryImages[currentIndex];

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

prevBtn.addEventListener("click", () => {
  updateGallery((currentIndex - 1 + galleryImages.length) % galleryImages.length);
});

nextBtn.addEventListener("click", () => {
  updateGallery((currentIndex + 1) % galleryImages.length);
});

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => updateGallery(i));
});

thumbs.forEach((thumb, i) => {
  thumb.addEventListener("click", () => updateGallery(i + 1));
});


/* ======================
 FRAGRANCE SELECTION
====================== */

let fragrance1 = "Original";
let fragrance2 = "Original";

document.querySelectorAll(".fragrance-options").forEach((group, index) => {
  const items = group.querySelectorAll(".fragrance-item");

  items.forEach(item => {
    item.addEventListener("click", () => {
      items.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      const selected = item.querySelector("p").innerText;

      if (index === 0) fragrance1 = selected;
      if (index === 1) fragrance2 = selected;

      updateAddToCartLink();
    });
  });
});


/* ======================
 ADD TO CART LINK
====================== */

const addToCartBtn = document.querySelector(".btn-primary.full");

function updateAddToCartLink() {
  const plan = singlePlan.checked ? "single" : "double";

  let link = `https://example.com/cart?plan=${plan}&f1=${fragrance1}`;

  if (plan === "double") {
    link += `&f2=${fragrance2}`;
  }

  addToCartBtn.onclick = () => {
    window.location.href = link;
  };
}

updateAddToCartLink();


  const counters = document.querySelectorAll(".counter");
let started = false;

function startCounting() {
  counters.forEach(counter => {
    const target = +counter.dataset.target;
    let count = 0;
    const speed = 200; // lower = faster

    const updateCount = () => {
      const increment = Math.ceil(target / speed);
      count += increment;

      if (count < target) {
        counter.innerText = count;
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
}

// Trigger when section enters viewport
const statsSection = document.getElementById("stats");

const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !started) {
    started = true;
    startCounting();
  }
}, { threshold: 0.4 });

observer.observe(statsSection);
