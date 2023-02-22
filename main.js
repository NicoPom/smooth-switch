import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import "./style.css";

gsap.registerPlugin(Flip);

// Select DOM elements
const mainContainer = document.querySelector(".main-container");
const switchContainer = document.querySelector(".switch-container");
const switchWrapper = document.querySelector(".switch-wrapper");
const highlight = document.querySelector(".highlight");
const switches = Array.from(switchContainer.querySelectorAll(".switch"));

// Event listeners
mainContainer.addEventListener("mouseenter", expandSwitchContainer);
mainContainer.addEventListener("mouseleave", contractSwitchContainer);

switchContainer.addEventListener("mouseover", (event) => {
  const switchEl = event.target.closest(".switch");
  if (!switchEl) return;

  highlightSwitch(switchEl);
});

switchContainer.addEventListener("click", (event) => {
  const switchEl = event.target.closest(".switch");
  if (!switchEl) return;

  selectSwitch(switchEl);
  contractSwitchContainer();
});

// Store the currently active switch
let activeSwitch = switches[0];

// Set initial state of switch container
const initialSwitchContainerState = {
  width: `${activeSwitch.offsetWidth}px`,
  overflow: "hidden",
  translate: 0,
};
gsap.set(switchContainer, initialSwitchContainerState);

//Expand switch container on mouse enter
const expandSwitchContainer = () => {
  gsap.to(switchContainer, {
    width: "210px",
    overflow: "hidden",
    duration: 0.3,
  });
  gsap.to(switchWrapper, { width: "210px", translate: 0, duration: 0.3 });
};

// Contract switch container on mouse leave
const contractSwitchContainer = () => {
  const selectedSwitch =
    switchContainer.querySelector(".selected") || activeSwitch;
  const targetWidth = `${selectedSwitch.offsetWidth}px`;

  gsap.to(switchContainer, {
    width: targetWidth,
    duration: 0.3,
  });

  // flip highlight back to active switch
  highlightSwitch(activeSwitch);
  const targetTranslate = `${-activeSwitch.offsetLeft}px`;

  gsap.to(switchWrapper, {
    translate: targetTranslate,

    duration: 0.3,
  });
};

// Highlight switch on mouse over
const highlightSwitch = (switchEl) => {
  const highlightState = Flip.getState(highlight);
  switchEl.appendChild(highlight);
  Flip.from(highlightState, { duration: 0.3 });

  switches.forEach((el) => el.classList.remove("highlighted"));
  switchEl.classList.add("highlighted");
};

// Select switch on click
const selectSwitch = (switchEl) => {
  activeSwitch = switchEl;
  switches.forEach((el) => el.classList.remove("selected"));
  switchEl.classList.add("selected");

  const targetTranslate = `${-switchEl.offsetLeft}px`;
  const targetWidth = `${switchEl.offsetWidth}px`;

  gsap.to(switchWrapper, {
    translate: targetTranslate,
    width: targetWidth,
    duration: 0.3,
  });
};
