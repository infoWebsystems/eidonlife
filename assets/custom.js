const sizeChartBtn = document.querySelector('.size-chart-page');
const modal = document.querySelector('.size-guide-inner');
const overlay = document.querySelector('.size-guide-overlay');
const closeModal = document.querySelector('.close');

sizeChartBtn.addEventListener('click', () => {
  modal.classList.add('modal-open');
  overlay.classList.add('overlay-visible');
});

overlay.addEventListener('click', () => {
  modal.classList.remove('modal-open');
  overlay.classList.remove('overlay-visible');
});

closeModal.addEventListener('click', () => {
  modal.classList.remove('modal-open');
  overlay.classList.remove('overlay-visible');
});
