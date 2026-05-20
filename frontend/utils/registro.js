export const validarRegistro = (nombre, apellido, usuario, correo, contrasena) => {

  if (!nombre.trim()) return "nombre";
  if (!apellido.trim()) return "apellido";
  if (!usuario.trim()) return "usuario";
  if (!correo.trim()) return "correo";
  if (!contrasena.trim()) return "contrasena";

  if (contrasena.length < 8) return "longitud";

  if (!/[A-Za-z]/.test(contrasena) || !/[0-9]/.test(contrasena)) {
    return "formato";
  }

  return "ok";
};