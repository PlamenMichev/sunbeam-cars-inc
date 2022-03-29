const carName = document.getElementById('car-name')
const pickUp = document.getElementById('pick-up')
const handIn = document.getElementById('hand-in')
const days = document.getElementById('days')
const carRentalCost = document.getElementById('rental-cost');
const totalPrice = document.getElementById('total');

(function () {
  const car = JSON.parse(localStorage.getItem('car'));

  carName.innerHTML = car.model;
  pickUp.innerHTML = localStorage.getItem('pickUpDate');
  handIn.innerHTML = localStorage.getItem('handInDate');
  days.innerHTML = localStorage.getItem('days');
  carRentalCost.innerHTML = car.carRentPrice;
  totalPrice.innerHTML = car.carRentPrice;
})();