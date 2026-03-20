import dayjs from "dayjs";
export const CUTOFF_DATE = new Date("2011-02-17T00:00:00");
export const INTRO_STEP_DURATION = 1300;
export const INTRO_END_DELAY = 1700;

export function parseDateInput(dateString) {
  if (!dateString) {
    return null;
  }

  const parsedDate = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
}

export function isAfterCutoff(date) {
  if (!date) {
    return false;
  }

  return dayjs(date).isBefore(CUTOFF_DATE);
}

export function calculateAge(dateString) {
  const birthDate = parseDateInput(dateString);
  if (!birthDate) {
    return null;
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  const hasBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hasBirthdayPassed) {
    age -= 1;
  }

  return age;
}

export function formatDate(dateString) {
  if (!dateString) {
    return "";
  }

  const [year, month, day] = dateString.split("-");
  if (!year || !month || !day) {
    return "";
  }

  return `${day}/${month}/${year}`;
}
