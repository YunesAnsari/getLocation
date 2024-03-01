
const btn = document.querySelector(".h1 button")
console.log(btn)
btn.addEventListener("click", getLocationInformation);

function getLocationInformation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

function onSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const country = data.address.country;
      const state = data.address.state;
      const detailedLocation = data.display_name;

      document.getElementById("country").textContent = country;
      document.getElementById("state").textContent = state;
      document.getElementById("location").textContent = detailedLocation;
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

function onError(error) {
  console.error("Error:", error.message);
}

const container = document.querySelector(".container")

window.onload = function () {
  container.classList.remove("hide-container")
}