document.addEventListener("DOMContentLoaded", function () {
  const dayInput = document.getElementById("dayInput");
  const monthInput = document.getElementById("monthInput");
  const yearInput = document.getElementById("yearInput");
  const button = document.getElementById("button");

  // Select the error messages within the input items
  const dayErrorMessage = document.querySelector("#dayInput + .error");
  const monthErrorMessage = document.querySelector("#monthInput + .error");
  const yearErrorMessage = document.querySelector("#yearInput + .error");

  // Select the result spans
  const yearsSpan = document.getElementById("yearsSpan");
  const monthsSpan = document.getElementById("monthsSpan");
  const daysSpan = document.getElementById("daysSpan");

  function displayError(inputElement, errorMessage) {
    inputElement.style.borderColor = "red";
    errorMessage.style.display = "block";
  }

  function resetError(inputElement, errorMessage) {
    inputElement.style.borderColor = "";
    errorMessage.style.display = "none";
  }

  function calculateAge(birthDate) {
    const currentDate = new Date();
    const birthDateObj = new Date(birthDate);

    if (isNaN(birthDateObj.getTime())) {
      return null; 
    }

    const ageInMilliseconds = currentDate - birthDateObj;

    const years = Math.floor(
      ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000)
    );
    const months = Math.floor(
      (ageInMilliseconds % (365.25 * 24 * 60 * 60 * 1000)) /
        (30.44 * 24 * 60 * 60 * 1000)
    );
    const days = Math.floor(
      (ageInMilliseconds % (30.44 * 24 * 60 * 60 * 1000)) /
        (24 * 60 * 60 * 1000)
    );

    return {
      years: years,
      months: months,
      days: days,
    };
  }

  button.addEventListener("click", function () {
    resetError(dayInput, dayErrorMessage);
    resetError(monthInput, monthErrorMessage);
    resetError(yearInput, yearErrorMessage);

    const birthDate = `${yearInput.value}-${monthInput.value}-${dayInput.value}`;
    const age = calculateAge(birthDate);

    if (age === null) {
      displayError(dayInput, dayErrorMessage); 
      return;
    }


    yearsSpan.textContent = age.years;
    monthsSpan.textContent = age.months;
    daysSpan.textContent = age.days;
  });
});
