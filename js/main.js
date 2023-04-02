range_interval = setInterval(() => {
  if (!window.music.paused) {
    range.value = window.music.currentTime;
    range.max = window.music.duration;
    timer_volume.innerText = sec_to_time(window.music.currentTime);
    if (
      parseInt(music.currentTime) + 0 >= parseInt(music.duration) &&
      window.music.loop == false
    ) {
      setTimeout(() => {
        next_one();
        verify_visualizer();
      }, 1000);
    }
  }

  if (music.duration && window.initiated) {
    duration_time.innerText = sec_to_time(window.music.duration);
  } else {
    duration_time.innerText = "•";
  }
}, 400);

document.addEventListener("DOMContentLoaded", (e) => {
  load_music(playlist[current_index]);
});

play_pause.addEventListener("click", (e) => {
  try {
    pause_or_play();
  } catch (error) {
    console.error(error);
    next_one();
  }
});

play_pause.addEventListener("mouseup", play_pause_mouseup);

play_pause.addEventListener("mousedown", play_pause_mousedown);

prev.addEventListener("click", prev_click);

prev.addEventListener("mousedown", prev_mousedown);

prev.addEventListener("mouseup", prev_mouseup);

next.onclick = next_click;

next.addEventListener("mousedown", next_mousedown);

next.addEventListener("mouseup", next_mouseup);

next.addEventListener("touchstart", next_mousedown);

next.addEventListener("touchend", next_mouseup);

range.addEventListener("input", (e) => {
  music.currentTime = range.value;
});

more_opener.addEventListener("click", (e) => {
  if (!more_opener.parentNode.classList.contains("open")) {
    more_opener.parentNode.classList.add("open");
  }
});

more_opener.querySelector(".close").addEventListener("click", (e) => {
  if (more_opener.parentNode.classList.contains("open")) {
    e.stopPropagation();
    e.preventDefault();
    more_opener.parentNode.classList.remove("open");
  }
});

volume_range.addEventListener("input", (e) => {
  music.volume = volume_range.value / 100;
});

speed_buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    button.parentNode.querySelector(".active").classList.remove("active");
    window.music.playbackRate = button.getAttribute("value");
    current_speed = button.getAttribute("value");
    button.classList.add("active");
  });
});

import_button.addEventListener("click", import_local_audio);

more_menu_button.addEventListener("click", (e) => {
  if (DOM_music_list_container.classList.contains("isList")) {
    DOM_music_list_container.classList.remove("isList");
  }
});

list_menu_button.addEventListener("click", (e) => {
  if (!DOM_music_list_container.classList.contains("isList")) {
    DOM_music_list_container.classList.add("isList");
  }
});

loop_button.addEventListener("click", (e) => {
  window.music.loop = !window.music.loop;
  if (!window.music.loop && loop_button.classList.contains("active")) {
    loop_button.classList.remove("active");
  } else {
    loop_button.classList.add("active");
  }
});

mute_button.addEventListener("click", (e) => {
  window.music.muted = !window.music.muted;
  if (!window.music.muted && mute_button.classList.contains("active")) {
    mute_button.classList.remove("active");
  } else {
    mute_button.classList.add("active");
  }
});

random_button.addEventListener("click", (e) => {
  if (random && random_button.classList.contains("active")) {
    random_button.classList.remove("active");
    random = false;
  } else {
    random_button.classList.add("active");
    random = true;
  }
});

fiber_visualizer_checker.addEventListener("change", (e) => {
  if (!fiber_visualizer_checker.checked) {
    fiber_visualizer = false;
  } else {
    fiber_visualizer = true;
  }
});

bar_visualizer_checker.addEventListener("change", (e) => {
  if (!bar_visualizer_checker.checked) {
    bar_visualizer = false;
  } else {
    bar_visualizer = true;
  }
});
