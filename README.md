<!-- @auhor @AdriAir -->

# Proyecto de investigación: Firebase & Cypress

## Introducción

Para este proyecto de investigación realizaremos la creación de una aplicación web la cual utilizará las herramientas de Google Firebase, las cuales incluyen desde herramientas de autenticación hasta la propia base de datos, con Firesore, y hosting.

Además de eso, aprenderemos a aplicar testing con Cypress en nuestro proyecto de Node.js, para ello abriremos las tripas de la misma app usada para el despliegue con Firebase.

## Firebase

Google Firebase es una plataforma de desarrollo de aplicaciones móviles y web que ofrece una variedad de herramientas y servicios para ayudar a los desarrolladores a crear, mejorar y hacer crecer sus aplicaciones. Firebase proporciona una infraestructura completa para el desarrollo de aplicaciones, incluyendo servicios de backend, bases de datos en tiempo real, almacenamiento en la nube, autenticación de usuarios, análisis, mensajería en la nube, pruebas de aplicaciones... También proporciona herramientas para el desarrollo de videojuegos en Unity o en C++.

En este caso utilizaremos Firebase para realizar el despliegue de una aplicación web con **Vite**.

### Creación de un proyecto

En primer lugar, antes de comenzar en local, tendremos que crear un proyecto en la nube. Para ello, utilizaremos la web de [Firebase](https://firebase.google.com/).

![Página de inicio de Firebase](image.png)

Una vez iniciemos sesión, podremos acceder a nuestro gestor de proyectos:

![Gestor de proyectos de Firebase](image-1.png)

Al comenzar a crear un proyecto, se nos pedirá el nombre del mismo, además de un ID único para identificar la web:

![Creación de proyecto](image-2.png)

Google firebase, además, nos permite utilizar **Google Analytics** con nuestra web, para el analisis de datos sobre el tráfico, interacciones...

![Google Analytics](image-3.png)

Se nos preguntará sobre qué cuenta queremos gestionar los análisis de firebase:

![Selección de cuenta para análisis](image-4.png)

Entonces comenzará a generarse el proyecto:

![Generación del proyecto](image-5.png)

![Proyecto generado](image-6.png)

Finalmente, aparecerá el panel de control del proyecto:

![Gestor del proyecto](image-7.png)

Ahora crearemos la app de firebase, podemos crear cualquiera de las siguientes aplicaciones:

![Aplicaciones compatibles](image-8.png)

En nuestro caso, crearemos una aplicación web.

Al comienzo, necesitamos un nombre:

![Creación de aplicación web](image-9.png)

Las instrucciones para generar y configurar inicialmente la aplicación aparecerán:

![Instrucciones para generar la app en NodeJS](image-10.png)

### Implementación en NodeJS

Primero, descargamos el CLI de Firebase, en mi caso la instalaré como dependencia de desarrollo:

```bash
npm i -D firebase-tools
```

En caso de querer instalarla de forma global:

```bash
npm i -g firebase-tools
```

Para poder asociar nuestra aplicación al proyecto de **Firebase**, tendremos que iniciar sesión. Para ello, usaremos el siguiente comando:

```bash
npx firebase login
```

Esto abrirá nuestro navegador:

![Log in desde el navegador](image-11.png)

Una vez iniciemos sesión con nuestra cuenta de google, la cual debe tener acceso al proyecto de firebase, podremos continuar en nuestra terminal.

![Log in correcto](image-12.png)

En caso de utilizar un framework, debemos activar una función experimental:

```bash
npx firebase experiments:enable webframeworks
```

Inicializamos un proyecto con:

```bash
npx firebase init hosting
```

Entonces, podremos usar la aplicación que creamos anteriormente:

![Uso del proyecto de firebase](image-13.png)

Especificamos configuraciones varias como el framework:

![Configuraciones varias](image-14.png)

También configuraremos la región del servidor de despliegue:

![Hosting region](image-15.png)

Tendremos que importar el SDK de Firebase utilizando:

```bash
cd ./project-name
npm i firebase
```

Finalmente, en nuestro archivo **main.ts**, conectaremos la aplicación con firebase:

![Conectar app con firebase](image-16.png)

### Implementar autenticación

La autenticación con Firebase facilita el registro y el inicio de sesión a nuestra aplicación de forma rápida y sencilla.

En nuestro caso, vamos a realizar el inicio de sessión con google, pero antes de comenzar, tendremos que activar el proveedor:

Entramos en **Build -> Authentication**

![Sección de Autenticación](image-17.png)

Un vez, ahí, en la sección de **Sign-in method** activamos los proveedores que necesitemos, en nuestro caso, **Google**:

![Listado de proveedores disponibles](image-18.png)

![Activando el proveedor de google](image-19.png)

Hemos creado una función que nos permite iniciar sesión con google al pulsar un botón, además de mostrar nuestros datos:

![Función de login con google](image-20.png)

### Base de datos: Firestore

#### Creación de la base de datos

#### ¿Consultas sobre la base de datos NoSQL Documental?

#### Reglas de seguridad

### Despliegue del proyecto

## Cypress

### Tipos de Enfoque

En Cypress existen dos tipos de enfoque: **End-to-End** y **Component Testing**.

Ambos enfoques tienen un proposito diferente dentro del testing de software.

![alt text](image-21.png)

#### End-to-End (E2E)

-   Prueba de la app completa, desde la interfaz de usuario hasta la base de datos.
-   Simulación de un usuario real (botones, formularios...).
-   Son mas lentos que **Component Testing**, pues requieren replicar el escenario final.

#### Component Testing

-   Pruebas de secciones individuales de la app.
-   Entorno aislado: Las pruebas se ejecutan en un entorno incomunicado del resto de la aplicación.
-   Se utilizan para detectar errores en una etapa temprana de la aplicación o cuando su implementación no está disponible aún.

### Ejemplo

He descargado una aplicación básica que sirve como **Carrito de la compra**. (**NECESITAS INICIAR LA APP DE VITE PARA QUE LOS TESTS FUNCIONEN**)

Vamos a realizar varios tests para ver si hay fallos en el funcionamiento:

En primer lugar tenemos que abrir la web la cual queremos ejecuitar los tests. Esto se ejecuta antes de cada test.

![alt text](image-22.png)

**NOTA:** Los `Wait()` no se usan para esto generalmente.
Estos se suelen usar para esperar a que se ejecuten otros procesos, sobretodo asincronos, como consultas a la base de datos. En este caso lo estoy haciendo para que podamos ver como se van añadiendo y eliminando elementos al carrito.

El primer test añade una serie de productos al carrito y comprueba que se han añadido correctamente:

![alt text](image-23.png)

El segundo test marca como **Hecho** varios productos del carro y comprueba que se han eliminado del carrito y añadido a la lista de **Trabajos hechos**

![alt text](image-24.png)

El tercer y último test elimina los productos de la lista de **Trabajos hechos** y comprueba que se eliminan correctamente

![alt text](image-25.png)

## Bibliografia

[Firebase - Documentación](https://firebase.google.com/docs)

[Firebase - Introducción a Firestore](https://firebase.google.com/docs/firestore/quickstart)

[Youtube - Empezar con Firebase y la web](https://www.youtube.com/watch?v=vjfzXNGG66k)

---

[Cypress - Documentación](https://docs.cypress.io/guides/overview/why-cypress)

[Cypress - End-to-End](https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test)

[Cypress - Component Testing](https://docs.cypress.io/guides/component-testing/overview)

---
