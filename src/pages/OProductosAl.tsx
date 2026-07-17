import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonGrid, IonRow, IonCol, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonImg, IonText, IonMenuButton,IonButtons
} from '@ionic/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const OProductosAl: React.FC = () => {
  const token = localStorage.getItem('token');
  const [productos, setProductos] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/ProductoA/PA', {
          headers: { Authorization: token }
        });
        setProductos(res.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };
    fetchData();
  }, [token]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Productos en Almacén</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">

        <IonGrid>
          <IonRow>
            {Array.isArray(productos) &&
              productos.map((p, index) => (
                <IonCol size="6" sizeMd="4" sizeLg="3" key={index}>
                  <IonCard style={{
                    margin: '10px',
                    textAlign: 'justify',
                    padding: '10px',
                    maxWidth: '220px',
                    height: '360px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    {/* Imagen del producto */}
                    {p.imagen && (
                      <IonImg
                        src={p.imagen}
                        alt={p.producto}
                        style={{
                          width: '100%',
                          height: '150px',
                          objectFit: 'cover',
                          borderRadius: '8px'
                        }}
                      />
                    )}

                    <IonCardHeader>
                      <IonCardTitle style={{ fontSize: '0.85rem', textAlign: 'justify' }}>
                        {p.producto}
                      </IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent style={{ fontSize: '0.85rem', textAlign: 'justify' }}>
                      <strong>Descripción:</strong> {p.descripcion}<br />
                      <strong>Almacén:</strong> {p.nombre}<br />
                      <strong>Cantidad:</strong> {p.cantidad}<br />
                      <strong>Precio unidad:</strong> {p["Precio por unidad"]}<br />
                      <strong>Precio total:</strong> {p["precio total"]}<br />
                      <strong>Registrado por:</strong> {p["Registrado por"]}
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default OProductosAl;
