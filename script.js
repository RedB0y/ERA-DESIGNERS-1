const navToggle = document.getElementById("nav-toggle");
const nav = document.getElementById("site-nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    navToggle.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle.classList.remove("open");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal--in");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));

const loader = document.getElementById("page-loader");
const loaderPercent = document.getElementById("loader-percent");

if (loader && loaderPercent) {
  const hasLoaded = sessionStorage.getItem("era_loaded") === "true";

  if (hasLoaded) {
    loader.remove();
    document.body.classList.remove("loading");
    document.body.classList.add("loaded");
  } else {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 6) + 3;
      if (progress >= 100) {
        progress = 100;
        loaderPercent.textContent = "100%";
        clearInterval(interval);
        loader.classList.add("complete");
        document.body.classList.remove("loading");
        document.body.classList.add("loaded");
        sessionStorage.setItem("era_loaded", "true");
        setTimeout(() => {
          loader.remove();
        }, 650);
        return;
      }
      loaderPercent.textContent = `${progress}%`;
    }, 60);
  }
}
