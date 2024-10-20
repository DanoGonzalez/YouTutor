import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';

// Definimos la interfaz para el usuario
interface User {
    id: string;
    nombre: string;
    email: string;
    password: string; // Asegúrate de manejar esto de forma segura
}

const UsuariosComponent: React.FC = () => {
    const [userData, setUserData] = useState<User[]>([]); // Establecer el tipo de estado como un array de User
    const db = getFirestore(); // Obtén la instancia de Firestore

    useEffect(() => {
        const fetchUsers = async () => {
            const usersCollection = collection(db, 'AC');
            const usersQuery = query(usersCollection);
            console.log('usersQuery type:', usersQuery.type); // Muestra solo el tipo de la consulta

            const usersSnapshot = await getDocs(usersQuery);
            if (!usersSnapshot.empty) {
                const allUsers: User[] = []; // Especificamos el tipo como User[]
                usersSnapshot.forEach((doc) => {
                    const data = doc.data() as Omit<User, 'id'>; // Omitimos 'id' ya que lo añadimos manualmente
                    allUsers.push({ // Agregar cada usuario al array
                        id: doc.id,
                        nombre: data.nombre,
                        email: data.email,
                        password: data.password,
                    });
                });
                
                setUserData(allUsers); // Establecer todos los usuarios en el estado
            } else {
                console.log('No hay usuarios en la colección.');
            }
        };

        fetchUsers().catch(console.error); // Llamar a la función y manejar errores
    }, [db]); // Ejecutar cuando se monta el componente

    return (
        <div>
            <h1>Usuarios</h1>
            <ul>
                {userData.map(user => (
                    <li key={user.id}>
                        <strong>Nombre:</strong> {user.nombre}<br />
                        <strong>Email:</strong> {user.email}<br />
                        <strong>Password:</strong> {user.password}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsuariosComponent;
