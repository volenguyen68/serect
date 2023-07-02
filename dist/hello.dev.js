"use strict";

(function hello() {
  var x = 5;
  var leftPaw = document.getElementById("leftPaw").classList;
  var rightPaw = document.getElementById("rightPaw").classList;
  var paws = document.getElementById("paws").classList;
  var circles = document.getElementById("circles").classList;
  var rpaws = document.getElementById("rpaws").classList;
  var rcircles = document.getElementById("rcircles").classList;
  var retweet = document.getElementById("retweet").classList;
  var heart = document.getElementById("heart").classList;
  leftPaw.toggle("leftPaw");
  rightPaw.toggle("rightPaw");
  paws.toggle("paws");
  circles.toggle("circles");
  rpaws.toggle("paws");
  rcircles.toggle("circles");
  leftPaw.toggle("leftPaw2");
  rightPaw.toggle("rightPaw2");
  retweet.toggle("green");
  heart.toggle("red"); // change number for speed

  setTimeout(hello, x * 20);
})();
//# sourceMappingURL=hello.dev.js.map
