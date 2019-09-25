let window_width = 1024,
  window_height = 768,
  radius = 8,
  margin_top = 60,
  margin_left = 30;
const endTime = new Date(2019, 8,28, 18, 47, 52);
let curShowTimeSeconds = 0;
window.onload = function() {
  let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d");
  canvas.width = window_width;
  canvas.height = window_height;
  curShowTimeSeconds = getCurrentShowTimeSeconds();
  render(context);
};
function getCurrentShowTimeSeconds() {
  var curTime = new Date();
  var ret = endTime.getTime() - curTime.getTime(); //毫秒
  ret = Math.round(ret / 1000); //秒
  return ret >= 0 ? ret : 0;
}
function render(ctx) {
  let hours = parseInt(curShowTimeSeconds/3600),
    minutes = parseInt(curShowTimeSeconds-hours*3600)/60,
    seconds = curShowTimeSeconds%60;
    console.log(hours)
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
}
function renderDigit(x, y, num, ctx) {
  ctx.fillStyle = "rgb(0,102,153)";
  for (var i = 0; i < digit[num].length; i++)
    for (var j = 0; j < digit[num][i].length; j++) {
      if (digit[num][i][j] == 1) {
        // 画圆
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
}
