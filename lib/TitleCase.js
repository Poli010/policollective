//MAKE THE WORD example TO Example
export function ToTitleCase(string) {
  if (!string || typeof string !== 'string') return ''; // prevent crash
  return string
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}