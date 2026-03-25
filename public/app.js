let map = L.map('map').setView([20.5937, 78.9629], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
.addTo(map);

let markers = [];
let polyline;
let selectedLocation = null;

// 🔥 Address → Lat/Lng
async function getCoordinates(address) {
  const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
  const data = await res.json();

  if (data.length === 0) {
    alert("Location not found ❌");
    return null;
  }

  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon)
  };
}

// 📍 Use My Location
function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition((position) => {

    selectedLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    document.getElementById("locationInput").value = "Current Location";

    alert("Location detected ✅");

  }, () => {
    alert("Location access denied ❌");
  });
}

// ➕ Add Order
async function addOrder() {

  let location = document.getElementById("locationInput").value;
  let coords;

  if (selectedLocation) {
    coords = selectedLocation;
  } else {
    coords = await getCoordinates(location);
  }

  if (!coords) return;

  // marker
  const marker = L.marker([coords.lat, coords.lng])
    .addTo(map)
    .bindPopup(location);

  markers.push(marker);

  // backend save
  await fetch("/orders/add", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      location,
      lat: coords.lat,
      lng: coords.lng
    })
  });

  alert("Order Added ✅");
}

// 📦 Get Orders
async function getOrders() {
  const res = await fetch("/orders");
  const data = await res.json();

  markers.forEach(m => map.removeLayer(m));
  markers = [];

  data.forEach(o => {
    const marker = L.marker([o.lat, o.lng])
      .addTo(map)
      .bindPopup(o.location);

    markers.push(marker);
  });
}

// 🤖 Optimize Route
async function optimizeRoute() {
  const res = await fetch("/orders/optimize");
  const data = await res.json();

  let points = data.route.map(o => [o.lat, o.lng]);

  if (polyline) map.removeLayer(polyline);

  polyline = L.polyline(points, { color: "red" }).addTo(map);

  alert(data.explanation);
}