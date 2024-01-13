# Proyecto Reserva de Cabañas

**Acerca del proyecto:**
Proyecto elaborado como reto de practica para el curso de Desarrollo Web, impartido por la Universidad Sergio Arboleda en el marco del programa MisionTIC 2022. 

**Lenguaje, frameworks y librerias utilizadas:**
* El Backend se codificó en lenguaje de programación _Java_ utilizando el framework _SpringBoot_.
* Cuenta con un Frontend basico creado en _HTML5, CSS y Javascript_.
* Se realiza la conexión a una base de datos _H2_ la cual es temporal y se usa **únicamente para pruebas**, a través de las dependencias importadas por medio de _Maven_.
* Se realizó el despliegue en una máquina virtual de Oracle Cloud Infrastucture, y posteriormente se publicó utilizando un hostname gratuito que oculta y apunta a la IP de dicha MV. La aplicación es accesible desde la url: _http://cabinjehrciclo3.ddns.net:9000_
* Se incluye la posibilidad de iniciar sesion como administrador con una cuenta de Google, usando la API de Oauth2. La cual solo funciona en localhost,
  por restricciones de Google que no permite usar esta funcionalidad en sitios que no tengan certificados SSL.
  
**Servicios**:
* La Base de datos de prueba cuenta con 1 categoria, 2 cabañas y 2 clientes previamente creados.
* Dependiendo el rol de los usuario tienen la posibilidad de utilizar los siguientes servicios:
  1. Al iniciar sesión como administrador con cuenta de Google, se permite:
    * Crear, consultar, modificar y eliminar las cabañas 
    * Crear, consultar, modificar y eliminar los clientes
    * Crear, consultar, modificar y eliminar las reservas y mensajes relacionados con cada cabaña.
    
  2. En caso de no iniciar sesion, el usario:
    * No podrá crear nuevas cabañas, ni modificar o eliminar las existentes. Unicamente las puede consultar.
    * Sólamente podrá registrarse como cliente, más no eliminar o modificar datos de los clientes ya registrados.
    * Sólamente podrá crear nuevas reservas o comentarios, más no eliminar o modificar datos de los reservas o mensajes ya registrados.
