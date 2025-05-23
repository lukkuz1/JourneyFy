export function formatTime(timestamp) {
  const date = timestamp?.toDate ? timestamp.toDate() : new Date();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const mm = minutes.toString().padStart(2, "0");
  return `${hours.toString().padStart(2, "0")}:${mm} ${ampm}`;
}
