const streetName = document.getElementById('streetName');
const postalCode = document.getElementById('postalCode');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');

(function () {
  const customerInfo = JSON.parse(localStorage.getItem('customer-info'));

  streetName.innerHTML = customerInfo.streetName;
  postalCode.innerHTML = customerInfo.postalCode;
  firstName.innerHTML = customerInfo.firstName;
  lastName.innerHTML = customerInfo.lastName;

  document.getElementById('print').addEventListener('click', function () {
    localStorage.clear();
  })
})();