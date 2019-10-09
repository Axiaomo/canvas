var canvas = document.getElementById("canvas"),
  context = canvas.getContext("2d"),
  snapshotButton = document.getElementById("snapshotButton"),
  snapshotImageElement = document.getElementById("snapshotImageElement"),
  FONT_HEIGHT = 15,
  MARGIN = 35,
  HAND_TRUNCATION = canvas.width / 25,
  HOUR_HAND_TRUNCATION = canvas.width / 10,
  NUMERAL_SPACING = 20,
  RADIUS = canvas.width / 2 - MARGIN,
  HAND_RADIUS = RADIUS + NUMERAL_SPACING,
  loop;
// 表盘
function drawCircle() {
  context.beginPath();
  context.arc(
    canvas.width / 2,
    canvas.height / 2,
    RADIUS,
    0,
    Math.PI * 2,
    true
  );
  context.stroke();
}
function drawClock() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.save();
  
}
context.font = FONT_HEIGHT + "px Arial";
loop = setInterval(drawClock, 1000);
