import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FormularioConUbicacion() {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacionLink, setUbicacionLink] = useState('');
  const [errorUbicacion, setErrorUbicacion] = useState(null);
  const [cargandoUbicacion, setCargandoUbicacion] = useState(false);
  const [imagen, setImagen] = useState(null)

  useEffect(() => {
    setCargandoUbicacion(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
          setUbicacionLink(googleMapsLink);
          setCargandoUbicacion(false);
        },
        (error) => {
          setErrorUbicacion('No se pudo obtener la ubicación.');
          setCargandoUbicacion(false);
          console.error('Error al obtener la ubicación:', error);
        }
      );
    } else {
      setErrorUbicacion('La geolocalización no es compatible con este navegador.');
      setCargandoUbicacion(false);
    }
  }, []); // Se ejecuta solo una vez al montar el componente

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      name:nombre,
      category:categoria,
      description:descripcion,
      location: ubicacionLink,
    };

    console.log(formData);

    // Aquí puedes enviar formData a tu API
    axios.post('http://localhost:3000/products/register', formData,{
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      console.log(response);
      // Aquí puedes acceder a los datos de la respuesta del backend
      console.log('Respuesta del backend:', response.data);
      // Por ejemplo, si la respuesta contiene un mensaje de éxito:
      if (response.data) {
        const url = response.data.qrCode; /// ojo esto es un nombre dentro de la variable
        const base64Index = url.indexOf('data:image/');
        const imagenBase64 = base64Index !== -1 ? url.slice(base64Index) : '';

        setImagen(imagenBase64);
      } else {
        alert('Error al enviar el formulario: ' + response.data);
      }
      // Si necesitas guardar la respuesta en el estado
    })
    .catch(function (error) {
      console.log(error);
    });

    console.log('Datos del formulario:', formData);
    // Aquí podrías realizar la llamada a tu API
  };

  const formStyle = {
    maxWidth: '400px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  };

  const divStyle = {
    marginBottom: '15px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '3px',
    boxSizing: 'border-box',
  };

  const textareaStyle = {
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '3px',
    boxSizing: 'border-box',
    minHeight: '80px',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  };

  const errorStyle = {
    color: 'red',
    marginTop: '5px',
    fontSize: '0.9em',
  };

  const loadingStyle = {
    color: '#888',
    marginTop: '5px',
    fontSize: '0.9em',
  };

  return (
    <>

{imagen && (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h3>QR Code:</h3>
        <img src={imagen} alt="QR Code" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>
    )}

    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={divStyle}>
        <label htmlFor="nombre" style={labelStyle}>
          Nombre:
        </label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          style={inputStyle}
        />
      </div>
      <div style={divStyle}>
        <label htmlFor="categoria" style={labelStyle}>
          Categoría:
        </label>
        <input
          type="text"
          id="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={divStyle}>
        <label htmlFor="descripcion" style={labelStyle}>
          Descripción:
        </label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          style={textareaStyle}
        />
      </div>
      <div style={divStyle}>
        <label htmlFor="ubicacion" style={labelStyle}>
          Ubicación:
        </label>
        <input
          type="text"
          id="ubicacion"
          value={ubicacionLink}
          readOnly
          style={inputStyle}
        />
        {cargandoUbicacion && <p style={loadingStyle}>Obteniendo ubicación...</p>}
        {errorUbicacion && <p style={errorStyle}>{errorUbicacion}</p>}
      </div>
      <button type="submit" disabled={cargandoUbicacion || errorUbicacion} style={buttonStyle}>
        Guardar
      </button>
    </form>

    {imagen && (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h3>Se muestra un qr arriba del formulario</h3>
      </div>
    )}

    </>
  );
}

export default FormularioConUbicacion;