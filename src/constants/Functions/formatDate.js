export function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const dateOptions = {
      hour: '2-digit',
      minute: '2-digit'
    };
    
    if (date.toDateString() === today.toDateString()) {
      return `Сегодня, ${date.toLocaleTimeString([], dateOptions).slice(1, -3)}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Вчера, ${date.toLocaleTimeString([], dateOptions).slice(1, -3)}`;
    } else {
      return `${date.toLocaleString().slice(1, -3)}`;
    }
  }