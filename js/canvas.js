const canvas = $("#canvas");
const ctx = canvas.getContext("2d");

let rect = canvas.getBoundingClientRect();

canvas.height = rect.height;
canvas.width = rect.width;

const height = rect.height;
const width = rect.width;

window.run_visualizer = () => {
  if (window.initiated == true) {
    let auCtx = new (window.AudioContext || window.webkitAudioContext)();

    let audioSrc = null;
    let analyser = null;

    audioSrc = auCtx.createMediaElementSource(music);
    analyser = auCtx.createAnalyser();
    audioSrc.connect(analyser);
    analyser.connect(auCtx.destination);

    analyser.fftSize = 64;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const barWidth = canvas.width / (bufferLength * 2);

    function animation() {
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      x = barWidth * 6;
      analyser.getByteFrequencyData(dataArray);
      for (let i = 11; i < bufferLength; i++) {
        const barHeight = dataArray[i];

        ctx.beginPath();
        ctx.fillStyle = `rgba(${182}, ${110}, ${76}, ${0.4})`;
        ctx.strokeStyle = `rgba(${182}, ${110}, ${76}, ${0.6})`;
        ctx.lineWidth = 1;
        if (fiber_visualizer) {
          ctx.moveTo(0, height / 2);
          ctx.bezierCurveTo(
            (width / 4) * 1,
            height / 2 - (barHeight + barHeight / 4),
            (width / 4) * 3,
            height / 2 + (barHeight + barHeight / 4),
            (width / 4) * 4,
            height / 2
          );
          ctx.moveTo(0, height / 2);
          ctx.bezierCurveTo(
            (width / 4) * 1,
            height / 2 + (barHeight + barHeight / 4),
            (width / 4) * 3,
            height / 2 - (barHeight + barHeight / 4),
            (width / 4) * 4,
            height / 2
          );
          ctx.stroke();
        }
        if (bar_visualizer) {
          ctx.fillRect(x * 2, height, barWidth + 3, -(barHeight / 2));
          ctx.closePath();

          ctx.beginPath();
          ctx.fillStyle = "#b66e4c";
          ctx.fillRect(x * 2, height - 4, 8, 4);
        }
        ctx.closePath();
        ctx.restore();

        x += barWidth;
      }

      requestAnimationFrame(animation);
    }
    animation();
  }
};

(function () {
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.fillStyle = `rgba(${182}, ${110}, ${76}, ${0.4})`;
  ctx.strokeStyle = `rgba(${182}, ${110}, ${76}, ${0.6})`;
  ctx.lineWidth = 1;
  for (let i = 0; i < 21; i++) {
    ctx.moveTo(0, height / 2);
    ctx.bezierCurveTo(
      (width / 4) * 1,
      height / 2 - 0,
      (width / 4) * 2.5,
      height / 2 + 0,
      (width / 4) * 4,
      height / 2
    );
  }
  ctx.stroke();
  ctx.closePath();
})();

function curve() {
  ctx.beginPath();
  // ctx.strokeStyle = `rgb{${sienna.r}, ${sienna.g}, ${sienna.b}}`;
  ctx.strokeStyle = `rgb{${182}, ${110}, ${76}}`;
  ctx.strokeStyle = `sienna`;
  ctx.lineWidth = 2;
  ctx.moveTo(0, height / 2);
  ctx.bezierCurveTo(
    (width / 5) * 1,
    height / 2 - 10,
    (width / 5) * 2,
    height / 2 + 40,
    (width / 5) * 3,
    height / 2 + 0
  );
  ctx.bezierCurveTo(
    (width / 5) * 4,
    height / 2 - 20,
    (width / 5) * 4.5,
    height / 2 + 40,
    (width / 5) * 5,
    height / 2 + -40
  );
  ctx.stroke();
  ctx.closePath();
}
