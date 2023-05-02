export function formatDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const dateOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  if (date.toDateString() === today.toDateString()) {
    return `Сегодня, ${formatHoursAndMinutesDate(date)}`;
  } else if (date.toDateString() === yesterday.toDateString()) {
    return `Вчера, ${formatHoursAndMinutesDate(date)}`;
  } else {
    return `${formatHoursAndMinutesDate(date)}`;
  }
}

export function formatHoursAndMinutesDate(date) {
  const formatDate = new Date(date);
  let hours = date.getHours().toString().padStart(2, "0"); // Получаем часы и добавляем ведущий ноль, если нужно
  let minutes = formatDate.getMinutes().toString().padStart(2, "0"); // Получаем минуты и добавляем ведущий ноль, если нужно
  return `${hours}:${minutes}`; // Возвращаем строку в формате "чч:мм"
}
