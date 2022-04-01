const geolocation = document.querySelector("#geolocation");
let latitude;
let longitude;

for (const button of document.querySelectorAll("button[id]")) {
  button.addEventListener("click", () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        getLocation();
      });
    } else {
      console.log("doesn't work");
    }
  });
}
async function getLocation() {
  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    geolocation.innerHTML = await data.locality;
  } catch (error) {
    console.log(error);
    geolocation.innerHTML = "Not found.";
  }
}
