const main = document.querySelector('main');
const form = document.querySelector('form');

const insurance = 495;
const vat = 0.25;
const carRentalPrice = 100;

let cars = [];

fetch('data/cars.json')
  .then((data) => data.json())
  .then((dataJson) => {
    cars = dataJson;
  })

function calcRentalDays(pickUpDate, handInDate) {
  const t2 = new Date(pickUpDate).getTime();
  const t1 = new Date(handInDate).getTime();

  return Math.floor((t1-t2)/(24*3600*1000)) + 1;
}

function calcRentalCost(car, days) {
  return ((insurance + (days * carRentalPrice) + (days * car.supplementPerDay)) * (1 + vat)).toFixed(2)
}

function validateDates(pickUpDate, handInDate) {
  return pickUpDate < handInDate;
}

function renderCars(carsArr, pickUpDate, handInDate) {
  const days = calcRentalDays(pickUpDate, handInDate)

  for(const car of carsArr) {
    const carRentPrice = calcRentalCost(car, days);

    const carBody = `
      <section class="car" id="${car.model}">
          <img src="${car.image}" alt="Car"/>

          <div class="about">
              <h2>${car.model}</h2>
              <p>Persons: ${car.persons}</p>
              <p>Suitcases: ${car.bags}</p>
              <p>Type: ${car.type}</p>
          </div>

          <div class="price">
              <p>${carRentPrice} DKK</p>
              <a href="accesory.html" class="book-car">Book Now</a>
          </div>
      </section>
    `

    main.insertAdjacentHTML('beforeend', carBody);

    car.carRentPrice = carRentPrice;

    const dates = {
      pickUpDate,
      handInDate,
      days
    }

    document.querySelector(`#${car.model} .book-car`).addEventListener('click', bookCarEvent.bind(null, car, dates), false);
  }
}

function bookCarEvent(car, dates , e) {
  localStorage.setItem('car', JSON.stringify(car));
  localStorage.setItem('pickUpDate', new Date(dates.pickUpDate).toLocaleDateString())
  localStorage.setItem('handInDate', new Date(dates.handInDate).toLocaleDateString())
  localStorage.setItem('days', dates.days)
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const pickUpDate = document.getElementById('pickup-date').value;
  const handInDate = document.getElementById('handin-date').value;

  const persons = document.getElementById('persons').value;
  const bags = document.getElementById('suitcases').value;


  if(!validateDates(pickUpDate, handInDate)) {
    alert('Hand in date is before pickup date')
    return;
  }

  const filteredCars = cars.filter((car) => car.persons >= persons && car.bags >= bags);

  main.innerHTML = '';

  renderCars(filteredCars, pickUpDate, handInDate);
})

