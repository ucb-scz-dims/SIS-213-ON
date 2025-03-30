# React + Vite

## Instalacion

Para poder ejecutar este proyecto es necesario ejecutar los siguientes comandos:
    cd OrderNow <br>
    npm install -g npm@latest <br>
    npm install <br>
    npm run dev <br>


## Para ejecutar Storybooks...:

 `npx sb init` para crear un storybook desde 0 (recomiendo saltar este paso porque ya se inició un proyecto storybook aquí mismo)

`npm install` Para instalar todas las extensiones necesarias

`npm i @storybook/addon-docs -D` Por si las historias no muestran código copiable

`npm run storybook` Para iniciar el sandbox de los componentes hechos historias

Una vez en el sandbox solo elige una historia cualquiera, personalízalo en los docs y dale en `show code` y copiar para pegar el contenido en la página que desee. Recuerde añadir `import ComponoenteElegido from './components/componente-elegido';` en la página para que funcione el componente.

