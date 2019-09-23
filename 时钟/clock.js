let dom = document.getElementById("clock"),
  ctx = dom.getContext("2d"),
  width = ctx.canvas.width, //宽度
  height = ctx.canvas.height, //高度
  r = width / 2; //半径
function drawBackground() {
  ctx.save();
  ctx.translate(r, r); // 移动圆心
  ctx.beginPath(); //定义路径起始
  ctx.lineWidth = 10; //圆形的边框
  ctx.arc(0, 0, r - 5, 0, 2 * Math.PI, false); //绘制圆形 圆心已经变成中心点了
  ctx.stroke();
  // 小时数
  var hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
  ctx.font = "18px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  hourNumbers.forEach(function(number, i) {
    var rad = ((2 * Math.PI) / 12) * i; //每小时的弧度
    var x = Math.cos(rad) * (r - 30); //小时x坐标点
    var y = Math.sin(rad) * (r - 30); //小时x坐标点
    ctx.fillText(number, x, y);
  });
  // 60个分钟点
  for (var i = 0; i < 60; i++) {
    var rad = ((2 * Math.PI) / 60) * i;
    var x = Math.cos(rad) * (r - 15);
    var y = Math.sin(rad) * (r - 15);
    ctx.beginPath();
    if (i % 5 == 0) {
      ctx.fillStyle = "#000";
      ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
    } else {
      ctx.fillStyle = "#ccc";
      ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
    }
    ctx.fill();
  }
}

// 时针
function drawHour(hour, minute) {
  ctx.save();
  ctx.beginPath();
  var rad = ((2 * Math.PI) / 12) * hour; //时针弧度
  var mrad = ((2 * Math.PI) / 12 / 60) * minute; //分针弧度数
  ctx.rotate(rad + mrad); //如果不清楚当前画布，会一直保存环境
  ctx.lineWidth = 6; //线的宽度
  ctx.moveTo(0, 10);
  ctx.lineTo(0, -r / 2);
  ctx.lineCap = "round"; //线的圆帽样式
  ctx.stroke();
  ctx.restore();
}

// 分针
function drawMinute(minute) {
  ctx.save();
  ctx.beginPath();
  var rad = ((2 * Math.PI) / 60) * minute;
  ctx.rotate(rad);
  ctx.lineWidth = 3; //线的宽度
  ctx.moveTo(0, 10);
  ctx.lineTo(0, -r + 30);
  ctx.lineCap = "round"; //线的圆帽样式
  ctx.stroke();
  ctx.restore();
}

//秒针
function drawSecond(Second) {
  ctx.save();
  ctx.beginPath();
  var rad = ((2 * Math.PI) / 60) * Second;
  ctx.rotate(rad);
  ctx.moveTo(-2, 20);
  ctx.lineTo(2, 20);
  ctx.lineTo(1, -r + 18);
  ctx.lineTo(-1, -r + 18);
  ctx.fillStyle = "#f00";
  ctx.fill();
  ctx.restore();
}
// 中心圆点
function drawDot() {
  ctx.beginPath();
  ctx.fillStyle = "#fff";
  ctx.arc(0, 0, 3, 0, 2 * Math.PI, false);
  ctx.fill();
}

function draw() {
  ctx.clearRect(0, 0, width, height); //清除面板
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  drawBackground(); //绘制表盘
  drawHour(hour, minute); //时针
  drawMinute(minute); //分针
  drawSecond(second); //秒针
  drawDot(); //圆心点
  ctx.restore(); //恢复默认圆点
}
draw();
setInterval(draw, 1000);
