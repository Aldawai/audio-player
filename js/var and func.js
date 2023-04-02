let playlist = [
  {
    id: 2,
    title: "Ambassadrice",
    src: "../assets/audios/Gims - AMBASSADRICE.mp3",
    duration: 184,
    artist: {
      name: "Gims",
    },
  },
  {
    id: 3,
    title: "Blessé",
    src: "../assets/audios/Gims - BLESSE.mp3",
    duration: 183,
    artist: {
      name: "Gims",
    },
  },
  {
    id: 4,
    title: "Cash cache",
    src: "../assets/audios/Gims - CASH CACHE.mp3",
    duration: 212,
    artist: {
      name: "Gims",
    },
  },
  {
    id: 5,
    title: "Mama",
    src: "../assets/audios/Gims - MAMA.mp3",
    duration: 161,
    artist: {
      name: "Gims",
    },
  },
  {
    id: 6,
    title: "La vie qu'on mène",
    src: "../assets/audios/Ninho - La vie qu'on mène.mp3",
    duration: 193,
    artist: {
      name: "Ninho",
    },
  },
  {
    id: 1,
    title: "Under the influence",
    src: "../assets/audios/Chris Brown - under the influence.mp3",
    duration: 176,
    artist: {
      name: "Chris Brown",
    },
  },
];

const bar_visualizer_checker = $("#bar-visualizer"),
  play_pause = $(".play-pause"),
  controls_f = $(".controls-f"),
  duration_time = $(".duration-time"),
  DOM_music_list = $(".box .list .list-body"),
  DOM_music_list_container = $(".box .list").parentNode.parentNode,
  fiber_visualizer_checker = $("#fiber-visualizer"),
  import_button = $(".content .box .import-audio"),
  list_menu_button = $(".more .icon-more .more-list"),
  loop_button = $(".menu-grid-item.loop"),
  more_menu_button = $(".more .icon-more .more-menu"),
  more_opener = $(".more .icon"),
  mute_button = $(".menu-grid-item.mute"),
  next = $(".next"),
  prev = $(".prev"),
  random_button = $(".menu-grid-item.random"),
  range = $(".range"),
  speed_buttons = $$(".speed .speed-button-group div"),
  title = $(".music-title marquee"),
  timer_volume = $(".current-timer"),
  volume_range = $(".vol");

let bar_visualizer = true,
  current_speed = 1,
  fiber_visualizer = true,
  stop_timeout,
  v_moins_timeout,
  v_moins_interval,
  v_plus_timeout,
  v_plus_interval,
  range_interval,
  random = false,
  was_in_action = false;

let current_index = 0;

window.initiated = false;

volume_range.value = 100;

window.music = new Audio(playlist[current_index].src);

function sec_to_time(secondes) {
  let time = "";
  let sec = parseInt(secondes % 60);
  let min = parseInt(secondes / 60);

  if (sec == 60) {
    sec = "00";
  } else if (sec < 10) {
    sec = "0" + sec;
  } else {
    sec = parseInt(sec);
  }

  if (min < 10) {
    min = "0" + parseInt(min);
  } else {
    min = parseInt(min);
  }

  time = min + ":" + sec;
  return time;
}

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

function verify_visualizer() {
  if (window.initiated == false) {
    window.initiated = true;
    window.run_visualizer();
  }
}

function load_music(track) {
  window.music.src = track.src;

  title.innerText = track.artist.name + " • " + track.title;
  title.style.display = "block";
  title.parentNode.querySelector("span").style.display = "none";
  timer_volume.innerText = sec_to_time(0);
  duration_time.innerText = sec_to_time(track.duration);
  load_playlist();
}

function createRow(track, playlist) {
  let row = document.createElement("div");
  row.className = "music-row";

  const index = playlist.indexOf(track);

  let active = "";

  row.playlist = playlist;

  row.music = track;

  row.addEventListener("click", (e) => {
    current_index = index;
    load_music(track);
    if (window.music.paused) {
      window.music.play();
      load_playlist();
    }
    if (was_in_action == false) {
      verify_visualizer();
      if (play_pause.classList.contains("paused")) {
        play_pause.classList.remove("paused");
      }
      play_pause.classList.add("playing");
    } else if (was_in_action == false) {
      if (play_pause.classList.contains("playing")) {
        play_pause.classList.remove("playing");
      }
      play_pause.classList.add("paused");
    }
  });

  if (row.music.src == playlist[current_index].src) {
    row.classList.add("active");
  }

  if (window.music.paused == false) {
    row.classList.add("playing");
  }

  row.innerHTML = `
    <img src="assets/images/icon.jpeg" alt="">
    <div class="music-infos">
      <div class="music-title">${track.title}</div>
      <div class="music-author">${track.artist.name}</div>
    </div>
    <div class="isPlaying">
      <div style="--delay: ${Math.random() * 0.5 + 1}s;"></div>
      <div style="--delay: ${Math.random() * 0.5 + 1}s;"></div>
      <div style="--delay: ${Math.random() * 0.5 + 1}s;"></div>
    </div>
    <div class="music-duration">${sec_to_time(track.duration)}</div>
    <div class="music-remover" >
      <svg class="bar" xmlns="http://www.w3.org/2000/svg" fill="none" width="15px" height="15px" viewBox="0 0 24 24">
        <path d="M2 2L22 22M22 2L2 22" style="stroke: black;stroke-width:  3;"/>
      </svg>
    </div>
  `;

  row.querySelector(".music-remover").onclick = (e) => {
    e.stopPropagation();
    let index = row.playlist.indexOf(row.music);
    row.classList.add("move-out");
    setTimeout(() => {
      row.remove();
      playlist.splice(index, 1);
      load_music(playlist[current_index]);
      if (window.music.paused) {
        window.music.play();
      }
      if (window.music.src == track.src) {
        window.music.src = playlist[index];
        if (was_in_action == false) {
          verify_visualizer();
          if (play_pause.classList.contains("paused")) {
            play_pause.classList.remove("paused");
          }
          play_pause.classList.add("playing");
        } else if (was_in_action == false) {
          if (play_pause.classList.contains("playing")) {
            play_pause.classList.remove("playing");
          }
          play_pause.classList.add("paused");
        }
      }
      load_playlist();
    }, 1000);
  };

  return row;
}

function load_playlist() {
  DOM_music_list.innerHTML = "";
  playlist.forEach((track) => {
    let row = createRow(track, playlist);
    DOM_music_list.appendChild(row);
  });
}

function import_local_audio(a) {
  let input = document.createElement("input");
  input.type = "file";
  input.accept = "audio/*";

  input.onchange = (e) => {
    let file = input.files[0];

    let url = URL.createObjectURL(file);
    let _audio = new Audio(url);
    _audio.volume = 0;
    _audio.play();
    let _duration = 0;
    setTimeout(() => {
      _audio.pause();
      _duration = _audio.duration;
      let index = playlist[playlist.length - 1].id + 1;
      let music_to_add = {
        id: index,
        title: file.name,
        src: url,
        duration: _duration,
        artist: {
          name: "Unknow",
        },
      };
      playlist.push(music_to_add);
      load_playlist();
    }, 1000);
  };
  input.click();
}

function pause_or_play(e) {
  if (music.paused == true && was_in_action == false) {
    isTimer = true;
    verify_visualizer();
    music.play();
    if (play_pause.classList.contains("paused")) {
      play_pause.classList.remove("paused");
    }
    play_pause.classList.add("playing");
  } else if (was_in_action == false) {
    music.pause();
    if (play_pause.classList.contains("playing")) {
      play_pause.classList.remove("playing");
    }
    play_pause.classList.add("paused");
  }
  load_playlist();
}

function play_pause_mousedown(e) {
  stop_timeout = setTimeout((e) => {
    music.pause();
    music.currentTime = 0;
    was_in_action = true;
  }, 1000);
}

function play_pause_mouseup(e) {
  if (stop_timeout) {
    clearTimeout(stop_timeout);
    stop_timeout = setTimeout((e) => {
      was_in_action = false;
    }, 10);
  }
}

function prev_click(e) {
  prev_one();
  verify_visualizer();
}

function display_title() {
  let data = playlist[current_index];
  title.innerText = data.artist.name + " • " + data.title;
  title.style.display = "block";
  title.parentNode.querySelector("span").style.display = "none";
}

function prev_one() {
  let index = current_index;
  if (current_index == 0 && was_in_action == false) {
    current_index = playlist.length - 1;
  } else if (was_in_action == false && random == false) {
    current_index--;
  }

  if (random == true) {
    let value = parseInt(Math.random() * (playlist.length - 1));
    while (value == index) {
      value = parseInt(Math.random() * (playlist.length - 1));
    }
    current_index = value;
  }

  window.music.src = playlist[current_index].src;
  window.music.addEventListener("loadeddata", (e) => {
    window.music.play();
    window.music.playbackRate = current_speed;
    load_playlist();
  });
  display_title();
}

function next_one() {
  let index = current_index;
  if (current_index == playlist.length - 1 && was_in_action == false) {
    current_index = 0;
  } else if (was_in_action == false) {
    current_index++;
  }

  if (random == true) {
    let value = parseInt(Math.random() * (playlist.length - 1));
    while (value == index) {
      value = parseInt(Math.random() * (playlist.length - 1));
    }
    current_index = value;
  }

  window.music.src = playlist[current_index].src;
  window.music.addEventListener("loadeddata", (e) => {
    window.music.play();
    window.music.playbackRate = current_speed;
    load_playlist();
  });
  display_title();
}

function prev_mousedown(e) {
  v_moins_timeout = setTimeout((e) => {
    v_moins_interval = setInterval((e) => {
      if (music.currentTime > 0.5) {
        music.currentTime -= 0.5;
      }
    }, 50);
    was_in_action = true;
  }, 500);
}

function prev_mouseup(e) {
  if (v_moins_interval) {
    clearInterval(v_moins_interval);
  }
  if (v_moins_timeout) {
    clearTimeout(v_moins_timeout);
    v_moins_timeout = setTimeout((e) => {
      was_in_action = false;
    }, 10);
  }
}

function next_click(e) {
  next_one();
  verify_visualizer();
}

function next_mousedown(e) {
  v_plus_timeout = setTimeout((e) => {
    v_plus_interval = setInterval((e) => {
      if (music.currentTime < parseInt(music.duration)) {
        music.currentTime += 0.5;
      }
    }, 50);
    was_in_action = true;
  }, 500);
}

function next_mouseup(e) {
  if (v_plus_interval) {
    clearInterval(v_plus_interval);
  }
  if (v_plus_timeout) {
    clearTimeout(v_plus_timeout);
    v_plus_timeout = setTimeout((e) => {
      was_in_action = false;
    }, 10);
  }
}
