let map = L.map('map').setView([20.5937, 78.9629], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
.addTo(map);

let polyline;

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
    L.marker([o.lat, o.lng]).addTo(map);
  });
}

async function optimizeRoute() {
  const res = await fetch("/orders/optimize");
  const data = await res.json();

  let points = data.route.map(o => [o.lat, o.lng]);

  if (polyline) map.removeLayer(polyline);

  polyline = L.polyline(points, { color: "red" }).addTo(map);

  alert(data.explanation);
}