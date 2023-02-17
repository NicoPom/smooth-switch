import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import "./style.css";

gsap.registerPlugin(Flip);

const switches = document.querySelectorAll(".switch");
const highlight = document.querySelector(".highlight");
const texts = document.querySelectorAll(".text");

switches.forEach((switchEl) => {
  switchEl.addEventListener("mouseover", () => {
    // Move the highlight between the switches
    const highlightState = Flip.getState(highlight);
    switchEl.appendChild(highlight);
    Flip.from(highlightState, {
      duration: 0.3,
    });

    // Change the text opacity
    gsap.set(texts, { opacity: 0.5 });

    gsap.to(switchEl.querySelector(".text"), {
      opacity: 1,
      duration: 0,
    });
  });
});
