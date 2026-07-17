import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonMenuButton,
  useIonViewWillEnter
} from "@ionic/react";
import axios from "axios";

const MostrarOAE: React.FC = () => {
  const [almacenes, setAlmacenes] = useState<any[]>([]);

  useIonViewWillEnter(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3000/AlmacenE/OAE", {
        headers: { Authorization: token },
      })
      .then((res) => {
        setAlmacenes(res.data.OAE);
      })
      .catch((err) => {
        console.error("Error al obtener datos:", err);
      });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
             <IonMenuButton />
            </IonButtons>
          <IonTitle className="ion-padding">Encargados de Almacén</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          {almacenes.map((alm) => (
            <IonItem key={alm.idAlmacen}>
              <IonLabel>
                <h2>{alm.nombre}</h2>
                <p><strong>Descripcion: </strong>{alm.descripcion}</p>
                <p><strong>Encargado: </strong> {alm.Encargado}</p>
                <p><strong>Fecha: </strong> {new Date(alm.fecha).toLocaleString()}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default MostrarOAE;
