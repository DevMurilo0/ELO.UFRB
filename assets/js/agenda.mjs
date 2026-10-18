import { calendarDay } from './calendar.mjs';
// Reclassifica também abas deixadas abertas e páginas restauradas pelo navegador.
function refreshAgenda() {
  const today = calendarDay();
  const homeCards = [...document.querySelectorAll('[data-home-event]')];
  const next = homeCards.find(card => card.dataset.eventEnd >= today);
  for (const card of homeCards) card.hidden = card !== next;
  const fallback = document.querySelector('[data-home-agenda-empty]');
  if (fallback) fallback.hidden = Boolean(next);
  const future = document.querySelector('[data-agenda-upcoming]');
  const past = document.querySelector('[data-agenda-past]');
  if (!future || !past) return;
  const cards = [...document.querySelectorAll('[data-event-end]')];
  for (const card of cards) (card.dataset.eventEnd < today ? past : future).append(card);
  for (const [container, reverse] of [[future,false],[past,true]]) {
    [...container.children].sort((a,b) => (reverse ? -1 : 1) * a.dataset.eventDate.localeCompare(b.dataset.eventDate)).forEach(card => container.append(card));
  }
  const empty = document.querySelector('[data-agenda-empty]');
  if (empty) empty.hidden = future.children.length > 0;
  const heading = document.querySelector('[data-agenda-heading]');
  if (heading) heading.textContent = 'Próximas atividades';
}
refreshAgenda();
addEventListener('pageshow', refreshAgenda);
document.addEventListener('visibilitychange', () => {if (!document.hidden) refreshAgenda();});
setInterval(refreshAgenda, 60000);
