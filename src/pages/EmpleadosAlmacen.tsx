import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  useIonViewWillEnter
} from "@ionic/react";
import axios from "axios";

const EmpleadosAlmacen: React.FC = () => {
  const [empleados, setEmpleados] = useState<any[]>([]);
  const [almacenes, setAlmacenes] = useState<any[]>([]);
  const [idEmpleado, setIdEmpleado] = useState<number | null>(null);
  const [idAlmacen, setIdAlmacen] = useState<number | null>(null);

  const token = localStorage.getItem("token");

  //Función para cargar datos
  const cargarDatos = async () => {
    try {
      const [resEmpleados, resAlmacenes] = await Promise.all([
        axios.get("http://localhost:3000/Productos/EmpleadosA", {
          headers: { Authorization: token },
        }),
        axios.get("http://localhost:3000/Almacen", {
          headers: { Authorization: token },
        }),
      ]);
      setEmpleados(resEmpleados.data);
      setAlmacenes(resAlmacenes.data);
    } catch (err) {
      console.error("Error al cargar datos:", err);
    }
  };

  useIonViewWillEnter(() => {
    cargarDatos();
  }, []);

  // Función para asignar encargado
  const asignarEncargado = async () => {
    try {
      await axios.post(
        "http://localhost:3000/AlmacenE",
        { idAlmacen, idEmpleado },
        { headers: { Authorization: token } }
      );

      alert("Encargado asignado correctamente");

      //Limpiar campos
      setIdEmpleado(null);
      setIdAlmacen(null);

      //Recargar datos automáticamente
      cargarDatos();
    } catch (error) {
      console.error(error);
      alert("Error al asignar encargado ");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="ion-padding">Asignar encargado de almacén</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonSelect
          placeholder="Seleccionar empleado"
          value={idEmpleado}
          onIonChange={(e) => setIdEmpleado(e.detail.value)}
        >
          {empleados.map((emp) => (
            <IonSelectOption key={emp.idEmpleado} value={emp.idEmpleado}>
              {emp.nombreCompleto}
            </IonSelectOption>
          ))}
        </IonSelect>

        <IonSelect
          placeholder="Seleccionar almacén"
          value={idAlmacen}
          onIonChange={(e) => setIdAlmacen(e.detail.value)}
        >
          {almacenes.map((al) => (
            <IonSelectOption key={al.idAlmacen} value={al.idAlmacen}>
              {al.nombre}
            </IonSelectOption>
          ))}
        </IonSelect>

        <IonButton expand="block" onClick={asignarEncargado}>
          Asignar encargado
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default EmpleadosAlmacen;

