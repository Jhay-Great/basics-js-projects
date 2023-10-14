"use strict";

// declaring variables
const play = document.querySelector(".play");
const restart = document.querySelector(".restart");
const hand = document.querySelector(".hand");

// container variables
const controlContainer = document.querySelector(".control-btns");
const wheel = document.querySelector(".wheel");

// Generals
// const colors = [
//   { red: `rgb(255, 0, ,0)` },
//   { green: `rgb(0, 255, ,0)` },
//   { blue: `rgb(0, 0, ,255)` },
//   { yellow: `rgb(255, 255, ,0)` },
// ];

const red = `rgb(255, 0, ,0)`;
const green = `rgb(0, 255, ,0)`;
const blue = `rgb(0, 0, ,255)`;
const yellow = `rgb(255, 255, ,0)`;

const colors = [red, green, blue, yellow];

// hand.style.borderColor = "red";
// console.log(colors[Math.trunc(Math.random() * colors.length)]);

// Functionalities

const generateRandomNumber = (data) =>
  data[Math.trunc(Math.random() * data.length)];
generateRandomNumber(colors);

// Event listeners
play.addEventListener("click", function (e) {
  e.preventDefault();

  //   functionality
  hand.classList.add("rotate-animated");
  hand.style.borderColor = generateRandomNumber(colors);
//   console.dir(hand);

  //   hidden play button
  e.target.classList.add("hidden");

  //   adding click button
  const markup = ` <button class="click"> Click </button> `;
  controlContainer.insertAdjacentHTML("beforeend", markup);
});

// Restart event
restart.addEventListener("click", function (e) {
  e.preventDefault();

  const click = e.target.closest(".control-btns").querySelector(".click");
  click?.remove();
  play.classList.remove("hidden");
  hand.classList.remove("rotate-animated");
  hand.classList.remove("reverse-rotate-animated");
  hand.style.borderColor = " ";
});

// Click event listener
controlContainer.addEventListener("click", function (e) {
  if (!e.target.classList.contains("click")) return;

  hand.style.borderColor = generateRandomNumber(colors);
  hand.classList.toggle("rotate-animated");
  hand.classList.toggle("reverse-rotate-animated");

  //   application logic
  /**
   * GETTING WHEEL BORDER COLOR
   * window.getComputedStyle(wheel, null).getPropertyValue("border-top-color")
   *
   * GETTING HAND BORDER COLOR
   * window.getComputedStyle(hand, null).getPropertyValue('border-color');
   */

  const coords = ["top", "left", "bottom", "right"];

  const wheelComputedColor = coords.map((coord) => {
    return window
      .getComputedStyle(wheel, null)
      .getPropertyValue(`border-${coord}-color`);
  });

  const handComputedColor = window
    .getComputedStyle(wheel, null)
    .getPropertyValue(`border-color`);

  if (!wheelComputedColor === handComputedColor) console.log("false");
  //   console.log("true");
  //   console.log(wheel.style.borderTopColor);
});

// const coords = ["top", "left", "bottom", "right"];

// const computedColor = coords.map((coord) => {
//   return window
//     .getComputedStyle(wheel, null)
//     .getPropertyValue(`border-${coord}-color`);
// });

// console.log(computedColor);

/**
 * task to do
 *  the direction of movement
 *  if clicked and click is correct
 *      change direction of movement (movement === clockwise ? anticlockwise : clockwise )
 *
 * logic
 * we can get the angle or distance of each border
 * when hand is within that angle or range, log true when true, false when false
 *
 * manual calculations of angles
 * red: 315 - 45deg
 * yellow: 46 - 135deg
 * blue: 136 - 225
 * green: 226 - 315deg
 *
 * **Math.atan2() is used to get the angle between two points (y, x)
 * **getBoundingClientRect() to get coords of an element
 *
 */

console.log(wheel.getBoundingClientRect());
const coords = wheel.getBoundingClientRect();
const x = coords.left;
const y = coords.top;
const y2 = coords.bottom;

// console.log(Math.atan2(y, x) * (180 / Math.PI));
// console.dir(hand);

/**
 * functionality
 * hand rotates with a specific color
 * hand is filled with a random color from the color section (object)
 * if hand in rotation is within that color range of the circle
 *  if click then color change, game still continues
 *  if no click then game ends, number of clicks is displayed as score
 *  option to play again
 */

/**
 *
 * using intersectionObserver
 * check if hand is intersecting with wheel.top
 *
 * IntersectionObserver does not work, since you can't get the angle
 */

const fn = function (entries) {
  const [entry] = entries;
  console.log(entry);
  console.log(entry.target);
};

const op = {
  root: wheel,
  threshold: 0,
};
const handObserver = new IntersectionObserver(fn, op);
handObserver.observe(hand);
