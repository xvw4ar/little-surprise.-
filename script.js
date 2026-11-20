const audio = document.getElementById('song');
const playBtn = document.getElementById('playBtn');
const playIcon = playBtn.querySelector('.play-icon');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');
const playerCard = document.querySelector('.player-card');

function timeLabel(seconds) {
  if (!Number.isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}
function updatePlayState() {
  const playing = !audio.paused;
  playIcon.textContent = playing ? 'Ⅱ' : '▶';
  playBtn.setAttribute('aria-label', playing ? 'Pause song' : 'Play song');
  playerCard.classList.toggle('playing', playing);
}
playBtn.addEventListener('click', async () => {
  if (audio.paused) {
    try { await audio.play(); } catch (e) { alert('The song could not be played. Please check that song.m4a is uploaded beside index.html.'); }
  } else audio.pause();
  updatePlayState();
});
audio.addEventListener('play', updatePlayState);
audio.addEventListener('pause', updatePlayState);
audio.addEventListener('loadedmetadata', () => duration.textContent = timeLabel(audio.duration));
audio.addEventListener('timeupdate', () => {
  currentTime.textContent = timeLabel(audio.currentTime);
  progress.style.width = audio.duration ? `${audio.currentTime / audio.duration * 100}%` : '0%';
});
document.getElementById('continueBtn').addEventListener('click', () => {
  document.getElementById('welcome').classList.remove('active');
  document.getElementById('letter').classList.add('active');
  window.scrollTo({top: 0, behavior: 'smooth'});
});
