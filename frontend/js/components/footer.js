(function () {
  const html = `
    <footer class="bg-gray-900/70 backdrop-blur-md border-t-2 border-indigo-600/50 mt-12 p-6 flex flex-col items-center gap-4">
      <p class="text-lg font-extrabold text-indigo-400 drop-shadow-lg">Contact</p>
      <p class="text-white/80 text-sm mt-2">&copy; 2025 GameFinder. Tous droits réservés.</p>
      <div class="text-white/80 text-sm mt-2">
        <p>API fourni par : <a class="text-red-700 font-black" href="https://rawg.io/">Rawg</a></p>
      </div>
      <div class="flex gap-4 text-xs text-gray-400 mt-2">
        <a href="/pages/mentions_legales.html" class="hover:text-indigo-400 transition underline underline-offset-2">Mentions légales</a>
        <span aria-hidden="true">·</span>
        <a href="/pages/politique_confidentialite.html" class="hover:text-indigo-400 transition underline underline-offset-2">Politique de confidentialité</a>
      </div>
    </footer>
  `;

  document.body.insertAdjacentHTML('beforeend', html);
})();