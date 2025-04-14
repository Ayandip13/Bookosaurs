//This function will convert the createdAt to this format : "May 2023"

export function formatMemberSince(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const isSameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  if (isSameDay(date, now)) {
    return "Joined Today";
  } else if (isSameDay(date, yesterday)) {
    return "Joined Yesterday";
  } else {
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `Joined on ${month} ${year}`;
  }
}


//this function will convert the createdAt to this format: "May 15, 2023"

export function formatPublishDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const isSameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  const formatTime = (date) =>
    `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}`;

  if (isSameDay(date, now)) {
    return `Today at ${formatTime(date)}`;
  } else if (isSameDay(date, yesterday)) {
    return `Yesterday at ${formatTime(date)}`;
  } else {
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return `${formattedDate} at ${formatTime(date)}`;
  }
}
