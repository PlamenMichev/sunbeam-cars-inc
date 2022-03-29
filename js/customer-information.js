const postalCodes = document.getElementById("postalCode");
const customerInfoForm = document.getElementById('customer-details');

async function setPostalCodes() {
  const fetchText = (url) => fetch(url).then((r) => r.json()); // 1

  const [dk] = await Promise.all([
    fetchText(
      `https://raw.githubusercontent.com/mauricedoepke/zipcodelist/main/city_to_zip-DK.json`
    ),
  ]);
  const dkArr = Object.entries(dk).map(([key, value]) => {
    return { name: key, value: value[0] };
  });
  const towns = [...dkArr];
  postalCodes.innerHTML = towns
    .slice(4)
    .reduce(
      (acc, curr) =>
        acc +
        `<option value=${curr.value}>${curr.name} - ${curr.value}</option>`,
      ""
    );
}

(function () {
  setPostalCodes();

  customerInfoForm.addEventListener('submit', function (e) {
    const streetName = document.getElementById('streetName').value;
    const postalCode = document.getElementById('postalCode').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const floor = document.getElementById('floor').value;

    localStorage.setItem('customer-info', JSON.stringify({
      streetName,
      postalCode,
      firstName,
      lastName,
      floor
    }));
  })
})();