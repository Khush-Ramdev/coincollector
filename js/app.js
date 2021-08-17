function isTouching(a, b) {
  var aRect = a.getBoundingClientRect();
  var bRect = b.getBoundingClientRect();

  return !(
    aRect.top + aRect.height < bRect.top ||
    aRect.top > bRect.top + bRect.height ||
    aRect.left + aRect.width < bRect.left ||
    aRect.left > bRect.left + bRect.width
  );
}

const player = document.getElementById("player");
const coin = document.getElementById("coin");
const count = document.querySelector("#score");
const count2 = document.querySelector("#score2");
const timer = document.querySelector("#time");

let modal = document.querySelector(".modal");
let closeBtn = document.querySelector(".close-btn");

closeBtn.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
  location.reload();
};

const extractTop = (pos) => {
  if (!pos) return 100;
  const newPos = parseInt(pos.slice(0, -2));
  if (newPos <= 100) {
    return 100;
  } else if (newPos >= window.innerHeight - 100 - player.height) {
    return window.innerHeight - 150 - player.height;
  }
  return newPos;
};

const extractLeft = (pos) => {
  if (!pos) return 100;
  const newPos = parseInt(pos.slice(0, -2));
  if (newPos <= 100) {
    return 100;
  } else if (newPos >= window.innerWidth - 100 - player.width) {
    // console.log(window.innerWidth-player.width-100)
    return window.innerWidth - player.width - 150;
  }
  return newPos;
};

const moveCoin = () => {
  let x = Math.floor(Math.random() * (window.innerWidth - 100));
  let y = Math.floor(Math.random() * (window.innerHeight - 150));
  x = Math.max(100, x);
  y = Math.max(100, y);
  coin.style.top = `${y}px`;
  coin.style.left = `${x}px`;
};

window.addEventListener("keydown", (e) => {
  const currTop = extractTop(player.style.top);
  const currLeft = extractLeft(player.style.left);
  // console.log(currLeft);
  if (e.key === "ArrowDown") {
    const pos = `${currTop + 50}px`;
    player.style.top = pos;
  } else if (e.key === "ArrowUp") {
    const pos = `${currTop - 50}px`;
    player.style.top = pos;
  } else if (e.key === "ArrowRight") {
    const pos = `${currLeft + 50}px`;
    player.style.left = pos;
    player.style.transform = "scale(1,1)";
  } else if (e.key === "ArrowLeft") {
    const pos = `${currLeft - 50}px`;
    player.style.left = pos;
    player.style.transform = "scale(-1,1)";
  }
  if (isTouching(player, coin)) {
    moveCoin();
    let currentCount = parseInt(count.innerText);
    currentCount++;
    // console.log(currentCount);
    count.innerText = `${currentCount}`;
  }
});

const tick = (sec) => {
  timer.innerText = `${sec}`;
};

const done = () => {
  modal.style.display = "flex";
  count2.innerText = `${parseInt(count.innerText)}`;
};

window.addEventListener("load", function () {
  console.log("loaded");
  var countdown = function (sec, tick, done) {
    var interval = setInterval(function () {
      if (sec < 0) {
        clearInterval(interval);
        done();
      } else {
        tick(sec);
        sec--;
      }
    }, 1000);
  };
  countdown(60, tick, done);
});