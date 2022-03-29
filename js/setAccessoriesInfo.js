const total = document.getElementById('total');
const accessoriesList = document.getElementById('accessories-list');
const accessoriesTotal = document.getElementById('acc-total');

(function () {
  total.innerHTML = localStorage.getItem('total');

  const chosenAccessories = JSON.parse(localStorage.getItem('chosenAccessories'));

  accessoriesTotal.innerHTML = `Accessories total ${Object.values(chosenAccessories).reduce(
    (acc, curr) => acc + curr,
    0
  )}DKK`;

  accessoriesList.innerHTML = Object.keys(chosenAccessories).reduce(
    (a, curr) => a + `<li>${curr}: ${chosenAccessories[curr]}</li>`,
    ""
  );
})();