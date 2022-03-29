const total = document.getElementById('total');

const accessories = {
  secondDriver: 450,
  bigChildSeat: 95,
  roadsideAid: 320,
  babySeat: 100,
  smallChildSeat: 100,
  gpsNav: 250,
  snowChains: 180,
};

const chosenAccessories = {};

(function () {
  document.querySelectorAll('input[type=checkbox]').forEach((checkbox) => {
    checkbox.addEventListener('change', function (e) {
      const target = e.target;
      const currentTotal = parseFloat(total.innerHTML);

      const accessoryType = target.id;
      const accessoryPrice = accessories[accessoryType];

      if(target.checked) {
        total.innerHTML = currentTotal + accessoryPrice;
        chosenAccessories[accessoryType] = accessoryPrice;
      }
      else {
        total.innerHTML = currentTotal - accessoryPrice;
        delete chosenAccessories[accessoryType];
      }
    })
  })

  document.getElementById('continue-link').addEventListener('click', function (){
    localStorage.setItem('total', total.innerHTML);
    localStorage.setItem('chosenAccessories', JSON.stringify(chosenAccessories));
  })
})();