var canvas = document.querySelector("#canvas"),
  readout = document.querySelector("#readout"),
  context = canvas.getContext("2d"),
  spritesheet = new Image();
spritesheet.src = "../../shared/images/running-sprite-sheet.png";
// 绘制背景
function drawBackground() {
  var vertical_left_spacing = 12,
    i = context.canvas.height;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = "#333";
  context.lineWidth = 0.5;

  while (i > vertical_left_spacing * 4) {
    context.beginPath();
    context.moveTo(0, i);
    context.lineTo(context.canvas.width, i);
    context.stroke();
    i -= vertical_left_spacing;
  }
}
drawBackground();
// 填充图形
function drawSpritesheet() {
  context.drawImage(spritesheet, 0, 0);
}
spritesheet.onload = function(e) {
  drawSpritesheet();
};
// 鼠标移动
function windowToCanvas(canvas, x, y) {
  // 获取元素相对与浏览器视口的位置
  var bbox = canvas.getBoundingClientRect();
  return {
    x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height)
  };
}
function drawGuidelines(x, y) {
  context.strokeStyle = "rgba(0,0,230,0.8)";
  context.lineWidth = 0.5;
  drawVerticalLine(x);
  drawHorizontalLine(y);
}
function drawVerticalLine(x) {
  context.beginPath();
  context.moveTo(x + 0.5, 0);
  context.lineTo(x + 0.5, context.canvas.height);
  context.stroke();
}
function drawHorizontalLine(y) {
  context.beginPath();
  context.moveTo(0, y + 0.5);
  context.lineTo(context.canvas.width, y + 0.5);
  context.stroke();
}
function updateReadout(x, y) {
  readout.innerHTML = "(" + x.toFixed(0) + ", " + y.toFixed(0) + ")";
}
function drawGuidelines(x, y) {
  context.strokeStyle = "rgba(0,0,230,0.8)";
  context.lineWidth = 0.5;
  drawVerticalLine(x);
  drawHorizontalLine(y);
}

canvas.onmousemove = function(e) {
  var loc = windowToCanvas(canvas, e.clientX, e.clientY);
  drawBackground();
  drawSpritesheet();
  drawGuidelines(loc.x, loc.y);
  updateReadout(loc.x, loc.y);
};
