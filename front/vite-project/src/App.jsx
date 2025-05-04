
import './App.css'
import FormularioConUbicacion from './FormularioConUbicacion';

function App() {

  // const [mapsLink, setMapsLink] = useState('');

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const lat = position.coords.latitude;
  //       const lng = position.coords.longitude;
  //       setMapsLink(`https://www.google.com/maps?q=${lat},${lng}`);
  //     },
  //     (error) => {
  //       console.error('Error al obtener ubicación:', error);
  //     }
  //   );
  // }, []);

  return (
    // <div>
    //   <p>Ubicación en Google Maps:</p>
    //   {mapsLink ? <a href={mapsLink} target="_blank">Ver en Google Maps</a> : <p>Cargando ubicación...</p>}
    // </div>
<div>
      <h1>Formulario con Ubicación</h1>
      <FormularioConUbicacion />
    </div>


  );

}

export default App
