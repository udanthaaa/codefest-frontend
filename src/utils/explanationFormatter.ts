export const formatExplanationContent = (content: string): string => {
    const lines = content.split("\n"); // Split content into lines
    
    // Map through the lines and format the content
    const formattedLines = lines
      .map((line) => {
        // Handle the "Business Implications" line and remove the ### marks, make it bold and increase font size
        if (line.startsWith("###")) {
          line = line.replace("###", "").trim(); // Remove the ### marks
          // Apply bold and increased font size for this specific line
          return `<p style="font-size: 1.2em; font-weight: bold;">${line}</p>`;
        }
  
        if (line.startsWith("- ")) {
          // Extract the icon and the rest of the text
          const iconMatch = line.match(/^- ([\u{1F300}-\u{1FAFF}])/u); // Match emoji with the 'u' flag
          const icon = iconMatch ? iconMatch[1] : ""; // Extract icon
          const text = line.replace(/^- [\u{1F300}-\u{1FAFF}]\s*/u, ""); // Remove "- [icon] " part
          return `<li><span>${icon}</span> ${text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</li>`;
        }
        return line; // Return non-bullet content as is
      })
      .filter((line) => line.trim() !== ""); // Remove empty lines
  
    // Add space between points and wrap in <ul> tags
    return `<ul>${formattedLines.join("</li><br><li>")}</ul>`;
  };
  
  // Function to add a point
  export const addPointToContent = (content: string, newPoint: string): string => {
    return `${content}\n- ${newPoint}`;
  };
  