# Guía de Implementación de Elasticsearch con Docker

Esta guía explica cómo ejecutar Elasticsearch en local usando Docker Compose y cargar datos de ejemplo de restaurantes utilizando los archivos que ya están configurados.

## Instrucciones de Ejecución

### Paso 1: Iniciar Elasticsearch con Docker Compose

Para levantar los contenedores de Elasticsearch y Kibana, ejecuta el siguiente comando en la carpeta raíz del proyecto:

```bash
docker-compose up -d
```

Esto iniciará:
- Un contenedor de Elasticsearch accesible en http://localhost:9200

Puedes verificar que los contenedores estén funcionando correctamente con:

```bash
docker-compose ps
```

### Paso 2: Ejecutar el Script de Configuración de Restaurantes

Una vez que los contenedores estén funcionando, haz el script de configuración ejecutable y ejecútalo:

```bash
chmod +x setup-restaurants.sh
./setup-restaurants.sh
```

Este script:
1. Espera a que Elasticsearch esté disponible
2. Crea un índice llamado "restaurants"
3. Carga datos de ejemplo de restaurantes

### Paso 3: Verificar la Instalación

Para verificar que todo funcione correctamente, puedes:

1. Acceder a Elasticsearch en http://localhost:9200
2. Consultar los datos cargados en http://localhost:9200/restaurants/_search

### Comandos Útiles

- **Detener los contenedores**: `docker-compose down`
- **Ver logs**: `docker-compose logs -f`
- **Reiniciar servicios**: `docker-compose restart`
- **Eliminar volúmenes (datos)**: `docker-compose down -v`

## Solución de Problemas

- Si Elasticsearch no inicia correctamente, verifica los logs con `docker-compose logs elasticsearch`
- Si el script de restaurantes falla, asegúrate de que Elasticsearch esté completamente iniciado antes de ejecutarlo
- Para problemas con permisos en Linux, puedes necesitar ejecutar los comandos con `sudo`
