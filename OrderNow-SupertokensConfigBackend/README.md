# README PARA EJECUTAR  EL "SUPERTOKENS BACK"
## PRIMERA INICIACION
Si es la primera vez corriendo el back de supertokens , solicite a el correo `coronadovillcahenrryalberto@gmail.com` o al personal numeral del correo, unirse a el grupo de supertokens para tener acceso, mandando tu correo electronico que se usara en este grupo.
(De preferencia el correo debe ser personal y no debe estar en otro grupo o ser propietario de un proyecto en supertokens SaaS)

Se le enviara lo antes posible un correo de respuesta para acceder al "Supertokens's dashboard" de este proyecto.

Una vez acepte la invitacion seguira un pequeño protocolo de "Sign Up" si no tenias una cuenta previamente, luego sera redirigido al dashboard en donde debe dar click en el proyecto:

![alt text](image.png)

una vez dentro tendra la vista de las credenciales de uso para ejecutar el supertokens back sin ningun problema:

![alt text](image-1.png) 

Las credenciales que debe tener copiadas son la "CONECCION URI" y su propia "KEY ID" 
( Por defecto la KEY ID asignada sera la ultima en cola, pero puede consultar al mismo contacto si ya se creo su KEY ID)

## CREDENCIALES YA OBTENIDAS

### Levantamiento del proyecto en "LOCAL"

Dentro del proyecto debe crear un archivo ".env" con las mismas variables que se encuentran en ".env.example" a las cuales
cambiaremos sus valores.

(ejemplo del contenido del archivo ".env.example"):

![alt text](image-2.png)

Luego de copiar y pegar , debemos colocar nuestras credenciales en las variables corresponientes.
Para las dos primeras variables "BACKEND_ST" y "FRONTEND" , debe asignarle los siguientes valores:

BACKEND_ST.- Por defecto al querer levantar este proyecto se tiene definido que se ejecute en `http://localhost:3001` , este es el valor que debe asignarle a la variable "BACKEND_ST", sin embargo, si este al levantarse posteriormente, muestra por consola otra ruta distinta a la dicha aqui (mostrara el mensaje para todos los casos, aunque la ruta sea la misma dicha aqui), debera cambiar el valor de la variable por esa ruta nueva.

FRONTEND.- Para esta variable se debe asignar la ruta donde se ejecuta el proyecto de "OrderNow-React" que, si no tienes otro proyecto vite corriendo se deberia ejecutar por defecto en `http://localhost:5173`, esta ruta debe asignarsele de valor a la variable, aun que igualmente que en el anterior, si al levantar el front te mostrar otra ruta de origen, debes asignar esa ruta distinta como valor.


### Levantamiento del proyecto en "DEPLOY"

Deberas tener ya preparado este proyecto en un entorno listo para levantar, puedes tenerlo en tu proyecto github y levantarlo con el deployador de "BACK" de tu preferencia, en este caso simularemos este paso con "RENDER" que es un deployador de backs gratuito para pruebas, este es el enlace : `https://dashboard.render.com/`
Dentro sigue los pasos para crear una cuenta y posteriormente la guia para levantar un proyecto alojado en tu repositorio.

Antes de levantarlo deberas primero definir las variables de entorno, en donde deben estar definidas las siguientes variables como en la imagen :

![alt text](image-2.png)

sus valores deben ser respectivos a tus credenciales y para las otras dos variables "BACKEND_ST" y "FRONTEND" las siguientes:

BACKEND_ST.- Por defecto RENDER te dara una ruta predefinida para tu proyecto similar a este 
`https://tu-proyecto.onrender.com/`
el cual debe ser el valor que le asignaras a la variable "BACKEND_ST"

FRONTEND.- Para esta variable se debe asignar la ruta donde se ejecuta el proyecto de "OrderNow-React" que, si lo estas ejecutando localmente , puedes revisar en la anterior seccion acerca de como obtener la ruta de ejecucion de ese proyecto, y ese valor lo deberas asignar a esta variable "FRONTEND". Ahora si igualmente ese proyecto esta deployado deberas pasar como valor a "FRONTEND" la ruta origen que te asigno el deployador de ese proyecto

## Ejecucion del back
Tanto si lo ejecutaras en local o en un deploy primero revisa tener la ultima version del proyecto.

Esta es la secuencia a seguir para ejecutar:
- para instalar las dependencias: `npm install`
- para ejecutar la raiz: `node index.js`

cualquier error, comunicar al contacto.