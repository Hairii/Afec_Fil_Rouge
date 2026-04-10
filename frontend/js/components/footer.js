(function () {
  const html = `
    <footer class="bg-gray-900/70 backdrop-blur-md border-t-2 border-indigo-600/50 mt-12 p-6 flex flex-col items-center gap-4">
      <p class="text-lg font-extrabold text-indigo-400 drop-shadow-lg">Contact</p>
      <p class="text-white/80 text-sm mt-2">&copy; 2025 GameFinder. Tous droits réservés.</p>
      <div class="text-white/80 text-sm mt-2">
        <p>API fourni par : <a class="text-red-700 font-black" href="https://rawg.io/">Rawg</a></p>
      </div>
    </footer>
  `;

  document.body.insertAdjacentHTML('beforeend', html);
})();