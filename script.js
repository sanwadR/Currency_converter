const Base_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropDown select");

const btn = document.querySelector("form button");
const fromCur = document.querySelector(".from select");
const toCur = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (code in countryList) {
  console.log(code, countryList[code]);
}

for (let select of dropdowns) {
  // This adds options
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    // Set default values for "From" and "To" dropdowns
    if (select.name === "form" && currCode === "INR") {
      newOption.selected = true;
    } else if (select.name === "true" && currCode === "AED") {
      newOption.selected = true;
    }

    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  // currCode --> currency code
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amountVal = amount.value;
  //console.log(amountVal);
  if (amountVal == "" || amountVal < 0) {
    amountVal = 1;
    amount.value = "1";
  }

  const URL = `${Base_URL}/${fromCur.value.toLowerCase()}/${toCur.value.toLowerCase()}.json`;

  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCur.value.toLowerCase()];
  let finalAmount = amountVal * rate;

  msg.innerText = `${amountVal} ${fromCur.value} = ${finalAmount} ${toCur.value}`;
  //   console.log(data);
});
