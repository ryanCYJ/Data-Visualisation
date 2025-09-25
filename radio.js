document.addEventListener('DOMContentLoaded', () => {
  const indicator = document.getElementById('indicator');
  const items = document.querySelectorAll('.timeline-item');
  const radios = document.querySelectorAll('input[name="yearFilter"]');

  radios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      const selectedTime = e.target.value;
      const targetItem = Array.from(items).find(item => item.dataset.time === selectedTime);
      if (targetItem) {
        const offsetTop = targetItem.offsetTop;
        indicator.style.top = offsetTop + 'px';
      }
    });
  });

  const initRadio = document.querySelector('input[name="yearFilter"]:checked');
  if (initRadio) initRadio.dispatchEvent(new Event('change'));
});