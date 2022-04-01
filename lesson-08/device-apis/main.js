const geolocation = document.querySelector("#geolocation");
const network = document.querySelector("#network-status");
const text = document.querySelector("#text-content");
const readBtn = document.querySelector("#speak");
const copyBtn = document.querySelector("#copy-to-clipboard");
const shareBtn = document.querySelector("#share");

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
    getNetworkStatus();
  } catch (error) {
    console.log(error);
    geolocation.innerHTML = "Not found.";
  }
}

function getNetworkStatus() {
  if (navigator.onLine) {
    network.innerHTML = "Online";
  } else {
    network.innerHTML = "Offline";
  }
}

window.addEventListener("online", function (e) {
  network.innerHTML = "Online";
});
window.addEventListener("offline", () => {
  network.innerHTML = "Offline";
});

readBtn.addEventListener("click", () => readText());

function readText() {
  if ("speechSynthesis" in window) {
    // Speech Synthesis supported 🎉
    var msg = new SpeechSynthesisUtterance();
    msg.text = text.value;
    window.speechSynthesis.speak(msg);
  } else {
    // Speech Synthesis Not Supported 😣
    alert("Sorry, your browser doesn't support text to speech!");
  }
}

copyBtn.addEventListener("click", () => copyToClipboard());

function copyToClipboard() {
  navigator.clipboard.writeText(text.value).then(() => {
    copyBtn.classList.add("text-amber-700");
    setTimeout(() => {
      copyBtn.classList.remove("text-amber-700");
    }, 1000);
  });
}

shareBtn.addEventListener("click", () => shareText());

async function shareText() {
  try {
    const data = {
      text: text.value,
      title: "Your message",
    };
    await navigator.share(data);
  } catch (err) {
    console.log(err);
  }
}
