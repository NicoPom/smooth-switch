import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import "./style.css";

gsap.registerPlugin(Flip);

const switches = document.querySelectorAll(".switch");
const highlight = document.querySelector(".highlight");
const texts = document.querySelectorAll(".text");

switches.forEach((switchEl) => {
  switchEl.addEventListener("mouseover", () => {
    // Move the higlight between the switches
    const hihlightState = Flip.getState(highlight);
    switchEl.appendChild(highlight);
    Flip.from(hihlightState, {
      duration: 0.3,
    });

    // // change the text opacity
    // gsap.to(texts, {
    //   opacity: 0.5,
    //   duration: 0.3,
    // });

    // gsap.to(switchEl.querySelector(".text"), {
    //   opacity: 1,

    //   delay: 0.1,
    // });
  });
});
