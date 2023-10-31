"use strict";

//Variable declarations
const header = document.querySelector("header");
const nav = document.querySelector("nav");
const links = document.querySelectorAll("a");
const homeContent = document.querySelector("#home");
const section = document.querySelectorAll("section");

const hamburgerBtn = document.querySelector('.hamburger_sub-container');

let hamburger1, hamburger2, hamburger3
let open = true;

// simple helper functions
const addHamburgerMenu = function() {
  hamburger1.classList.add('add-row1');
  hamburger2.classList.add('add-row2');
  hamburger3.classList.add('add-row3');

  nav.classList.add('add-nav');
}
const removeHamburgerMenu = function() {
  hamburger1.classList.remove('add-row1');
  hamburger2.classList.remove('add-row2');
  hamburger3.classList.remove('add-row3');
  
  nav.classList.remove('add-nav');

}

// //Event handlers functionality
// // MOBILE NAV DISPLAY
hamburgerBtn.addEventListener('click', function(e) {
  hamburger1 = e.target.closest('.hamburger-container')?.querySelector('.row1');
  hamburger2 = e.target.closest('.hamburger-container').querySelector('.row2');
  hamburger3 = e.target.closest('.hamburger-container').querySelector('.row3');

  open ? addHamburgerMenu() : removeHamburgerMenu();
  open = !open;
  
  
})

// Faded nav links
header.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("nav-links")) {
    e.target
      .closest("nav")
      .querySelectorAll(".nav-links")
      .forEach((el) => {
        if (el !== e.target) el.classList.add("faded");
      });
  }
});
header.addEventListener("mouseout", function (e) {
  if (e.target.classList.contains("nav-links")) {
    e.target
      .closest("nav")
      .querySelectorAll(".nav-links")
      .forEach((el) => {
        if (el !== e.target) el.classList.remove("faded");
      });
  }
});
//Sticky navigation bar
const headerHeight = header.getBoundingClientRect().height;
const navObserverCallback = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const navObserver = new IntersectionObserver(navObserverCallback, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
});
navObserver.observe(homeContent);

// Linked nav with smooth scroll
header.addEventListener("click", function (e) {
  e.preventDefault();
  if (!e.target.classList.contains("nav-links")) return;

  const id = e.target.getAttribute("href");
  document.querySelector(id).scrollIntoView({ behavior: "smooth" });
});

//display on load
/**
 * using the IntersectionObserver ()
 *  when the target comes into the viewport at a specific threshold the observer fn calls its callback fn
 */
const pageObserverCallBack = function (entries) {
  const [entry] = entries;
  section.forEach((el) => {
    if (entry.isIntersecting) {
      el.style.opacity = 1;
    }
    // pageObserver.unobserve(el);
  });
};
const pageObserver = new IntersectionObserver(pageObserverCallBack, {
  root: null,
  threshold: 0.1,
});
section.forEach((el) => {
  el.style.opacity = 0;
  pageObserver.observe(el);
});

// DARK MODE IMPLEMENTATION (ON HOLD)
// const themeContainer = document.querySelector(".theme-container");
// const iconContainer = document.querySelector(".mode-icon");
// const themeIcon = document.querySelector(".icon");

// themeIcon.addEventListener("click", function (e) {
//   const attr = e.target.dataset.icons;
//   console.dir(e.target);
//   e.target.setAttribute('src', attr);
// });

// slider
/**
 * select all the images and align them horizontally
 * use transform translate(X) and align them based on 100px width
 * set the navigator arrows left and right
 * onClick img @ position should translate(X) by 100px
 */
// const portfolioContainer = document.querySelector(".works-container");
// const leftArrow = "←";
// const rightArrow = "→";

// const navigators = `
// <div class="navigators hidden">
//     <div class="left-arrow"> ${leftArrow} </div>
//     <div class="left-arrow"> ${rightArrow} </div>
// </div>
// `;

// console.log(rightArrow, leftArrow);

// inserting navigators into document
// portfolioContainer.insertAdjacentHTML("afterbegin", navigators);

/**
 * implementing functionality based on viewport
 * using intersectionObserver api
 * get the viewport with max-width: 500px
 * if so implement functionality else ignore / return
 */

// const navigators = document.querySelector('.navigators');

// const fn = (entries) => {
//   const [entry] = entries;
//   if(!entry.isIntersecting) navigators.classList.add('hidden');

//   navigators.classList.remove('hidden');
// };
// const viewPortObserver = new IntersectionObserver(fn, {
//   root: null,
//   threshold: 0.1,
// });
// viewPortObserver.observe(portfolioContainer);

// Intersection observer for header on scroll
// window.addEventListener('scrollend', function(e) {
//   console.log('hi');
//   homeContent.style.backgroundColor = 'purple';
//   header.style.backgroundColor = 'purple';
// })

