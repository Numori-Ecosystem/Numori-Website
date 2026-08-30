---
title: Por qué nunca habrá IA en Numori
description: >-
  Renunciar a las funciones de IA no es nostalgia ni una estrategia de marketing.
  Es la única postura coherente con el resto de promesas que hemos hecho.
date: 2026-08-18
author: Erik Bjerke
tags:
  - principios
  - privacidad
minutes: 6
---

Cada pocas semanas alguien pregunta cuándo tendrá Numori Notes un botón de
resumir. La respuesta es nunca, y merece la pena explicar por qué, porque «sin
IA» suena a preferencia estética y no lo es.

## Los tres costes que nunca aparecen en la lista de funciones

Una función generativa dentro de una aplicación de notas trae tres costes que
suelen quedarse fuera del anuncio.

**Tus datos tienen que ir a algún sitio donde puedan procesarse.** Numori Notes
guarda tus notas en local y las sincroniza a través de un relé que no tiene
claves. Un modelo no puede resumir algo que no puede leer. Añadir un botón de
resumir significa o enviar tus notas a un servidor capaz de descifrarlas, o
descargar en tu portátil un modelo lo bastante grande para ser útil. Lo primero
rompe la arquitectura. Lo segundo son 4 GB de descarga para ahorrarte leer tu
propia lista de la compra.

**Alguien tiene que pagar la inferencia.** La inferencia no es gratis y no se
abarata por usuario a medida que creces: escala con el uso, al contrario que el
almacenamiento, que cuesta menos por gigabyte cada año. Una empresa que añade
funciones de IA a una suscripción de 3 € tiene tres opciones: subir el precio,
limitar la función hasta hacerla inútil, o encontrar otra forma de ganar dinero
con quien la usa. Las tres son peores que no tener la función.

**Cambia para qué sirve el producto.** En cuanto una función es caro mantenerla,
hay que promocionarla. Consigue un sitio en la barra de herramientas, luego un
aviso, luego un mensaje sugiriéndote que la pruebes. El software que tiene que
justificar un coste operativo deja de ser una herramienta y se convierte en un
embudo.

## «Pero es opcional»

Que sea opcional es una distinción real y no quiero despacharla. Pero se degrada.
La función que se lanzó detrás de un interruptor en la versión 1 viene activada
por defecto en la versión 4, porque las métricas decían que la adopción era baja y
la adopción era lo que se estaba midiendo.

Y lo que es más importante: ser opcional no revierte el cambio arquitectónico. Si
el servidor puede descifrar tus notas cuando pulsas el botón, entonces el
servidor puede descifrar tus notas. Lo que importa es la capacidad, no la política
actual sobre cuándo se usa. Es el mismo argumento que damos sobre las políticas de
privacidad en general: preferimos ser incapaces de leer tus datos antes que
prometer que no lo haremos.

## Qué hacemos en su lugar

La calculadora de Numori Notes ilustra bastante bien la alternativa. Interpreta
`48 GBP en EUR` y `12% de 340` y te da una respuesta. Es un analizador sintáctico
y un grafo de unidades. Se ejecuta en una fracción de milisegundo, enteramente en
tu dispositivo, da la misma respuesta siempre y, cuando no entiende algo, lo dice
en vez de inventarse un número plausible.

Esa última propiedad es la que merece atención. Una calculadora que se equivoca el
2% de las veces no es una calculadora. Buena parte de lo que se publica como
función de IA es una función que antes era exacta y ahora es aproximada, con un
tono de voz más simpático.

## El compromiso

Sin asistentes, sin resúmenes, sin generación, sin clasificación de tu contenido,
sin reordenaciones «inteligentes» y sin modelos de embeddings recorriendo tus
archivos para construir un índice que podamos consultar.

Es una promesa fácil de verificar, y para eso publicamos todo: `Numori-Notes` no
tiene ninguna dependencia de inferencia en su fichero de bloqueo, y nunca la
tendrá. Si eso cambia, lo verás en un pull request antes de verlo en una versión, y
tienes todo el derecho a decirlo bien alto.
