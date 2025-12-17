// import { useEffect } from "react";

// type TourPlan = {
//   day_no: number;
//   activity: string;
//   location_coordinates: string;
// };

// type Props = {
//   tourplans: TourPlan[];
// };

// const MapMultipleLocations = ({ tourplans }: Props) => {
//   useEffect(() => {
//     if (!window.google) {
//       const script = document.createElement("script");
//       script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`; // Replace with your key
//       script.async = true;
//       script.defer = true;
//       script.onload = initMap;
//       document.head.appendChild(script);
//     } else {
//       initMap();
//     }

//     function initMap() {
//       if (!tourplans || tourplans.length === 0) return;

//       const bounds = new google.maps.LatLngBounds();

//       const map = new google.maps.Map(
//         document.getElementById("map") as HTMLElement,
//         {
//           zoom: 10,
//           center: { lat: 0, lng: 0 },
//         }
//       );

//       tourplans.forEach((plan) => {
//         const [lat, lng] = plan.location_coordinates
//           .split(",")
//           .map(Number);

//         const marker = new google.maps.Marker({
//           position: { lat, lng },
//           map,
//           title: plan.activity,
//         });

//         bounds.extend(marker.getPosition()!);
//       });

//       map.fitBounds(bounds); // Auto-zoom to fit all markers
//     }
//   }, [tourplans]);

//   return <div id="map" style={{ width: "100%", height: "450px" }}></div>;
// };

// export default MapMultipleLocations;
