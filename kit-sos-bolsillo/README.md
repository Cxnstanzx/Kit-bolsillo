# Kit SOS de Bolsillo

App web simple para jóvenes en residencia: pausas rápidas, situaciones del día a día, apoyos reales
y un espacio personal (**Mi plan** y **Mi red**). No usa servidor: todo corre en el navegador.

## Estructura

```
kit-sos-bolsillo/
├── index.html            Estructura de las pantallas
├── css/
│   ├── tokens.css        Colores, sombras y variables (claro / oscuro)
│   ├── base.css          Reset y tipografía global
│   ├── layout.css        Barra superior, vistas y navegación inferior
│   ├── components.css    Tarjetas, botones, formularios, avisos, respiración
│   └── accessibility.css Reducir movimiento
└── js/                   (se cargan en este orden)
    ├── data.js           Contenido: situaciones, ideas, líneas de ayuda
    ├── storage.js        localStorage y copia de seguridad
    ├── ui.js             Avisos, portapapeles, tema y botones de llamada
    ├── views.js          Dibuja cada pantalla
    └── app.js            Navegación y arranque
```

## Cómo abrirla

- Doble clic en `index.html`, o
- En VS Code, instala **Live Server** (se sugiere solo) → clic derecho en `index.html` → *Open with Live Server*.

## Cómo editar el contenido

Todo el texto vive en `js/data.js`. Para agregar una situación, copia una existente y cambia su id
(por ejemplo `s16`), `category`, `emoji`, `title`, `subtitle`, `color`, `steps` y `message`.
Si es una situación delicada, agrega `risk: true` para que muestre el aviso con el *4141.

Categorías disponibles: `animo`, `convivencia`, `rutinas`, `casa`, `estudio`, `apoyos`
(se editan en `categories`).

## Datos y privacidad

- Lo que se escribe en Mi plan y Mi red se guarda en el `localStorage` del dispositivo y persiste al cerrar el navegador.
- Cada dispositivo y navegador guarda lo suyo. Para pasar datos a otro, existe **Copiar mis datos / Recuperar mis datos** en Mi plan.
- Nada se envía a ningún servidor.

## Antes de publicar

Verifica los números de ayuda en fuentes oficiales (están en `js/data.js`): *4141, 1515, 800 200 818, 131 y 133.
