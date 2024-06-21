export function getRuDate(dateDefault) {
  let datePicked = new Date(dateDefault);
  let formatter = new Intl.DateTimeFormat("ru");
  return formatter.format(datePicked).replaceAll(".", "-");
}
