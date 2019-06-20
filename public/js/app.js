console.log('Called App.js');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const address = search.value;

  fetch('/weather?address=' + address).then((response) => {
    response.json().then((data) => {
      if(data.error){
        return console.log('Error');
      }

      p1.textContent = data.location;
      p2.textContent = data.forcast;

    })
  })
})
