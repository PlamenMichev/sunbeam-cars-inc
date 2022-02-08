const main = document.querySelector('main');
const form = document.querySelector('form');

let cars = [];

fetch('./data/cars.json')
  .then((data) => data.json())
  .then((dataJson) => {
    cars = dataJson;
    renderCars(cars);
  })

function renderCars(carsArr) {
  for(const car of carsArr) {
    const carBody = `
      <section class="car">
      <div class="general-info">
          <img src="${car.image}" alt="${car.model}"/>

          <div class="about">
              <h2>${car.model}</h2>
              <p>Persons: ${car.persons}</p>
              <p>Suitcases: ${car.bags}</p>
              <p>Type: ${car.type}</p>
          </div>
      </div>

          <div class="price">
              <p>${car.price} DKK</p>
              <button>Book Now</button>
          </div>
      </section>
  `

    main.insertAdjacentHTML('beforeend', carBody);
  }
}



form.addEventListener('submit', function (e) {
  e.preventDefault();

  const persons = document.getElementById('persons').value;
  const bags = document.getElementById('suitcases').value;

  const filteredCars = cars.filter((car) => car.persons >= persons && car.bags >= bags);

  main.innerHTML = '';

  renderCars(filteredCars);
})

