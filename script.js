document.addEventListener("DOMContentLoaded", function () {
  // Initialize map container safely
  const mapElement = document.getElementById("sri-lanka-map");
  if (!mapElement) return;

  const map = L.map("sri-lanka-map", {
    scrollWheelZoom: false // Prevents accidental scrolling on mobile
  }).setView([7.2, 80.0], 8);

  // Load OpenStreetMap Map Tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Updated Route Stops including Negombo as the starting point
  const routeStops = [
    {
      day: "Arrival",
      title: "Negombo",
      stay: "Airport / Arrival Transfer",
      coords: [7.2083, 79.8358],
      desc: "Arrival in Sri Lanka and transfer toward the mountains."
    },
    {
      day: "Day 1",
      title: "Nuwara Eliya",
      stay: "Araliya Red",
      coords: [6.9497, 80.7891],
      desc: "Tea plantation tour & Gregory Lake walk."
    },
    {
      day: "Day 2",
      title: "Ella",
      stay: "Flower Garden Hotel",
      coords: [6.8667, 81.0466],
      desc: "Scenic train ride, Nine Arch Bridge, Ravana Falls & Little Adam's Peak."
    },
    {
      day: "Day 3",
      title: "Yala",
      stay: "Kithala Resort",
      coords: [6.3726, 81.3323],
      desc: "Exciting Yala National Park wildlife safari."
    },
    {
      day: "Day 4",
      title: "Mirissa",
      stay: "Mandara Resort",
      coords: [5.9482, 80.4716],
      desc: "Koggala Lagoon boat ride & Sea Turtle Hatchery visit."
    }
  ];

  const routeCoords = [];

  // Add Custom Numbered Markers & Popups (1 to 5)
  routeStops.forEach((stop, index) => {
    routeCoords.push(stop.coords);

    // Numbered Circle Pin Marker (1, 2, 3, 4, 5)
    const customIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `<span>${index + 1}</span>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    const popupContent = `
      <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px; max-width: 220px;">
        <span style="background:#0284c7; color:white; font-size:11px; font-weight:bold; padding:2px 8px; border-radius:10px;">${stop.day}</span>
        <h6 style="margin: 6px 0 2px 0; font-weight:800; color:#0f172a; font-size: 14px;">${stop.title}</h6>
        <p style="font-size:12px; margin:0; color:#334155;"><strong>Stay:</strong> ${stop.stay}</p>
        <p style="font-size:12px; margin-top:4px; color:#1e293b; line-height: 1.4;">${stop.desc}</p>
      </div>
    `;

    L.marker(stop.coords, { icon: customIcon })
      .addTo(map)
      .bindPopup(popupContent);
  });

  // Draw Dashed Route Line Connecting the Destinations
  const polyline = L.polyline(routeCoords, {
    color: '#0284c7',
    weight: 4,
    opacity: 0.85,
    dashArray: '6, 8'
  }).addTo(map);

  // Auto Fit Map View to show all Pins cleanly
  const fitMapBounds = () => {
    const isMobile = window.innerWidth < 768;
    const paddingVal = isMobile ? [15, 15] : [35, 35];
    map.fitBounds(polyline.getBounds(), { padding: paddingVal });
  };

  fitMapBounds();

  // Recalculate on screen resize or orientation change
  window.addEventListener('resize', () => {
    map.invalidateSize();
    fitMapBounds();
  });
});
