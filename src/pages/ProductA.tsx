import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonSelect, IonSelectOption, IonInput,
  IonButton, IonText, IonMenuButton, IonButtons
} from '@ionic/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductA: React.FC = () => {
  const token = localStorage.getItem('token');
  const [productos, setProductos] = useState<any[]>([]);
  const [almacenes, setAlmacenes] = useState<any[]>([]);
  const [form, setForm] = useState({ idProducto: '', idAlmacen: '', cantidad: '', precio: '' });
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodRes = await axios.get('http://localhost:3000/Productos/OProductos', {
          headers: { Authorization: token}
        });
        const almRes = await axios.get('http://localhost:3000/Almacen', {
          headers: { Authorization: token }
        });
        setProductos(prodRes.data);
        setAlmacenes(almRes.data);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };
    fetchData();
  }, [token]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:3000/ProductoA', form, {
        headers: { Authorization: token }
      });
      setMensaje(res.data.mensaje);
    } catch {
      setMensaje('Error: debes estar autorizado con un token válido');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
                <IonMenuButton />
            </IonButtons>
          <IonTitle>Agregar Producto al Almacén</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">

        <IonItem>
          <IonLabel position="floating">Seleccionar Producto</IonLabel>
          <IonSelect name="idProducto" onIonChange={handleChange}>
            {productos.map((p) => (
              <IonSelectOption key={p.idProducto} value={p.idProducto}>
                {p.producto}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Seleccionar Almacén</IonLabel>
          <IonSelect name="idAlmacen" onIonChange={handleChange}>
            {almacenes.map((a) => (
              <IonSelectOption key={a.idAlmacen} value={a.idAlmacen}>
                {a.nombre}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Cantidad</IonLabel>
          <IonInput name="cantidad" onIonChange={handleChange}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Precio</IonLabel>
          <IonInput name="precio" onIonChange={handleChange}></IonInput>
        </IonItem>

        <IonButton expand="block" onClick={handleSubmit}>Agregar</IonButton>
        {mensaje && <p>{mensaje}</p>}
      </IonContent>
    </IonPage>
  );
};

export default ProductA;
