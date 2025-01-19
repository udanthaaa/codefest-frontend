/* eslint-disable prefer-const */
export const formatMessageContent = (content: string): string => {
    const lines = content.split('\n');
    let formattedContent = '';
    let inList = false;
  
    for (let line of lines) {
      const numberMatch = line.match(/^(\d+)\.\s*(.*)/);
      
      if (numberMatch) {
        if (!inList) {
          formattedContent += '<div class="space-y-3">';
          inList = true;
        }
        
        formattedContent += `
          <div class="flex items-start gap-3 pl-2">
            <div class="flex items-center justify-center w-6 h-6 rounded-full bg-sysco-blue/10 shrink-0">
              <span class="text-sysco-blue text-sm font-semibold">${numberMatch[1]}</span>
            </div>
            <div class="flex-1 pt-0.5">${numberMatch[2]}</div>
          </div>
        `;
      } else {
        if (inList) {
          formattedContent += '</div>';
          inList = false;
        }
        formattedContent += line + '\n';
      }
    }
  
    if (inList) {
      formattedContent += '</div>';
    }
  
    return formattedContent.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="font-semibold">$1</strong>'
    );
  };