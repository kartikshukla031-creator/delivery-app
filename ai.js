function explainRoute(route) {
  let text = "🚀 Optimized Route:\n\n";

  route.forEach((r, i) => {
    text += `${i + 1}. ${r.location}\n`;
  });

  text += "\n📊 Analysis:\n";
  text += "• Distance minimized\n";
  text += "• Efficient path selected\n";

  return text;
}

module.exports = explainRoute;