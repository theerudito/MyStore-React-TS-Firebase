const date = new Date();
//const today = new Date();
// obtener la fecha de hoy en formato `MM/DD/YYYY`
export const DateNow = date.toLocaleDateString("en-US");
// cambiar el formato de la fecha a `YYYY-MM-DD`
export const DateNowFormat = DateNow.split("/").reverse().join("-");

// obtener la hora de hoy en formato `HH:MM:SS`
export const HourNow = date.toLocaleTimeString("en-US");
