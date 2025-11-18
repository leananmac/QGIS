// Map initialization and functionality with image support

// Global State
let map;
let markerCluster;
let routingControl;
let userLocationMarker;
let userLatLng;

// Initialize map after DOM is ready
function initMap() {
    map = L.map('map').setView([0.306431460775709, 32.55439396255769], 17);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    markerCluster = L.markerClusterGroup({
        maxClusterRadius: 50,
        spiderfyOnMaxZoom: true
    });
    map.addLayer(markerCluster);

    addMarkersToMap();
    addLegend(); // Add the legend control
}

// Add Legend Control
function addLegend() {
    const legend = L.control({ position: 'topright' });
    legend.onAdd = function (map) {
        const div = L.DomUtil.create('div', 'legend');
        div.innerHTML = `
            <div class="legend-title">Facility Legend</div>
            <div class="legend-item">
                <span class="legend-color academic"></span>
                <span class="legend-label">Academic</span>
            </div>
            <div class="legend-item">
                <span class="legend-color residential"></span>
                <span class="legend-label">Residential</span>
            </div>
            <div class="legend-item">
                <span class="legend-color service"></span>
                <span class="legend-label">Service</span>
            </div>
        `;
        return div;
    };
    legend.addTo(map);
}

// Create Custom Icon
function createCustomIcon(category) {
    const colors = {
        academic: '#0891b2',
        residential: '#16A34A',
        service: '#f59e0b'
    };
    const color = colors[category] || '#6B7280';
    
    return L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.4);"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
    });
}

// Create Popup Content
function createPopupContent(feature) {
    const props = feature.properties;
    const emoji = { academic: '🎓', residential: '🏠', service: '⚙️' }[props.category] || '📍';
    
    // Build image HTML if image exists
    let imageHtml = '';
    if (props.image) {
        imageHtml = `
            <img src="${props.image}" 
                 alt="${props.name}" 
                 class="popup-image"
                 onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="popup-image-placeholder" style="display:none;">
                <span>${emoji}</span>
            </div>
        `;
    } else {
        imageHtml = `
            <div class="popup-image-placeholder">
                <span>${emoji}</span>
            </div>
        `;
    }
    
    return `
        <div class="popup-content">
            ${imageHtml}
            <div class="popup-header">${props.name}</div>
            <div class="popup-category">${props.category}</div>
            <div class="popup-description">${props.description}</div>
            <div class="popup-actions">
                <button class="popup-button set-start" data-id="${props.id}">Set as Start</button>
                <button class="popup-button set-end" data-id="${props.id}">Set as Destination</button>
            </div>
        </div>
    `;
}

// Add Markers to Map
function addMarkersToMap() {
    markerCluster.clearLayers();
    
    const checkedCategories = Array.from(document.querySelectorAll('.filter-checkbox:checked'))
        .map(cb => cb.value);
    
    // If no categories checked, show all (default behavior)
    const allCategories = ['academic', 'residential', 'service'];
    const effectiveCategories = checkedCategories.length > 0 ? checkedCategories : allCategories;
    
    const query = document.getElementById('facility-search').value.trim().toLowerCase();
    
    const filtered = facilitiesData.features.filter(f => {
        const inCategory = effectiveCategories.includes(f.properties.category);
        const matchesSearch = !query || f.properties.name.toLowerCase().includes(query);
        return inCategory && matchesSearch;
    });
    
    filtered.forEach(feature => {
        const coords = feature.geometry.coordinates;
        const marker = L.marker([coords[1], coords[0]], {
            icon: createCustomIcon(feature.properties.category)
        });
        
        marker.bindPopup(createPopupContent(feature), { maxWidth: 300 });
        marker.feature = feature;
        markerCluster.addLayer(marker);
    });
    
    document.getElementById('results-count').textContent = filtered.length;
    updateFacilityList(filtered);
    updateRoutingOptions(filtered);
}

// Update Facility List
function updateFacilityList(features) {
    const list = document.getElementById('facilities-list');
    list.innerHTML = '';
    
    if (features.length === 0) {
        list.innerHTML = '<li style="padding: 1rem; text-align: center; color: var(--text-secondary);">No facilities match your filters</li>';
        return;
    }
    
    features.forEach(feature => {
        const props = feature.properties;
        const isFavorite = favorites.includes(props.id);
        const li = document.createElement('li');
        li.innerHTML = `
            <span style="cursor: pointer;">${props.name}</span>
            <button class="add-favorite ${isFavorite ? 'active' : ''}" data-id="${props.id}">★</button>
        `;
        
        li.querySelector('span').addEventListener('click', () => {
            const coords = feature.geometry.coordinates;
            map.setView([coords[1], coords[0]], 18);
            markerCluster.eachLayer(layer => {
                if (layer.feature?.properties.id === props.id) {
                    layer.openPopup();
                }
            });
        });
        
        list.appendChild(li);
    });
}

// Update Routing Options
function updateRoutingOptions(features) {
    const startSelect = document.getElementById('start-point');
    const endSelect = document.getElementById('end-point');
    
    startSelect.innerHTML = '<option value="">Select starting point...</option>';
    endSelect.innerHTML = '<option value="">Select destination...</option>';
    
    if (userLatLng) {
        startSelect.innerHTML += '<option value="__my_location__">📍 My Location</option>';
        endSelect.innerHTML += '<option value="__my_location__">📍 My Location</option>';
    }
    
    features.forEach(f => {
        const opt = `<option value="${f.properties.id}">${f.properties.name}</option>`;
        startSelect.innerHTML += opt;
        endSelect.innerHTML += opt;
    });
}

// Routing Functions
function createRoute(startId, endId) {
    if (routingControl) clearRoute();
    
    let startPoint, endPoint;
    
    if (startId === '__my_location__') {
        if (!userLatLng) { showToast('Location not available'); return; }
        startPoint = userLatLng;
    } else {
        const f = facilitiesData.features.find(f => f.properties.id === startId);
        if (!f) return;
        startPoint = L.latLng(f.geometry.coordinates[1], f.geometry.coordinates[0]);
    }
    
    if (endId === '__my_location__') {
        if (!userLatLng) { showToast('Location not available'); return; }
        endPoint = userLatLng;
    } else {
        const f = facilitiesData.features.find(f => f.properties.id === endId);
        if (!f) return;
        endPoint = L.latLng(f.geometry.coordinates[1], f.geometry.coordinates[0]);
    }
    
    routingControl = L.Routing.control({
        waypoints: [startPoint, endPoint],
        routeWhileDragging: false,
        lineOptions: { styles: [{ color: '#0891b2', opacity: 0.8, weight: 5 }] },
        createMarker: () => null
    }).addTo(map);
    
    showToast('Route calculated');
}

function clearRoute() {
    if (routingControl) {
        map.removeControl(routingControl);
        routingControl = null;
    }
}

// Location Functions
function locateUser() {
    if (!navigator.geolocation) {
        showToast('Geolocation not supported');
        return;
    }
    
    navigator.geolocation.getCurrentPosition(pos => {
        userLatLng = L.latLng(pos.coords.latitude, pos.coords.longitude);
        
        if (userLocationMarker) map.removeLayer(userLocationMarker);
        
        userLocationMarker = L.circleMarker(userLatLng, {
            radius: 8,
            color: '#0891b2',
            fillColor: '#06b6d4',
            fillOpacity: 0.9,
            weight: 3
        }).addTo(map).bindTooltip('You are here', { permanent: false });
        
        map.setView(userLatLng, 18);
        updateRoutingOptions(facilitiesData.features);
        showToast('Location found');
    }, err => {
        showToast('Unable to get location');
    });
}

// Expose functions for app.js
window.initMap = initMap;
window.addMarkersToMap = addMarkersToMap;
window.updateFacilityList = updateFacilityList;
window.updateRoutingOptions = updateRoutingOptions;
window.createRoute = createRoute;
window.clearRoute = clearRoute;
window.locateUser = locateUser;