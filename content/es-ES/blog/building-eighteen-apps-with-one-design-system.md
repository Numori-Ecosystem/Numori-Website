---
title: Construir dieciocho aplicaciones con un solo sistema de diseño
description: >-
  Numori UI empezó como una carpeta de componentes dentro de la aplicación de
  notas. Extraerla nos enseñó más sobre accesibilidad que sobre APIs de componentes.
date: 2026-07-21
author: Erik Bjerke
tags:
  - ingeniería
  - sistema-de-diseño
  - accesibilidad
minutes: 7
---

Un ecosistema de dieciocho aplicaciones hecho por un equipo muy pequeño solo
funciona si casi nada de la interfaz se escribe dos veces. `Numori-UI` es cómo lo
conseguimos: una biblioteca de componentes en Tailwind 4 y Vue 3 con la que se
monta cada interfaz de Numori, incluida esta web.

No empezó siendo una biblioteca. Empezó como `components/ui/` dentro de Numori
Notes, y ahí se quedó un año antes de que la sacáramos.

## Extraerla consistió sobre todo en borrar cosas

La aplicación de notas tenía veintiocho componentes en esa carpeta.
Aproximadamente un tercio tenía alguna propiedad que existía para exactamente un
punto de uso. Un `Modal` con un booleano
`hideCloseButtonOnMobileWhenScrolled` no es un sistema de diseño, es un registro
de cambios.

La regla con la que nos quedamos: una propiedad se gana su sitio si dos pantallas
sin relación la necesitan, o si quitarla obliga a quien la consume a reimplementar
el componente. Todo lo demás pasó a ser un slot. `Modal` bajó de once propiedades
a seis más un slot, y los puntos de uso se acortaron en lugar de alargarse.

## La accesibilidad es la razón para extraerla, no un extra

Este fue el resultado realmente útil y no era el que buscábamos.

Cuando el manejo del teclado vive en cada pantalla, se hace bien en las pantallas
en las que alguien estaba pensando en ello y se olvida en todas las demás. Nuestra
aplicación de notas tenía un modal que atrapaba el foco y un diálogo de ajustes que
no, porque se escribieron con cuatro meses de diferencia.

Mover ese comportamiento al componente lo vuelve estructural. `Toggle` renderiza un
`<button role="switch">` de verdad con `aria-checked`, así que la activación por
teclado viene gratis de la plataforma en lugar de venir de un manejador
`@keydown.space` que alguien recordó poner. `Button` acepta `ariaLabel`,
`ariaChecked`, `role` y `tabindex` como propiedades de primera clase, porque la
alternativa (bajar a un `<button>` en crudo cuando necesitas un atributo ARIA) es
exactamente cómo se acaba esquivando un sistema de diseño.

La parte honesta: no está terminado. `Modal` todavía no atrapa el foco ni define
`role="dialog"` y `aria-modal`, y no se cierra con Escape. Son carencias reales,
están anotadas, y esta web deliberadamente no usa `UiModal` para nada importante
hasta que se resuelvan.

## Tree-shaking, porque una web de marketing no debería cargar una biblioteca de formularios

La biblioteca no publica CSS precompilado ni un fichero barril que arrastre con
todo. Importa `UiKbd` y te llevas 0,4 kB. Importa `UiButton` y te llevas 16 kB, de
los cuales unos 7 kB son la tabla de rutas de iconos.

Ese último número es la razón por la que esta web delega los iconos en
`@nuxt/icon`. La biblioteca incluye los treinta y seis glifos de MDI que necesitan
sus propios componentes; una web necesita `mdi:github`, `mdi:robot-off-outline` y
treinta más que ningún componente usa. Así que el módulo de Nuxt de `Numori-UI`
acepta una opción `icons.component` y entrega el renderizado de iconos a lo que la
aplicación anfitriona ya tenga:

```js
numoriUi: {
  prefix: 'Ui',
  icons: { component: 'Icon' },
}
```

Los sistemas de diseño suelen hacer esto al revés e insisten en ser los dueños de
la capa de iconos.

## Qué costó

Dos semanas y una clase de error genuinamente molesta. Como los componentes se
consumen como ficheros Vue en crudo y no como un paquete precompilado, hay que
decirle a Vite que no los preempaquete ni los externalice. Ahora son tres líneas en
un plugin de Vite, y primero fueron una tarde de desconcierto.

Mereció la pena. La siguiente aplicación arranca con una interfaz funcional,
accesible y traducida desde el primer día, y una corrección de accesibilidad llega
a dieciocho aplicaciones a la vez en lugar de solo a aquella sobre la que alguien
abrió una incidencia.
