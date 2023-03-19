# Wordle
El Juego consiste en seleccionar aleatoriamente una palabra de 5 letras del catálogo de palabras. Al teclear o al dar click en una letra del teclado virtual, la letra se mostrará en la
primera caja que se encuentre vacía y así sucesivamente. Al completar una fila de 5 letras, la aplicación compará cada letra de palabra formada con la palabra seleccionada y se aplicará la siguiente lógica:
- a. Si la letra ingresada está en el mismo lugar, la caja se pintara de verde.
- b. Si la letra ingresada está en la palabra pero no en el mismo lugar, la caja se pintará de amarillo
- c. Si la letra ingresada no se encuentra en la palabra, la caja se mostrar de color gris

## Observaciones generales del proyecto
- El proyecto fue creado con React y Typescript
- El framework de CSS usado fue Tailwind.
- Para conocer información de las vistas, ir a src > page
- Para conocer información de los componentes, ir a src > components
- Para conocer información sobre service, localstorage y listeners, ir a src > hooks
- En caso de blocks por CORS la aplicación selecciona la data desde un backup local, ir a src > dataBackup

## Tareas pendientes
- Actualizar la palabra cada 5 min.
- Unit Tests.
- Agregar i18n.

## Available Scripts
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
