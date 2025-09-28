document.addEventListener('DOMContentLoaded', () => {
  const indicator = document.getElementById('indicator');
  const items = document.querySelectorAll('.timeline-item');
  const radios = document.querySelectorAll('input[name="yearFilter"]');

  let lastOffsetTop = 0;
  let currentDirection = 0;

  radios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      const selectedTime = e.target.value;
      const targetItem = Array.from(items).find(item => item.dataset.time === selectedTime);
      if (targetItem) {
        const offsetTop = targetItem.offsetTop - 12;

        // check movement direction
        if (offsetTop > lastOffsetTop) {
          currentDirection = 180;
        } else if (offsetTop < lastOffsetTop) {
          currentDirection = 0;
        }

        // apply movement + zoom
        indicator.style.transform = `rotate(${currentDirection}deg) scale(1.5)`;
        indicator.style.top = offsetTop + 'px';

        // reset zoom after a short delay
        setTimeout(() => {
          indicator.style.transform = `rotate(${currentDirection}deg) scale(1)`;
        }, 500);

        lastOffsetTop = offsetTop;
      }
    });
  });

  const initRadio = document.querySelector('input[name="yearFilter"]:checked');
  if (initRadio) initRadio.dispatchEvent(new Event('change'));
});
