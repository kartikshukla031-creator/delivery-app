function explainRoute(route) {
  const locations = route.map(r => r.location);

  let explanation = "Optimized delivery route selected:\n\n";

  locations.forEach((loc, i) => {
    explanation += `${i + 1}. ${loc}\n`;
  });

  explanation += "\nReason:\n";

  explanation += "• Nearest neighbor algorithm used\n";
  explanation += "• Total travel distance minimized\n";
  explanation += "• Efficient path for faster delivery\n";

  return explanation;
}

module.exports = explainRoute;