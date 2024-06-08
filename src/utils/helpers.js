
/**
 
 * @param {Date} date 
 * @param {string} format 
 * @return {string} 
 */
export function formatDateTime(date, format = 'DD/MM/YYYY | HH:MM:SS') {
    if (!(date instanceof Date)) return '';
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');
  
    return format
      .replace('DD', day)
      .replace('MM', month)
      .replace('YYYY', year)
      .replace('HH', hour)
      .replace('MM', minute)
      .replace('SS', second);
  }
  