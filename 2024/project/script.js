// Observer animasi fade-in
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });
});


// ==================== AUDIO PLAYER ====================
const songCards = document.querySelectorAll('.song-card, .album-card');
const audio = document.getElementById('audio');
const miniPlayer = document.getElementById('mini-player');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const closeBtn = document.getElementById('close-player');
const trackProgress = document.getElementById('track-progress');
const volumeSlider = document.getElementById("volume-slider");
const volumeIcon = document.getElementById("volume-icon");
const repeatBtn = document.getElementById('repeat');
const volumeBtn = document.getElementById('volume');
const lyricsBtn = document.getElementById('lyrics-button');
const lyricsPanel = document.getElementById('lyrics-panel');
const closeLyricsBtn = document.getElementById('close-lyrics');
const lyricsTitle = document.getElementById('lyrics-title');
const lyricsLines = document.getElementById('lyrics-lines');


let songs = [];
let currentSongIndex = 0;

// Collect all songs from cards
songCards.forEach(card => {
  const src = card.getAttribute('data-src');
  if (src) songs.push(src);
});

// BLOG CARD KLIK -> pindah halaman
document.querySelectorAll('.blog-card').forEach(card => {
  card.addEventListener('click', () => {
    const link = card.getAttribute('data-link');
    if (link) {
      window.location.href = link;
    }
  });
});

// Play song when card is clicked
songCards.forEach((card, index) => {
  card.addEventListener('click', () => {
    if (card.getAttribute('data-src')) {
      currentSongIndex = index;
      playSong();
    }
  });
});

// Main play function
function playSong() {
  if (songs.length === 0) return;

  const card = songCards[currentSongIndex];
  const src = songs[currentSongIndex];

  // Ambil data tambahan
  const title = card.querySelector('h3')?.innerText || "Unknown Title";
  const artist = card.querySelector('p')?.innerText || "Unknown Artist";
  const img = card.querySelector('img')?.src || "";

  // Set audio & info
  audio.src = src;
  audio.play().then(() => {
    miniPlayer.style.display = 'flex';
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';

    // Update info di mini player
    document.getElementById('mini-title').textContent = title;
    document.getElementById('mini-artist').textContent = artist;
    document.getElementById('mini-thumbnail').src = img;
  }).catch(error => {
    console.error('Playback failed:', error);
  });
}


// Play/Pause toggle
playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    if (audio.src) {
      audio.play();
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else if (songs.length > 0) {
      playSong();
    }
  } else {
    audio.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
});

// Next song
nextBtn.addEventListener('click', () => {
  if (songs.length === 0) return;
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  playSong();
});

// Previous song
prevBtn.addEventListener('click', () => {
  if (songs.length === 0) return;
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  playSong();
});

// Tombol close mini player
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    const miniPlayer = document.getElementById('mini-player');
    miniPlayer.style.display = 'none';
    audio.pause();
  });
}


// Update progress bar
audio.addEventListener('timeupdate', () => {
  if (!isNaN(audio.duration)) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    trackProgress.value = progressPercent;
    trackProgress.style.setProperty('--progress', `${progressPercent}%`);
  }
});

// Seek functionality
trackProgress.addEventListener('input', () => {
  const seekTime = (trackProgress.value / 100) * audio.duration;
  audio.currentTime = seekTime;
  trackProgress.style.setProperty('--progress', `${trackProgress.value}%`);
});

// Seek functionality
trackProgress.addEventListener('input', () => {
  const seekTime = (trackProgress.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

// Handle song ending
audio.addEventListener('ended', () => {
  nextBtn.click(); // Auto-play next song when current ends
});

// Format waktu
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Update waktu
audio.addEventListener('timeupdate', () => {
  const currentTime = document.getElementById('current-time');
  const duration = document.getElementById('duration');
  
  currentTime.textContent = formatTime(audio.currentTime);
  
  if (!isNaN(audio.duration)) {
    duration.textContent = formatTime(audio.duration);
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    trackProgress.value = progressPercent;
  }
});

window.addEventListener('scroll', () => {
  const heroText = document.getElementById('hero-text');
  const musicSection = document.getElementById('music');

  if (!heroText || !musicSection) return;

  const musicTop = musicSection.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;

  let progress = 1 - musicTop / screenHeight;
  progress = Math.max(0, Math.min(1, progress));

  const translateY = 0 + progress * 150;
  const opacity = 1 - progress * 1.5;

  heroText.style.transform = `translate(-50%, calc(-50% + ${translateY}px))`;

  // cuma ngubah opacity kalau udah show
  if (heroText.classList.contains('show')) {
    heroText.style.opacity = opacity < 0 ? 0 : opacity;
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const heroText = document.getElementById('hero-text');
  if (heroText) {
    setTimeout(() => {
      heroText.classList.add('show');
    }, 200); // delay dikit biar dramatis
  }
});

window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });



// Ulang lagu dari awal
repeatBtn.addEventListener('click', () => {
  audio.currentTime = 0;
  audio.play();
});

// Volume toggle besar kecil
let isMuted = false;
volumeBtn.addEventListener('click', () => {
  isMuted = !isMuted;
  audio.volume = isMuted ? 0 : 1;
  volumeBtn.innerHTML = isMuted
    ? '<i class="fas fa-volume-mute"></i>'
    : '<i class="fas fa-volume-up"></i>';
});


// Fungsi untuk parsing file LRC
function parseLRC(lrcText) {
  const lines = lrcText.split('\n');
  const result = [];
  
  lines.forEach(line => {
    // Match timestamps like [mm:ss.xx]
    const timeMatches = line.match(/\[(\d+):(\d+\.?\d*)\]/g);
    if (!timeMatches) return;

    const text = line.replace(/\[.*?\]/g, '').trim();
    if (!text) return;

    timeMatches.forEach(timeMatch => {
      const [, minutes, seconds] = timeMatch.match(/\[(\d+):(\d+\.?\d*)\]/);
      const time = parseFloat(minutes) * 60 + parseFloat(seconds);
      result.push({ time, text });
    });
  });

  // Sort by time
  return result.sort((a, b) => a.time - b.time);
}


lyricsBtn.addEventListener('click', async () => {
  const title = document.getElementById('mini-title').textContent;
  const currentCard = [...songCards].find(card => 
    card.querySelector('h3')?.innerText === title
  );

  const lyricsUrl = currentCard?.getAttribute('data-lyrics');
  lyricsTitle.textContent = '-';
  lyricsLines.innerHTML = '<p>Loading lyrics...</p>';
  lyricsPanel.classList.add('show');

  if (!lyricsUrl) {
    lyricsLines.innerHTML = '<p>Lirik tidak tersedia</p>';
    return;
  }

  try {
    const response = await fetch(lyricsUrl);
    if (!response.ok) throw new Error('Failed to fetch lyrics');
    
    const lrcText = await response.text();
    const parsedLyrics = parseLRC(lrcText);
    
    if (parsedLyrics.length === 0) {
      lyricsLines.innerHTML = '<p>Format lirik tidak valid</p>';
      return;
    }

    lyricsLines.innerHTML = parsedLyrics.map(line => 
      `<p class="lyric-line" data-time="${line.time}">${line.text}</p>`
    ).join('');

    audio.addEventListener('timeupdate', highlightCurrentLyric);
    highlightCurrentLyric();

  } catch (error) {
    console.error('Error loading lyrics:', error);
    lyricsLines.innerHTML = '<p>Gagal memuat lirik</p>';
  }
});

closeLyricsBtn.addEventListener('click', () => {
  lyricsPanel.classList.remove('show');
  audio.removeEventListener('timeupdate', highlightCurrentLyric);
});

// Fungsi untuk highlight lirik sesuai waktu
function highlightCurrentLyric() {
  const currentTime = audio.currentTime;
  const lyricElements = document.querySelectorAll('.lyric-line');
  
  let activeLine = null;
  
  lyricElements.forEach(line => {
    line.classList.remove('active');
    const lineTime = parseFloat(line.getAttribute('data-time'));
    
    if (lineTime <= currentTime) {
      activeLine = line;
    }
  });
  
  if (activeLine) {
    activeLine.classList.add('active');
    // Auto-scroll ke lirik aktif
    activeLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// Hapus listener saat panel lirik ditutup
document.addEventListener("DOMContentLoaded", function () {
  const merchItems = document.querySelector('.merch-items');
  const merchItemList = merchItems.querySelectorAll('.merch-item');

  merchItemList.forEach(item => {
    item.addEventListener('mouseenter', () => {
      merchItemList.forEach(el => el.classList.add('blurred'));
      item.classList.remove('blurred');
    });

    item.addEventListener('mouseleave', () => {
      merchItemList.forEach(el => el.classList.remove('blurred'));
    });
  });
});

