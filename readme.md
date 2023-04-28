# Bartender Backend

Este proyecto es el backend para una aplicación de bartender. El backend está construido utilizando Node.js, Express y TypeScript, y expone una API RESTful para que el frontend interactúe con él.

## Funcionalidades

- Manejo de órdenes de bebidas (cervezas y tragos).
- Límites de preparación concurrente para cada tipo de bebida.
- Lista de bebidas servidas y clientes atendidos con un tamaño máximo configurable.
- Configuración de tiempo de preparación de bebidas.
- Soporte CORS para permitir el acceso desde un dominio específico en producción.

## Instalación y configuración

1. Clona este repositorio en tu máquina local.
2. Asegúrate de tener Node.js y npm instalados.
3. Ejecuta `npm install` para instalar todas las dependencias del proyecto.
4. Ejecuta `npm run build` para compilar el proyecto con TypeScript.
5. Ejecuta `npm start` para iniciar el servidor en el puerto 3030.

## Endpoints de la API

| Método | Ruta        | Descripción                                                         |
| ------ | ----------- | ------------------------------------------------------------------- |
| GET    | /served     | Obtiene la lista de bebidas servidas y clientes atendidos.          |
| GET    | /reset      | Restablece las listas de bebidas servidas y clientes atendidos.     |
| GET    | /config     | Obtiene las configuraciones actuales del barman.                    |
| POST   | /config     | Actualiza las configuraciones del barman.                           |
| POST   | /order      | Realiza una orden de bebida y la añade a la lista de bebidas servidas y clientes atendidos. |

## Contribuciones

Si deseas contribuir a este proyecto, no dudes en crear un fork y enviar un pull request.

## Licencia

Este proyecto está licenciado bajo la licencia ISC. Consulta el archivo [LICENSE](LICENSE) para obtener más información.
