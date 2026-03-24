function distance(a, b) {
  return Math.sqrt(
    (a.lat - b.lat) ** 2 +
    (a.lng - b.lng) ** 2
  );
}

function optimize(orders) {
  if (orders.length === 0) return [];

  let route = [];
  let current = orders[0];
  route.push(current);

  let remaining = orders.slice(1);

  while (remaining.length) {
    let nearest = remaining[0];
    let min = distance(current, nearest);

    for (let o of remaining) {
      let d = distance(current, o);
      if (d < min) {
        min = d;
        nearest = o;
      }
    }

    route.push(nearest);
    current = nearest;
    remaining = remaining.filter(x => x !== nearest);
  }

  return route;
}

module.exports = optimize;