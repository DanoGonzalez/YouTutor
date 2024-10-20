import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, ActivityIndicator } from 'react-native';
import { getUsuarios } from '@/controllers/usuariosController'; // Asegúrate de que la ruta sea correcta
import { Usuario } from '@/models/usuarios'; // Asegúrate de que la ruta sea correcta

const UsuariosList = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const fetchedUsuarios = await getUsuarios();
        setUsuarios(fetchedUsuarios);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  if (loading) {
    return <ActivityIndicator />; // Mostrar indicador de carga mientras se obtienen los usuarios
  }

  return (
    <FlatList
      data={usuarios}
      renderItem={({ item }) => (
        <View>
          <Text>{item.nombres} {item.apellidos}</Text>
          <Text>{item.role}</Text>
          <Text>{item.status}</Text>
          <Text>{item.statusExam}</Text>
          <Text>{item.tecnologias}</Text>
          <Text>{item.materiasDominadas}</Text>
          <Text>{item.descripcion}</Text>
          <Text>{item.id}</Text>
          <Text>{item.correo}</Text>
          <Text>{item.password}</Text>
          {/* Puedes añadir más detalles del usuario aquí */}
        </View>
      )}
      keyExtractor={(item) => item.id || item.nombres} // Asegúrate de tener un identificador único
    />
  );
};

export default UsuariosList;
