const date = new Date();
//const today = new Date();
// obtener la fecha de hoy en formato `MM/DD/YYYY`
export const DateNow = date.toLocaleDateString("en-US");

// obtener la hora de hoy en formato `HH:MM:SS`
export const HourNow = date.toLocaleTimeString("en-US");

