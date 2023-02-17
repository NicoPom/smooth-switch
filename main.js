import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import "./style.css";

gsap.registerPlugin(Flip);

const switches = document.querySelectorAll(".switch");
const highlight = document.querySelector(".highlight");

switches.forEach((switchEl) => {
  switchEl.addEventListener("mouseover", () => {
    // Move the higlight between the switches
    const state = Flip.getState(highlight);
    switchEl.appendChild(highlight);
    Flip.from(state, {
      duration: 1,
    });
  });
});
