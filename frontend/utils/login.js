export const validarLogin = (usuario, contrasena) => {
  return usuario.trim() !== "" && contrasena.trim() !== "";
};