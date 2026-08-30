---
title: El código abierto tiene que incluir los servidores
description: >-
  Publicar un cliente y dejar el servidor cerrado demuestra muy poco. Esto es lo
  que un cliente abierto sí te dice, y lo que no.
date: 2026-08-04
author: Erik Bjerke
tags:
  - principios
  - código-abierto
minutes: 5
---

Muchas empresas centradas en la privacidad se describen como de código abierto.
Normalmente eso significa que las aplicaciones son públicas y el backend no. Es
mejor que nada, y es bastante menos de lo que parece.

## Qué demuestra un cliente abierto

Bastante, en realidad. Si el cliente es abierto y su compilación es reproducible,
puedes verificar que cifra antes de enviar, que las claves se derivan donde dice
la documentación y que no contiene un SDK de analítica de terceros. Para contenido
cifrado de extremo a extremo, eso es casi toda la historia: si el texto cifrado
sale correctamente de tu dispositivo, la honestidad del servidor importa mucho
menos.

## Qué no demuestra

Todo lo relativo a las partes que no van cifradas de extremo a extremo, que
siempre son más de las que el marketing sugiere.

Los metadatos son el caso evidente. A quién escribes, cuándo, con qué frecuencia,
desde qué IP y de qué tamaño era el mensaje. Nada de eso está en el modelo de
amenazas del cliente, y todo eso lo conserva o no lo conserva un código que no
puedes ver. «No registramos direcciones IP» es una frase sobre un fichero de
configuración que no te dejan leer.

Luego está todo lo operativo: los periodos de retención, la vida de las copias de
seguridad, si el borrado es real, a qué terceros llama el servicio y qué ocurre
con una cuenta marcada por abuso. Todo decidido en un repositorio al que no tienes
acceso.

## La versión incómoda

El motivo por el que el código del servidor sigue cerrado casi nunca es que
contenga secretos. Los secretos van en un gestor de secretos, no en el código
fuente. Sigue cerrado porque es donde viven las concesiones: la analítica que iba
a ser temporal, el proveedor que necesitaba texto en claro, el periodo de
retención más largo de lo que insinúa la página de política.

No estoy acusando a nadie en particular. Digo que «confía en nosotros, el servidor
está bien» es la única afirmación de un discurso sobre privacidad que no se puede
comprobar, y es sistemáticamente la afirmación que se deja sin comprobar.

## Qué estamos haciendo al respecto

Todos los servidores de Numori son públicos bajo la AGPL-3.0. `Numori-CRDT` es el
relé de sincronización, `Numori-Auth` es el servicio de identidad, y hoy mismo se
pueden leer los dos. Aquí importa que sea AGPL y no una licencia permisiva:
significa que cualquiera puede ofrecer Numori como servicio, pero tiene que
publicar también sus modificaciones. Si algún día nos compran y alguien decide que
el relé de sincronización debería empezar a guardar un poco más, la licencia lo
hace visible.

Esto no nos vuelve fiables. Nos vuelve comprobables, que es una propiedad más
útil, porque no depende de que nuestras intenciones sigan siendo buenas.

## La pega, dicha claramente

Publicar el servidor no demuestra que el código que publicamos sea el código que
estamos ejecutando. Esa brecha es real y no voy a fingir lo contrario. Cerrarla
bien requiere compilaciones reproducibles y atestación, que está en la hoja de ruta
de `Numori-Updater` y es genuinamente difícil.

Lo que sí te da publicarlo es una especificación lo bastante precisa para
exigirnos que la cumplamos, una implementación independiente que puedes ejecutar tú
y la posibilidad de marcharte a tu propio servidor sin perder nada. Es una posición
mucho mejor que dar por buena una página de política.
