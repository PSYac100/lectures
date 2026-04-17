document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('details').forEach((el) => {
    el.setAttribute('open', '');
  });
});