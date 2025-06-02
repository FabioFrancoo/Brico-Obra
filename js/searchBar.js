export function initSearchBar() {
  const searchInput = document.getElementById('searchInput');
  const suggestionsList = document.getElementById('suggestionsList');
  const searchBtn = document.getElementById('searchBtn');

  if (!searchInput || !suggestionsList || !searchBtn) return;

  const suggestions = [
    "Martelo", "Parafusos", "Tintas", "Serra elétrica", "Lâmpadas LED",
    "Ferramentas manuais", "Rolo de pintura", "Lixas", "Chave inglesa", "Capacete"
  ];

  let activeIndex = -1;

  function filterSuggestions(value) {
    if (!value) return [];
    return suggestions.filter(s => s.toLowerCase().includes(value.toLowerCase()));
  }

  function renderSuggestions(list) {
    if (list.length === 0) {
      suggestionsList.classList.add('hidden');
      suggestionsList.innerHTML = '';
      return;
    }
    suggestionsList.classList.remove('hidden');
    suggestionsList.innerHTML = list.map((item, i) =>
      `<li data-index="${i}" tabindex="0" class="suggestion-item">${item}</li>`
    ).join('');
  }

  searchInput.addEventListener('input', () => {
    const filtered = filterSuggestions(searchInput.value);
    renderSuggestions(filtered);
    activeIndex = -1;
  });

  searchInput.addEventListener('keydown', (e) => {
    const items = suggestionsList.querySelectorAll('li');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % items.length;
      items.forEach(i => i.classList.remove('highlight'));
      items[activeIndex].classList.add('highlight');
      items[activeIndex].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + items.length) % items.length;
      items.forEach(i => i.classList.remove('highlight'));
      items[activeIndex].classList.add('highlight');
      items[activeIndex].focus();
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      searchInput.value = items[activeIndex].textContent;
      suggestionsList.classList.add('hidden');
      redirectToSearch(searchInput.value);
    }
  });

  suggestionsList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
      searchInput.value = e.target.textContent;
      suggestionsList.classList.add('hidden');
      redirectToSearch(searchInput.value);
    }
  });

  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (searchInput.value.trim()) {
      redirectToSearch(searchInput.value);
    }
  });

function redirectToSearch(query) {
  const currentPath = window.location.pathname.toLowerCase(); // lowercase por segurança
  let targetPath;

  // Se a página atual tem "_logged" no nome, redireciona para a versão logged
  if (currentPath.includes("_loged")) {
    targetPath = "pesquisa_capacete_loged.html";
  } else if (currentPath.includes("/html/")) {
    // Outras páginas na pasta /html/
    targetPath = "pesquisa_capacete.html";
  } else {
    // Homepage ou fora da pasta /html/
    targetPath = "html/pesquisa_capacete.html";
  }

  window.location.href = `${targetPath}?query=${encodeURIComponent(query)}`;
}


}


