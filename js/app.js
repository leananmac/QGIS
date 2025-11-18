

// Global State
let favorites = JSON.parse(localStorage.getItem('campusMapFavorites') || '[]');

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('campusMapTheme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('campusMapTheme', newTheme);
    updateThemeIcon(newTheme);
    showToast(newTheme === 'dark' ? 'Dark mode enabled' : 'Light mode enabled');
}

function updateThemeIcon(theme) {
    document.getElementById('theme-toggle').textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Favorites Management
function toggleFavorite(id) {
    const idx = favorites.indexOf(id);
    if (idx > -1) {
        favorites.splice(idx, 1);
        showToast('Removed from favorites');
    } else {
        favorites.push(id);
        showToast('Added to favorites');
    }
    localStorage.setItem('campusMapFavorites', JSON.stringify(favorites));
    updateFavoritesList();
    addMarkersToMap();
}

function updateFavoritesList() {
    const list = document.getElementById('favorites-list');
    
    if (favorites.length === 0) {
        list.innerHTML = '<p style="color: var(--text-secondary); font-size: 0.875rem;">No favorites yet. Click ★ to add facilities.</p>';
        return;
    }
    
    list.innerHTML = '';
    favorites.forEach(id => {
        const feature = facilitiesData.features.find(f => f.properties.id === id);
        if (!feature) return;
        
        const div = document.createElement('div');
        div.className = 'favorite-item';
        div.innerHTML = `
            <span>${feature.properties.name}</span>
            <button class="remove-favorite" data-id="${id}">×</button>
        `;
        
        div.querySelector('span').addEventListener('click', () => {
            const coords = feature.geometry.coordinates;
            map.setView([coords[1], coords[0]], 18);
        });
        
        list.appendChild(div);
    });
}

// Autocomplete
function setupAutocomplete() {
    const input = document.getElementById('facility-search');
    const dropdown = document.getElementById('autocomplete-dropdown');
    let timeout;
    
    input.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            const query = input.value.trim().toLowerCase();
            
            if (query.length < 2) {
                dropdown.classList.remove('show');
                return;
            }
            
            const matches = facilitiesData.features.filter(f =>
                f.properties.name.toLowerCase().includes(query)
            ).slice(0, 5);
            
            if (matches.length === 0) {
                dropdown.classList.remove('show');
                return;
            }
            
            dropdown.innerHTML = matches.map(f => `
                <div class="autocomplete-item" data-id="${f.properties.id}">
                    ${f.properties.name}
                </div>
            `).join('');
            
            dropdown.classList.add('show');
        }, 300);
    });
    
    dropdown.addEventListener('click', (e) => {
        if (e.target.classList.contains('autocomplete-item')) {
            const id = e.target.getAttribute('data-id');
            const feature = facilitiesData.features.find(f => f.properties.id === id);
            if (feature) {
                input.value = feature.properties.name;
                dropdown.classList.remove('show');
                const coords = feature.geometry.coordinates;
                map.setView([coords[1], coords[0]], 18);
            }
        }
    });
    
    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });
}

// Toast Notification
function showToast(message, duration = 2000) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
}

// Event Listeners
function setupEventListeners() {
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    
    document.querySelectorAll('.filter-checkbox').forEach(cb => {
        cb.addEventListener('change', addMarkersToMap);
    });
    
    document.getElementById('facility-search').addEventListener('input', addMarkersToMap);
    
    document.getElementById('select-all').addEventListener('click', () => {
        document.querySelectorAll('.filter-checkbox').forEach(cb => cb.checked = true);
        addMarkersToMap();
    });
    
    document.getElementById('select-none').addEventListener('click', () => {
        document.querySelectorAll('.filter-checkbox').forEach(cb => cb.checked = false);
        addMarkersToMap();
    });
    
    document.getElementById('toggle-sidebar').addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('hidden');
    });
    
    document.getElementById('get-directions').addEventListener('click', () => {
        const start = document.getElementById('start-point').value;
        const end = document.getElementById('end-point').value;
        if (!start || !end) {
            showToast('Please select start and destination');
            return;
        }
        if (start === end) {
            showToast('Start and destination must be different');
            return;
        }
        createRoute(start, end);
    });
    
    document.getElementById('clear-route').addEventListener('click', () => {
        clearRoute();
        document.getElementById('start-point').value = '';
        document.getElementById('end-point').value = '';
        showToast('Route cleared');
    });
    
    document.getElementById('swap-route').addEventListener('click', () => {
        const start = document.getElementById('start-point');
        const end = document.getElementById('end-point');
        const temp = start.value;
        start.value = end.value;
        end.value = temp;
    });
    
    document.getElementById('use-my-location').addEventListener('click', () => {
        locateUser();
        setTimeout(() => {
            document.getElementById('start-point').value = '__my_location__';
        }, 500);
    });
    
    document.getElementById('locate-me').addEventListener('click', locateUser);
    
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('set-start')) {
            document.getElementById('start-point').value = e.target.getAttribute('data-id');
            showToast('Starting point set');
        }
        if (e.target.classList.contains('set-end')) {
            document.getElementById('end-point').value = e.target.getAttribute('data-id');
            showToast('Destination set');
        }
        if (e.target.classList.contains('add-favorite')) {
            toggleFavorite(e.target.getAttribute('data-id'));
        }
        if (e.target.classList.contains('remove-favorite')) {
            toggleFavorite(e.target.getAttribute('data-id'));
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    if (typeof initMap === 'function') initMap();
    setupEventListeners();
    if (typeof setupAutocomplete === 'function') setupAutocomplete();
    updateFavoritesList();
});