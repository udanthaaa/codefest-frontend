export const formatExplanationContent = (content: string): string => {
  const lines = content.split("\n");

  const formattedLines = lines
    .map((line) => {
      if (line.startsWith("###")) {
        line = line.replace("###", "").trim();
        return `<p style="font-size: 1.2em; font-weight: bold;">${line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</p>`;
      }

      if (line.startsWith("- ")) {
        const iconMatch = line.match(/^- ([\u{1F300}-\u{1FAFF}])/u);
        const icon = iconMatch ? iconMatch[1] : "";
        const text = line.replace(/^- [\u{1F300}-\u{1FAFF}]\s*/u, "");
        return `<li><span>${icon}</span> ${text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</li>`;
      }

      return line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    })
    .filter((line) => line.trim() !== "");

  return `<ul>${formattedLines.join("</li><br><li>")}</ul>`;
};

export const addPointToContent = (content: string, newPoint: string): string => {
  return `${content}\n- ${newPoint}`;
};
