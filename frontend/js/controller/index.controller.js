import { getGames } from '../api/game.api.js';
import { renderCarousel } from '../view/index.view.js';




// ====== CARROUSEL POPULAIRES ======
const popularCarousel = document.getElementById('popularGamesCarousel');
const prevPopular = document.getElementById('prevSlidePopular');
const nextPopular = document.getElementById('nextSlidePopular');

// ====== CARROUSEL DERNIÈRES SORTIES ======
const latestCarousel = document.getElementById('latestGamesCarousel');
const prevLatest = document.getElementById('prevSlide');
const nextLatest = document.getElementById('nextSlide');

// ====== CHARGEMENT DES JEUX ======
const init = async () => {
  const popular = await getGames(1, '', [], 'rating-desc');
  console.log('popular:', popular); 
  const latest = await getGames(1, '', [], '');
  console.log('latest:', latest); 

renderCarousel(popularCarousel, popular.games, false); 
renderCarousel(latestCarousel, latest.games, true);   
};

// ====== BOUTONS CARROUSEL ======
prevPopular?.addEventListener('click', () => {
  popularCarousel.scrollBy({ left: -300, behavior: 'smooth' });
});
nextPopular?.addEventListener('click', () => {
  popularCarousel.scrollBy({ left: 300, behavior: 'smooth' });
});

prevLatest?.addEventListener('click', () => {
  latestCarousel.scrollBy({ left: -300, behavior: 'smooth' });
});
nextLatest?.addEventListener('click', () => {
  latestCarousel.scrollBy({ left: 300, behavior: 'smooth' });
});

init();