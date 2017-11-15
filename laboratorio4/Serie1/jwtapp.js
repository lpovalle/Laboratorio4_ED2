var jwt = require('jwt-simple'); //modulo
var carga = { carnet: '1037214' }; //json
var secreto = 'lab4'; //palabra secreta
 

var codigo = jwt.encode(carga, secreto);
var decodificar = jwt.decode(codigo, secreto);


console.log("El json cifrado es: ")
console.log(codigo); 
console.log("El json descifrado es: ")
console.log(decodificar);

//info de la libreria en: https://www.npmjs.com/package/jwt-simple
//puede verificarse en: https://jwt.io/