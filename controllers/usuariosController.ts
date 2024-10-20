// src/controllers/UsuarioController.ts
import { db } from '@/utils/Firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Usuario } from '@/models/usuarios';

const usuariosCollection = collection(db, 'usuarios');

export const createUsuario = async (usuario: Usuario) => {
  try {
    const docRef = await addDoc(usuariosCollection, usuario);
    return { id: docRef.id, ...usuario };
  } catch (error:any) {
    throw new Error('Error al crear el usuario: ' + error.message);
  }
};

export const getUsuarios = async () => {
  try {
    const querySnapshot = await getDocs(usuariosCollection);
    const usuarios: Usuario[] = [];
    querySnapshot.forEach((doc) => {
      usuarios.push({ id: doc.id, ...doc.data() } as Usuario);
    });
    return usuarios;
  } catch (error:any) {
    throw new Error('Error al obtener los usuarios: ' + error.message);
  }
};

export const updateUsuario = async (id: string, usuario: Partial<Usuario>) => {
  try {
    const usuarioDoc = doc(db, 'usuarios', id);
    await updateDoc(usuarioDoc, usuario);
    return { id, ...usuario };
  } catch (error:any) {
    throw new Error('Error al actualizar el usuario: ' + error.message);
  }
};

export const deleteUsuario = async (id: string) => {
  try {
    const usuarioDoc = doc(db, 'usuarios', id);
    await deleteDoc(usuarioDoc);
    return id;
  } catch (error:any) {
    throw new Error('Error al eliminar el usuario: ' + error.message);
  }
};