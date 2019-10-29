const form = document.querySelector('.url-form');
const result = document.querySelector('.result-section');
const origin = window.location;
form.addEventListener('submit', event => {
  event.preventDefault();

  const input = document.querySelector('.url-input');
  fetch('/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: input.value
    })
  })
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      while (result.hasChildNodes()) {
        result.removeChild(result.lastChild);
      }

      result.insertAdjacentHTML(
        'afterbegin',
        `
        <div class="result">
          <a target="_blank" class="short-url" rel="noopener" href="${origin}${data.id}">
            ${origin}${data.id}
          </a>
        </div>
      `
      );
    })
    .catch(console.error);
});
