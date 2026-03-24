const API = "https://delivery-app-nu7f.onrender.com"; // 🔴 apna actual link daal

let map = L.map("map").setView([22.9734, 78.6569], 5);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap",
}).addTo(map);

let markers = [];
let polyline = null;

async function addOrder() {
  const location = document.getElementById("location").value;
  const lat = document.getElementById("lat").value;
  const lng = document.getElementById("lng").value;

  await fetch(`${API}/orders/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ location, lat, lng }),
  });

  alert("Order Added ✅");
}

async function getOrders() {
  const res = await fetch(`${API}/orders`);
  const data = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  markers.forEach((m) => map.removeLayer(m));
  markers = [];

  data.forEach((o) => {
    const li = document.createElement("li");
    li.innerText = o.location;
    list.appendChild(li);

    const marker = L.marker([o.lat, o.lng])
      .addTo(map)
      .bindPopup(o.location);

    markers.push(marker);
  });
}

async function optimizeRoute() {
  const res = await fetch(`${API}/orders/optimize`);
  const data = await res.json();

  let points = data.route.map((o) => [o.lat, o.lng]);

  if (polyline) map.removeLayer(polyline);

  polyline = L.polyline(points, { color: "red" }).addTo(map);

  alert(data.explanation);
}