const MinDuration = 5; // Minimum duration for snowflake animation
const body = document.querySelector("body"); //select body
const toggleButton = document.querySelector("#toggle"); //select toggle btn
let snowInterval = null;
const nightbtn = document.querySelector("#mode-toggle") //select night btn
let isAnimationEnabled = false; // Flag to track the animation state

nightbtn.addEventListener('click', () => {
  body.classList.toggle('night');
});

toggleButton.addEventListener("click", () => {
  const snowflakes = document.querySelectorAll(".snowflake");
  
  if (isAnimationEnabled) {
    snowflakes.forEach(snowflake => snowflake.style.animationPlayState = "paused");
    isAnimationEnabled = false;
  } else {
    snowflakes.forEach(snowflake => snowflake.style.animationPlayState = "running");
    isAnimationEnabled = true;
  }
});

function makeSnow() {
  const snowflake = document.createElement("div");
  const delay = Math.random() * 5; // Randomize the delay between 0 and 5 seconds
  const initialOpacity = Math.random(); // Randomize the initial opacity between 0 and 1
  const duration = Math.random() * 30 + MinDuration;

  snowflake.classList.add("snowflake");
  snowflake.style.left = `${Math.random() * window.screen.width}px`; // Randomize the horizontal position of the snowflake using the screen width
  snowflake.style.opacity = initialOpacity;
  snowflake.style.animation = `fall ${duration}s linear`
  snowflake.style.animationDelay = `${delay}s`;

  // Add event listener to snowflake element
snowflake.addEventListener("mouseover", () => {
  snowflake.classList.add("hovered"); // Add class to change size on hover
});

snowflake.addEventListener("mouseout", () => {
  snowflake.classList.remove("hovered"); // Remove class to revert size after hover
});

  body.appendChild(snowflake);// Append the snowflake to the body

  setTimeout(() => {
    body.removeChild(snowflake); // Remove the snowflake after the duration and delay time
    makeSnow()
  }, (duration + delay) * 1000); 
}

body.addEventListener("animationend", () => {
  makeSnow();
});

snowInterval = setInterval(makeSnow, 200); // Interval to continuously create new snowflakes


