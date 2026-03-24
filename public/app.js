let map = L.map('map').setView([28.61, 77.23], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
.addTo(map);

// click map → auto fill
map.on('click', function(e) {
  document.getElementById("lat").value = e.latlng.lat;
  document.getElementById("lng").value = e.latlng.lng;
});

async function addOrder() {
  const location = document.getElementById("location").value;
  const lat = document.getElementById("lat").value;
  const lng = document.getElementById("lng").value;

  await fetch("/orders/add", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ location, lat, lng })
  });

  alert("Added");
}

async function getOrders() {
  const res = await fetch("/orders");
  const data = await res.json();

  data.forEach(o => {
    L.marker([o.lat, o.lng])
      .addTo(map)
      .bindPopup(o.location);
  });
}

async function optimizeRoute() {
  const res = await fetch("/orders/optimize");
  const data = await res.json();

  let points = data.route.map(o => [o.lat, o.lng]);

  L.polyline(points, { color: "red" }).addTo(map);

  alert("AI says:\n" + data.explanation);
}