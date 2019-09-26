var window_width = 1024;
var window_height = 768;
var radius = 8;
var margin_top = 60;
var margin_left = 30;

// var endTime = new Date();
// endTime.setTime(endTime.getTime() + 3600 * 1000);
var curShowTimeSeconds = 0;

var balls = [];
const colors = [
  "#33B5E5",
  "#0099CC",
  "#AA66CC",
  "#9933CC",
  "#99CC00",
  "#669900",
  "#FFBB33",
  "#FF8800",
  "#FF4444",
  "#CC0000"
];

window.onload = function() {
  window_width = document.body.clientWidth;
  window_height = document.body.clientHeight;
  margin_left = Math.round(window_width / 10);
  radius = Math.round((window_width * 4) / 5 / 108) - 1;
  margin_top = Math.round(window_height / 5);
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  canvas.width = window_width;
  canvas.height = window_height;

  curShowTimeSeconds = getCurrentShowTimeSeconds();
  setInterval(function() {
    render(context);
    update();
  }, 50);
};

function getCurrentShowTimeSeconds() {
  var curTime = new Date();
  // var ret = endTime.getTime() - curTime.getTime();
  // ret = Math.round(ret / 1000);
  var ret =
    curTime.getHours() * 3600 +
    curTime.getMinutes() * 60 +
    curTime.getSeconds();
  return ret;
}

function update() {
  var nextShowTimeSeconds = getCurrentShowTimeSeconds();

  var nextHours = parseInt(nextShowTimeSeconds / 3600);
  var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);
  var nextSeconds = nextShowTimeSeconds % 60;

  var curHours = parseInt(curShowTimeSeconds / 3600);
  var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60);
  var curSeconds = curShowTimeSeconds % 60;

  if (nextSeconds != curSeconds) {
    if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
      addBalls(margin_left + 0, margin_top, parseInt(curHours / 10));
    }
    if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
      addBalls(
        margin_left + 15 * (radius + 1),
        margin_top,
        parseInt(curHours / 10)
      );
    }

    if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
      addBalls(
        margin_left + 39 * (radius + 1),
        margin_top,
        parseInt(curMinutes / 10)
      );
    }
    if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
      addBalls(
        margin_left + 54 * (radius + 1),
        margin_top,
        parseInt(curMinutes % 10)
      );
    }

    if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
      addBalls(
        margin_left + 78 * (radius + 1),
        margin_top,
        parseInt(curSeconds / 10)
      );
    }
    if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
      addBalls(
        margin_left + 93 * (radius + 1),
        margin_top,
        parseInt(nextSeconds % 10)
      );
    }

    curShowTimeSeconds = nextShowTimeSeconds;
  }

  updateBalls();
}

function updateBalls() {
  for (var i = 0; i < balls.length; i++) {
    balls[i].x += balls[i].vx;
    balls[i].y += balls[i].vy;
    balls[i].vy += balls[i].g;

    if (balls[i].y >= window_height - radius) {
      balls[i].y = window_height - radius;
      balls[i].vy = -balls[i].vy * 0.75;
    }
  }
  var cnt = 0;
  for (var i = 0; i < balls.length; i++) {
    if (balls[i].x + radius > 0 && balls[i].x - radius < window_width) {
      balls[cnt++] = balls[i];
    }
  }
  while (balls.length > Math.min(300, cnt)) {
    balls.pop();
  }
}

function addBalls(x, y, num) {
  for (var i = 0; i < digit[num].length; i++)
    for (var j = 0; j < digit[num][i].length; j++)
      if (digit[num][i][j] == 1) {
        var aBall = {
          x: x + j * 2 * (radius + 1) + (radius + 1),
          y: y + i * 2 * (radius + 1) + (radius + 1),
          g: 1.5 + Math.random(),
          vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
          vy: -5,
          color: colors[Math.floor(Math.random() * colors.length)]
        };

        balls.push(aBall);
      }
}

function render(ctx) {
  ctx.clearRect(0, 0, window_width, window_height);

  var hours = parseInt(curShowTimeSeconds / 3600);
  var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
  var seconds = curShowTimeSeconds % 60;

  renderDigit(margin_left, margin_top, parseInt(hours / 10), ctx);
  renderDigit(
    margin_left + 15 * (radius + 1),
    margin_top,
    parseInt(hours % 10),
    ctx
  );
  renderDigit(margin_left + 30 * (radius + 1), margin_top, 10, ctx);
  renderDigit(
    margin_left + 39 * (radius + 1),
    margin_top,
    parseInt(minutes / 10),
    ctx
  );
  renderDigit(
    margin_left + 54 * (radius + 1),
    margin_top,
    parseInt(minutes % 10),
    ctx
  );
  renderDigit(margin_left + 69 * (radius + 1), margin_top, 10, ctx);
  renderDigit(
    margin_left + 78 * (radius + 1),
    margin_top,
    parseInt(seconds / 10),
    ctx
  );
  renderDigit(
    margin_left + 93 * (radius + 1),
    margin_top,
    parseInt(seconds % 10),
    ctx
  );

  for (var i = 0; i < balls.length; i++) {
    ctx.fillStyle = balls[i].color;

    ctx.beginPath();
    ctx.arc(balls[i].x, balls[i].y, radius, 0, 2 * Math.PI, true);
    ctx.closePath();

    ctx.fill();
  }
}

function renderDigit(x, y, num, ctx) {
  ctx.fillStyle = "rgb(0,102,153)";

  for (var i = 0; i < digit[num].length; i++)
    for (var j = 0; j < digit[num][i].length; j++)
      if (digit[num][i][j] == 1) {
        ctx.beginPath();
        ctx.arc(
          x + j * 2 * (radius + 1) + (radius + 1),
          y + i * 2 * (radius + 1) + (radius + 1),
          radius,
          0,
          2 * Math.PI
        );
        ctx.closePath();

        ctx.fill();
      }
}
