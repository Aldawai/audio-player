let tuto_box = $(".tutos"),
  tuto_focus = $(".tuto-focus"),
  tuto_message = $(".tuto-message"),
  navigation = $(".tutos .navigation"),
  skip_tuto = $(".skip-tuto"),
  next_tuto = $(".next-tuto"),
  main_controls = $(".main-controls"),
  music_row = $(".content .box .music-row.active"),
  music_rem = $(".content .box .music-row.active .music-remover");

let current_tuto_index = 0;

let tutorials = [
  {
    message: "Current music (author & title)",
    target: title,
    callback: null,
  },
  {
    message: "Controls",
    target: main_controls,
    callback: null,
  },
  {
    message: "Progress bar",
    target: range,
    callback: null,
  },
  {
    message: "Volume",
    target: $(".music-volume"),
    callback: null,
  },
  {
    message: "Visualizer",
    target: canvas,
    callback: null,
  },
  {
    message: "See more",
    target: more_opener,
    callback: null,
  },
  {
    message: "Playlist",
    target: $(".content .box"),
    callback: () => {
      more_opener.click();
    },
  },
  {
    message: "Import local music",
    target: $(".content .box .list .import-audio"),
    callback: null,
  },
  {
    message: "Music row",
    target: music_row,
    callback: null,
  },
  {
    message: "Remove Music from playlist",
    target: music_rem,
    callback: null,
  },
  {
    message: "Go to Parameters",
    target: $(".more .icon .more-menu"),
    callback: null,
  },
  {
    message: "Close the Playlist/Parameters box",
    target: $(".more .icon .close"),
    callback: null,
  },
  {
    message: "Go to Playlist",
    target: $(".more .icon .more-list"),
    callback: null,
  },
  {
    message: "Parameters",
    target: $(".content .box"),
    callback: () => {
      $(".more .icon .more-menu").click();
    },
  },
  {
    message: "Loop",
    target: $(".menu-grid-item.loop"),
    callback: null,
  },
  {
    message: "Mute",
    target: $(".menu-grid-item.mute"),
    callback: null,
  },
  {
    message: "Random next/prev",
    target: $(".menu-grid-item.random"),
    callback: null,
  },
  {
    message: "Control Speed",
    target: $(".menu-row.speed"),
    callback: null,
  },
  {
    message: "Toggle Fiber visualizer",
    target: $("#fiber-visualizer"),
    callback: null,
  },
  {
    message: "Toggle Bar Visualizer",
    target: $("#bar-visualizer"),
    callback: null,
  },
];

function focus_target(params) {
  let target = params.target,
    message = params.message,
    callback = params.callback,
    time = 0;

  if (callback != null) {
    callback();
    time = 500;
  }
  setTimeout(() => {
    let rect = target.getBoundingClientRect();
    tuto_focus.style.top = rect.top - 8 + "px";
    tuto_focus.style.left = rect.left - 8 + "px";
    tuto_focus.style.width = rect.width + 16 + "px";
    tuto_focus.style.height = rect.height + 16 + "px";

    let msg_rect = tuto_message.getBoundingClientRect();
    tuto_message.style.top = rect.top - msg_rect.height - 40 + "px";
    tuto_message.style.left = rect.left - msg_rect.width / 4 - 0 + "px";
  }, time);

  tuto_message.innerText = message;
}

function start_tutos() {
  if (tuto_is_done() == false) {
    tuto_box.style.display = "block";
    focus_target(tutorials[current_tuto_index]);
  }
}

function done_tuto() {
  localStorage.setItem("audio_player_tuto_done", "yes");
}

function tuto_is_done() {
  let done = false;
  if (localStorage.getItem("audio_player_tuto_done") != null) {
    done = true;
  }
  return done;
}

function next_tutorial() {
  if (current_tuto_index < tutorials.length - 1) {
    current_tuto_index++;
    focus_target(tutorials[current_tuto_index]);
    if (current_tuto_index == tutorials.length - 1) {
      next_tuto.innerText = "OK !";
    } else {
      next_tuto.innerText = "Next";
    }
  } else {
    $(".more .icon .close").click();
    skip_tutorial();
  }
}

function skip_tutorial() {
  done_tuto();
  tuto_box.remove();
}

next_tuto.addEventListener("click", next_tutorial);

skip_tuto.addEventListener("click", skip_tutorial);

document.addEventListener("DOMContentLoaded", () => {
  tutorials[8].target = $(".content .box .music-row.active");
  tutorials[9].target = $(".content .box .music-row.active .music-remover");
  start_tutos();
});

window.addEventListener("resize", () => {
  focus_target(tutorials[current_tuto_index]);
});
