//TODO: update the endpoint
var endpoint = "https://script.google.com/macros/s/AKfycbwMqVFM5RtLxzwdaRYis6JOvfeIJfal3IFR4it-Tw/exec";

var ajax = require("./jsonp");
var formUtil = require("./form-utils");
var cookie = require("./cookies");
var placeUser = require("./graph");

var panel = document.querySelector(".form-panel");
var container = document.querySelector(".fan-predictions");

var message = panel.querySelector(".message");
var form = panel.querySelector(".form");

var storageKey = `${window.teams.home}-${window.teams.opposing}-2020`;

//do not show form if it has been submitted before
if (cookie.read(storageKey)) {
  container.classList.add("already-sent");
}

var stored = localStorage.getItem(storageKey);
if (stored) {
  container.classList.remove("show-form");
  placeUser(stored);
}

form.querySelector(".submit").addEventListener("click", function(e) {
  e.preventDefault();
  var self = this;
  if (self.disabled) return;

  //handle form elements correctly
  var packet = formUtil.package(form);
  var errorMsg = "";
  if (!packet) {
    errorMsg = "We need your prediction in order to add you!";
  } else if (isNaN(packet.opposing) || isNaN(packet.home)) {
    errorMsg = "Scores must be numbers.";
  } else if (Math.max(packet.opposing, packet.home) > 70) {
    errorMsg = "Scores over 70 points are not accepted.";
  } else if (packet.home == packet.opposing) {
    errorMsg = "Scores cannot be equal.";
  } else if (packet.opposing < 0 || packet.home < 0) {
    errorMsg = "Scores must be positive.";
  }

  if (errorMsg) {
    panel.classList.add("invalid");
    document.querySelector(".validation.error").innerHTML = errorMsg;
    return;
  } else {
    panel.classList.remove("invalid");
  }

  self.disabled = true;

  var submission = ajax(endpoint, packet, function(data) {
    container.classList.remove("show-form");
    container.classList.add("already-sent");
    cookie.write(storageKey, true);
    var stored = packet.home + "-" + packet.opposing;
    localStorage.setItem(storageKey, stored);
    placeUser(stored);
  });

  panel.classList.add("show-message");

});

window.clearSent = function() {
  cookie.clear(storageKey);
  localStorage.removeItem(storageKey);
};
