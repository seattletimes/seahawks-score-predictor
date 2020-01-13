var paywall = require("./lib/paywall");
setTimeout(() => paywall(12374963), 5000);

require("component-responsive-frame/child");

var $ = require("./lib/qsa");
require("./form");

var panel = document.querySelector(".fan-predictions");

document.querySelector(".skip").addEventListener("click", () => panel.classList.remove("show-form"));

document.querySelector(".add-yourself").addEventListener("click", () => panel.classList.add("show-form"));

var onTouch = function(e) {
  e.stopPropagation();
  var tooltip = document.querySelector(".click-tooltip")
  if (tooltip) tooltip.classList.remove("click-tooltip");
  e.target.nextElementSibling.classList.add("click-tooltip");
}

$(".point").forEach(el => el.addEventListener("touchstart", onTouch));

// document.querySelector(".scatter-box-outer").addEventListener("touchstart", () => document.querySelector(".click-tooltip").removeClass("click-tooltip"););
