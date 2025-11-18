# Muteesa I University Campus Navigation Map

A web-based GIS application for helping students navigate the Muteesa I University campus and locate facilities easily. Now enhanced with dark theme, favorites, search autocomplete, marker clustering, and indoor mapping demo.

## Features

- Interactive map displaying 19 university facilities with clustering for better performance
- Detailed information popups for each facility with images
- Category filtering (academic, residential, service)
- Simple routing between selected points
- Mobile-friendly interface with sidebar toggle
- Dark/Light theme toggle (persisted in localStorage)
- Search with autocomplete suggestions
- Favorites list for quick access (localStorage)
- Indoor mapping demo for Main Lecture Hall using Leaflet Indoor plugin (toggle in sidebar)
- User location detection and integration with routing

## Technologies Used

- HTML, CSS, JavaScript
- Leaflet.js for map display
- Leaflet Routing Machine for routing functionality
- Leaflet.markercluster for marker clustering
- Leaflet Indoor for indoor floor plans
- GeoJSON for storing facility data

## Project Structure

- `index.html`: Main application page
- `css/styles.css`: Enhanced stylesheet with dark theme
- `js/`: JavaScript files (app.js, map.js, data.js, indoor.js)
- `img/`: Images for facilities and UI elements

## Setup Instructions

1. Clone this repository
2. Ensure `img/` folder has facility images (or placeholders will show)
3. Open `index.html` in a web browser
4. For indoor view: Click "Enter Main Lecture Hall" in sidebar (demo data)

## Project Requirements

This project was developed as part of the Web-Based GIS Applications assignment, which required:
1. A working web-based GIS application
2. A dataset containing at least 15 mapped points with relevant attributes
3. Category filtering functionality
4. Simple routing between points
5. A report describing the development process

Enhancements added: Advanced plugins, indoor mapping, UI polish, accessibility.

## Demo

- Live demo: [Insert GitHub Pages link]
- Indoor view shows sample rooms/corridors on levels 0-1 for Main Lecture Hall.