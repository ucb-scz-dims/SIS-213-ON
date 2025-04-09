# SIS-213-ON
# React + Vite

## Instalacion

Para poder ejecutar este proyecto, es necesario instalar las dependencias de node. Para ello, se debe ejecutar los siguientes comandos:
    ```
    cd /OrderNow-React/
    npm install -g npm@latest
    npm install
    ```

## Ejecución

Para ejecutar el proyecto, se debe ejecutar el siguiente comando en la carpeta "OrderNow-React":
    ```
    npx vite
    ```

Para iniciar el sandbox de Storybooks, se debe ejecutar en la misma carpeta:
    ```
    npm run storybook
o tambien
    ```
    npm run dev
    ```

para ejecutar el back de supertokens instale lo siguiente en el directorio "Backend-st":
    ```
    npm install express supertokens-node cors
    ```
luego levante el back dentro del directorio con:
    ```
    node .\index.js
    ```
nota: la ejecucion del back y front debe hacerse desde dos terminales diferentes

dentro del front se debe instalar:
    ```
    npm install supertokens-auth-react
    ```
    ```
    npm install supertokens-web-js
    ```

y de ser necesario tambien instalar en el front: 
    ```
    npm install react-router-dom
    ```

Para iniciar el sandbox de Storybooks, se debe ejecutar en la misma carpeta:
    ```
    npm run storybook
    ```
