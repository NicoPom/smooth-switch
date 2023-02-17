import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import "./style.css";

gsap.registerPlugin(Flip);

const mainContainer = document.querySelector(".main-container");
const switchContainer = document.querySelector(".switch-container");
const highlight = document.querySelector(".highlight");
const switches = switchContainer.querySelectorAll(".switch");
const firstSwitch = switches[0];

//
gsap.set(switchContainer, {
  width: firstSwitch.offsetWidth + "px",
  overflow: "hidden",
  translate: 0,
});

mainContainer.addEventListener("mouseenter", () => {
  gsap.to(mainContainer, { maxWidth: "100%", duration: 0.5 });
  gsap.to(switchContainer, {
    width: "100%",
    overflow: "hidden",
    translate: 0,
    duration: 0.5,
  });
});

mainContainer.addEventListener("mouseleave", () => {
  const selectedSwitch = switchContainer.querySelector(".selected");
  const targetSwitch = selectedSwitch || firstSwitch;
  gsap.to(switchContainer, {
    width: targetSwitch.offsetWidth + "px",
    duration: 0.3,
  });
});

switchContainer.addEventListener("mouseover", (event) => {
  const switchEl = event.target.closest(".switch");
  if (!switchEl) return;

  const highlightState = Flip.getState(highlight);
  switchEl.appendChild(highlight);
  Flip.from(highlightState, { duration: 0.3 });

  switches.forEach((el) => el.classList.remove("highlighted"));
  switchEl.classList.add("highlighted");
});

switchContainer.addEventListener("click", (event) => {
  const switchEl = event.target.closest(".switch");
  if (!switchEl) return;

  switches.forEach((el) => el.classList.remove("selected"));
  switchEl.classList.add("selected");

  gsap.to(switchContainer, {
    overflow: "visible",
    translate: -switchEl.offsetLeft + "px",
    width: switchEl.offsetWidth + "px",
    duration: 0.3,
  });
});
