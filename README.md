
# Reto Técnico React Frontend Sr.

Reto técnico de Backbone Systems para el puesto de React Front End Sr.

![ts](https://badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555)

## Instalación
Para poder ejecutar el proyecto de manera local se debe descargar el repositorio:

```
git clone git@github.com:andryMatos/backbone-test.git

cd backbone-test

npm install

npm run start

```


## Descripción del proyecto

La prueba consiste en desarrollar un CRUD para la API de "Contactos", cada acción debe tener su propio endpoint.

## Identificación del proyecto
La manera en la que aborde el desarrollo fue entendiendo que cada endpoint necesario deberá contar con ciertas validaciones y buen manejo de la recuperación de datos y retroalimentación clara al usuario

Como buena práctica utilice fetch para la recuperación de datos con un AbortController en caso de que el usuario cambie de página y no saturar la memoria al intentar cargar un componente desmontado:

```typescript

useEffect(() => {
    const abortController = new AbortController();
    try{
        const response = await fetch(url, { method: 'GET', signal: signal });
        /***/
    }catch(error){
        /***/
    }

    return () => {
        /*
         * Al desmontar el componente, este tomará la señal y terminará la promesa
         */
        abortController.abort();
    }
},[])

```

Al revisar los endpoints y las respuesta también consideré mostrar en pantalla al usuario si se ha presentado un problema, dejé manera generica los errores de servidor.

```typescript
try{
    const response = await fetch('https://bkbnchallenge.herokuapp.com/contacts/'+id, { method: 'GET', signal: signal });
        if (response.ok) {
            const json = await response.json();
        }else{
            const json = await response.text();
                setNotify({
                    isOpen: true,
                    message: json === 'Not Found' ? "No se ha encontrado el usuario": json,
                    severity: "error"
                });
        }
}catch(error){

}

```

Enfocado a la experiencia de usuario se tienen más mensajes en las validaciones de inputs, al esperar la carga de los registros se muestra un "Skeleton" que le indica al usuario que los registros estan siendo recuperados, los botones y la organización de los elementos están basados en las buenas practicas de UI/UX.


## Demo

https://dreamy-custard-a8d616.netlify.app/
