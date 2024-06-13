export function dateFormat(dateString){
    // Dividimos la cadena de fecha en partes (año, mes y día)
  const [year, month, day] = dateString.split('-');
  
  // Creamos un nuevo objeto Date con los componentes desglosados
  const date = new Date(year, month - 1, day); // month - 1 porque los meses son base 0 en JS
  
  // Opciones para toLocaleDateString
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  
  // Retornamos la fecha en formato DD/MM/YYYY
  return date.toLocaleDateString('es-ES', options);
}