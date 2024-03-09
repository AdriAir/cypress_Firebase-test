# Práctica 5: Animales

-   El UML lo tenéis que crear vosotros con plantUML.
-   CRUD animals para una protectora de animales (Las fichas de los animales).
-   Animales deberán tener:
    -   id (usando la biblioteca uuid)
    -   name: Un nombre entre 3-100 caracteres
    -   birthDate: date-fnd
    -   gender: M/F
    -   size: (Pequeño/Mediano/Grande)
    -   breed (Raza)
    -   vaccine: AnimalVaccine[]
    -   update_at: Ultima fecha de actualización de la ficha
    -   create_at: La fecha de creación de la ficha.
-   Las Vaccines deberán ser:
    -   id: (uuid)
    -   nombre
-   AnimalVaccine:
    -   Vaccine
    -   date
-   La vista:
    -   Tendremos la mitad de la pantalla un formulario para Agregar/Editar (Se reutilizará el componente del formulario)
    -   La otra mitad de la pantalla será una TABLA con los datos del animal (Se podrá cambiar la vista de los datos con un desplegable)
        mostrando una vista en CARTAS.
-   Tendremos que tener el estado de la aplicación en un Map y tendremos que sincronizar el backend con peticiones de http.service.

## Notas de desarrollo

Existe una inconsistencia en el código que voy a tener que dejar para no cambiarlo todo:
El desplegable que nos muestra las vistas disponibles ha tenido que ser colocado en el formulario. El motivo es que no tenemos ninguna vista que mantenga siempre el estado de ese desplegable. Si añadimos el desplegable a "AnimalView" tenriamos que acceder a él mediante alguno de sus hijos, cosa que no tiene sentido pues el contendedor de cartas no debería tocar el estado de un elemento pocisionado por encima de sí mismo. Este cambio nos permite tener el desplegable aisalado de los cambios que suceden en el listado de animales. Igualmente, la solución real será ubicar el desplegable, junto a los dos tipos de vista, en un contenedor genérico que se encargue de dirigir cual será la vista que se deba mostrar usando los datos del desplegable.

No puedo acceder con Gender[animal.gender] ni con Size[animal.size] al valor de los ENUM. Requiero de esto para poder mostrar esos dos valores en español.

## TODO

TODO: Model validations before sending data to JSON Server
TODO: FIX Dates. Format is not valid to inner into INPUT type DATE elements
TODO: Use DateFNS for dates formatting
TODO: Use Fonts-Awsomes for buttton icons (<i> tags)
