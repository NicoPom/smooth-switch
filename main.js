import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import "./style.css";

gsap.registerPlugin(Flip);

const mainContainer = document.querySelector(".main-container");
const switchContainer = document.querySelector(".switch-container");
const switchWrapper = document.querySelector(".switch-wrapper");
const highlight = document.querySelector(".highlight");
const switches = Array.from(switchContainer.querySelectorAll(".switch"));
const activeSwitch = switches[0];

const initialSwitchContainerState = {
  width: `${activeSwitch.offsetWidth}px`,
  overflow: "hidden",
  translate: 0,
};

gsap.set(switchContainer, initialSwitchContainerState);

const expandSwitchContainer = () => {
  gsap.to(mainContainer, { maxWidth: "400px", duration: 0.5 });
  gsap.to(switchContainer, {
    width: "100%",
    overflow: "hidden",
    duration: 0.5,
  });
  gsap.to(switchWrapper, { translate: 0, duration: 0.5 });
};

const contractSwitchContainer = () => {
  const selectedSwitch =
    switchContainer.querySelector(".selected") || activeSwitch;
  const targetWidth = `${selectedSwitch.offsetWidth}px`;

  gsap.to(switchContainer, {
    width: targetWidth,
    duration: 0.3,
  });
};

const highlightSwitch = (switchEl) => {
  const highlightState = Flip.getState(highlight);
  switchEl.appendChild(highlight);
  Flip.from(highlightState, { duration: 0.3 });

  switches.forEach((el) => el.classList.remove("highlighted"));
  switchEl.classList.add("highlighted");
};

const selectSwitch = (switchEl) => {
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
});
