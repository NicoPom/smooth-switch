import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import "./style.css";

gsap.registerPlugin(Flip);

const container = document.querySelector(".container");
const highlight = document.querySelector(".highlight");

// Using event delegation to listen for mouseover events on the container
container.addEventListener("mouseover", (event) => {
  // Find the switch that was hovered
  const switchEl = event.target.closest(".switch");
  if (!switchEl) return;

  // Move the highlight between the switches using Flip
  const highlightState = Flip.getState(highlight);
  switchEl.appendChild(highlight);
  Flip.from(highlightState, {
    duration: 0.3,
  });

  // Change the text opacity of the hovered switch
  container.querySelectorAll(".text").forEach((el) => {
    el.classList.remove("highlighted");
  });
  switchEl.querySelector(".text").classList.add("highlighted");
});
