import { getGames } from '../api/game.api.js';
import { renderCarousel } from '../view/index.view.js';

const popularCarousel = document.getElementById('popularGamesCarousel');
const prevPopular = document.getElementById('prevSlidePopular');
const nextPopular = document.getElementById('nextSlidePopular');

const latestCarousel = document.getElementById('latestGamesCarousel');
const prevLatest = document.getElementById('prevSlide');
const nextLatest = document.getElementById('nextSlide');

// scroll de la largeur de la carte
const scrollCarousel = (carousel, direction) => {
  const card = carousel.querySelector(':scope > *');
  if (!card) return;
  const cardWidth = card.offsetWidth + 24; // 24px = gap-6
  carousel.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
};

const init = async () => {
  const popular = await getGames(1, '', [], 'rating-desc');
  const latest = await getGames(1, '', [], '');

  renderCarousel(popularCarousel, popular.games, false);
  renderCarousel(latestCarousel, latest.games, true);
};

prevPopular?.addEventListener('click', () => scrollCarousel(popularCarousel, -1));
nextPopular?.addEventListener('click', () => scrollCarousel(popularCarousel, 1));

prevLatest?.addEventListener('click', () => scrollCarousel(latestCarousel, -1));
nextLatest?.addEventListener('click', () => scrollCarousel(latestCarousel, 1));

init();