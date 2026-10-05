# Entregables — TIENDA PALMIRA

- [ ] **Base React + Vite y proyecto listo para ejecutar.** Aplicación en React/JSX, sin backend, API, base de datos, Firebase, Supabase ni datos externos; scripts de desarrollo/compilación; ruta `/` declarada; proyecto organizado, preparado para GitHub y sin archivo de lógica monolítico.

- [ ] **Catálogo obligatorio y experiencia de catálogo.** Definir directamente en frontend los seis productos sin cambiar IDs, nombres, precios ni stocks: Café de Huila 500 g (28500/8), Panela orgánica 1 kg (9800/3), Arepa de choclo x6 (12000/12), Chocolate de mesa (15400/1), Bocadillo veleño (6500/20) y Aguardiente 750 ml (62000/5). Cada tarjeta muestra nombre, precio COP, stock, campo inicial 1 y Agregar.

- [ ] **Navbar y drawer de carrito.** Navbar fija con TIENDA PALMIRA a la izquierda y botón de carrito a la derecha; insignia con total de unidades (no productos distintos), actualización inmediata, oculta con cero unidades; carrito lateral abrible/cerrable y adaptado a móvil.

- [ ] **Agregar sin duplicados y control de stock.** Agregar nuevos productos o acumular en una única línea existente. Nunca superar stock al editar input, usar `+` o agregar repetidamente. Ante exceso, corregir al máximo y mostrar exactamente: “Este es el máximo de producto disponible en stock”. Agregar se deshabilita cuando se consume todo el stock del producto.

- [ ] **Validación estricta de cantidades en catálogo y carrito.** Aceptar únicamente enteros positivos. Bloquear `e`, `E`, `+`, `-`, `.`, `,`, letras y cualquier carácter no dígito mediante teclado/cambio; rechazar pegados como `-5`, `3e2`, `abc`, `12.5`, `10,5` y `+5`; impedir cambios por rueda del mouse. Si se escribe 0 en catálogo, conservar cantidad anterior y avisar mínimo 1. Si se escribe 0 en carrito, mantener la cantidad, avisar mínimo y ofrecer eliminación.

- [ ] **Carrito, confirmaciones y cálculos.** Cada línea muestra nombre, precio unitario, input, `−`, `+`, subtotal y Eliminar. `+` actualiza valores o informa máximo; `−` reduce si es mayor que 1. Con cantidad 1, `−` abre confirmación “Esta es la cantidad mínima, ¿desea eliminar el producto?” con confirmar y cancelar, sin bajar a 0. Eliminar directo también recalcula. Mostrar precio × cantidad, total de unidades y total de compra, incluyendo Café ×2 + Panela ×3 + Arepa ×1 = $98.400.

- [ ] **Toasts, diseño, responsive y accesibilidad.** Sistema sin `alert()`: visible, auto-cerrable, cerrable a mano, no bloqueante, responsive y anunciado correctamente. Interfaz moderna y profesional inspirada en productos tradicionales colombianos/e-commerce; tarjetas, hover/focus, microinteracciones sutiles, desktop/tablet/móvil sin cortes ni scroll horizontal. Botones reales, labels/nombres accesibles y focus visible.

- [ ] **Documentación y evidencias.** README profesional con nombre del proyecto, Aprendiz [PENDIENTE], Ficha [PENDIENTE], Instructor Daniel Alfonso Martínez Payán, React + Vite, descripción, características, instalación, `URL DEL REPOSITORIO: [PENDIENTE]` y sección Capturas. Carpeta `evidencias` que documenta las siete capturas requeridas sin inventarlas.

- [ ] **Validación final.** Compilar producción, revisar diagnósticos y comprobar los 12 casos obligatorios: teclas, pegado, cero, límite de stock, suma sin duplicados, `+` al máximo, confirmación de eliminación, cálculos, deshabilitación de chocolate y contador de navbar.
