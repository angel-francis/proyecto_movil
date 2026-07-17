import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonSearchbar,
  IonButton,
  IonMenuButton,
  IonButtons,
  useIonViewWillEnter
} from '@ionic/react';
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Style } from '@capacitor/status-bar';

const Administrador: React.FC = () => {
    const history = useHistory();
  const usuario = localStorage.getItem('usuario');
  const token = localStorage.getItem('token');

  const [productos, setProductos] = useState<any[]>([]);
  const [termino, setTermino] = useState('');
  const [pagina, setPagina] = useState(1);
  const [total, setTotal] = useState(0);
  const limite = 6;

  const buscarProductos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/Productos/Buscar', {
        headers: { Authorization: token },
        params: { termino, pagina }
      });

      setProductos(response.data.productos);
      setTotal(response.data.totalProductos);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  useEffect(() => {
    if (token) buscarProductos();
  }, [pagina, termino]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
           <IonButtons slot="start">
              <IonMenuButton />
          </IonButtons>
          <IonTitle className="ion-padding">Panel del Administrador</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>{usuario}</h2>

       <IonButton
          expand="block"
          color="primary"
          routerLink="/Administrador/AgregarProducto"
          routerDirection="forward">
          Agregar Producto
      </IonButton>

        <IonSearchbar
          value={termino}
          onIonChange={(e) => setTermino(e.detail.value!)}
          placeholder="Buscar producto o categoría"
        />

        <IonGrid>
          <IonRow>
            {Array.isArray(productos) &&
              productos.map((p) => (
                <IonCol size="6" sizeMd="4" sizeLg="3"   key={p.idProducto}>
                  <IonCard style={
                    {
                        margin: '10px',
                        textAlign: 'justify',
                        padding: '10px',
                        maxWidth: '220px',
                        height: '320px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }
                  }>
                
                    <IonImg src={p.imagen} alt={p.producto} />
                    <IonCardHeader>
                      <IonCardTitle style={{ fontSize: '0.85rem', textAlign: 'justify'}}>{p.producto}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent style={{ fontSize: '0.85rem', textAlign: 'justify' }}>
                      <strong>Descripcion:</strong><p>{p.descripcion}</p>
                      <strong>Categoría:</strong> {p.categoria}
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
          </IonRow>
        </IonGrid>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <IonButton disabled={pagina === 1} onClick={() => setPagina(pagina - 1)}>
            Anterior
          </IonButton>
          <IonButton disabled={pagina * limite >= total} onClick={() => setPagina(pagina + 1)}>
            Siguiente
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Administrador;



