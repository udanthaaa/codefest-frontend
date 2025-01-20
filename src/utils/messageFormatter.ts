/* eslint-disable prefer-const */

// Function to format the message content
export const formatMessageContent = (content: string): string => {
    // Split the content into individual lines based on newlines
    const lines = content.split('\n');
    let formattedContent = '';
    let inList = false;
  
    // Iterate through each line to process it
    for (let line of lines) {
      const numberMatch = line.match(/^(\d+)\.\s*(.*)/);
      
      // If the line is a numbered list item
      if (numberMatch) {
        if (!inList) {
          formattedContent += '<div class="space-y-3">';
          inList = true;
        }
        
        // Add the list item to the formatted content, including a numbered circle for the list number
        formattedContent += `
          <div class="flex items-start gap-3 pl-2">
            <div class="flex items-center justify-center w-6 h-6 rounded-full bg-sysco-blue/10 shrink-0">
              <span class="text-sysco-blue text-sm font-semibold">${numberMatch[1]}</span>
            </div>
            <div class="flex-1 pt-0.5">${numberMatch[2]}</div>
          </div>
        `;
      } else {
        
        // If we're in a list but the current line is not part of the list, close the list container
        if (inList) {
          formattedContent += '</div>';
          inList = false;
        }
        formattedContent += line + '\n';
      }
    }
  
    // If we're still in a list at the end, close the list container
    if (inList) {
      formattedContent += '</div>';
    }
  
    // Replace bold markdown (e.g., '**bold text**') with HTML <strong> tags
    return formattedContent.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="font-semibold">$1</strong>'
    );
  };