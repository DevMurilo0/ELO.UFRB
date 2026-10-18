// Datas civis no fuso do projeto; comparação ISO não sofre deslocamento UTC.
export const TIME_ZONE = 'America/Bahia';
export function calendarDay(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {timeZone: TIME_ZONE, year:'numeric', month:'2-digit', day:'2-digit'}).format(now);
}
export function validDay(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0,10) === value;
}
export function partitionEvents(events, today = calendarDay()) {
  if (!validDay(today)) throw new Error('Data de referência inválida: ' + today);
  const dated = events.filter(event => validDay(event.date));
  const upcoming = dated.filter(event => (event.endDate || event.date) >= today && !['cancelled','postponed'].includes(event.status))
    .sort((a,b) => a.date.localeCompare(b.date) || a.slug.localeCompare(b.slug));
  const past = dated.filter(event => (event.endDate || event.date) < today)
    .sort((a,b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
  return {upcoming, past};
}
