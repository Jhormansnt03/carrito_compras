# TIENDA PALMIRA — Carrito de Compras React

> Productos de nuestra tierra, compra clara.

## Información académica

| Campo | Información |
| --- | --- |
| **Aprendiz** | Nombre del aprendiz: **[PENDIENTE]** |
| **Ficha** | Ficha: **[PENDIENTE]** |
| **Instructor** | Daniel Alfonso Martínez Payán |
| **Tecnología** | React + Vite (JavaScript/JSX) |

## Descripción

**TIENDA PALMIRA** es una tienda virtual frontend desarrollada con React y Vite. Presenta un catálogo fijo de productos colombianos, un carrito lateral y reglas estrictas para las cantidades y el stock disponible. No utiliza backend, base de datos, APIs ni datos externos.

## Características

- Catálogo con los seis productos obligatorios, precios COP y stocks exactos.
- Navbar fija con contador que representa el total de unidades del carrito.
- Drawer lateral de carrito adaptable a pantallas móviles.
- Una única línea por producto: los agregados posteriores acumulan cantidades.
- Control de stock al escribir, aumentar y agregar nuevamente.
- Campos de cantidad que permiten solamente números enteros positivos.
- Bloqueo de `e`, `E`, `+`, `-`, `.`, `,`, letras y pegado de valores inválidos.
- Prevención de cambios accidentales por rueda del mouse.
- Confirmación accesible antes de eliminar un artículo al reducir desde cantidad 1.
- Subtotales, total de unidades y total de compra actualizados inmediatamente.
- Toasts no bloqueantes, auto-cerrables y cerrables manualmente; no se usa `alert()`.
- Interfaz responsive, accesible y con estados visibles de foco.

## Instalación

**URL DEL REPOSITORIO: [PENDIENTE]**

```bash
git clone URL_DEL_REPOSITORIO
cd NOMBRE_DEL_PROYECTO
pnpm install
pnpm dev
```

> Si utilizas npm en lugar de pnpm, ejecuta `npm install` y `npm run dev`.

Después abre la dirección que Vite muestra en la terminal (habitualmente `http://localhost:3000`).

## Scripts disponibles

| Comando | Uso |
| --- | --- |
| `pnpm dev` | Inicia el entorno de desarrollo de Vite. |
| `pnpm build` | Genera la compilación de producción en `dist/`. |
| `pnpm preview` | Previsualiza localmente la compilación de producción. |

## Validaciones implementadas

- La cantidad mínima es 1; no se admite 0 ni números negativos.
- Solo se aceptan dígitos: no se permiten exponentes, signos, punto, coma, letras ni símbolos.
- Pegar `-5`, `3e2`, `abc`, `12.5`, `10,5` o `+5` no modifica los campos.
- El máximo por producto coincide con el stock definido por el instructor.
- Al intentar excederlo aparece el mensaje: **“Este es el máximo de producto disponible en stock”**.
- Con un producto en cantidad 1, el botón `−` solicita confirmación antes de eliminarlo.

## Capturas y evidencias

La carpeta [`evidencias`](./evidencias) está preparada para las siete capturas requeridas por la evaluación:

1. Navbar e ícono con contador.
2. Agregar producto desde catálogo.
3. Bloqueo de `e`, negativos y `0`.
4. Toast de stock máximo.
5. Cantidad mínima con opción de eliminar.
6. Subtotales y total con varios productos.
7. Producto eliminado y total recalculado.

Las capturas deben tomarse durante la ejecución real de la aplicación; no se incluyen evidencias inventadas.

## Estructura principal

```text
src/
├── components/   # UI reutilizable: catálogo, cantidad, carrito, toasts y diálogo
├── data/         # Catálogo PRODUCTOS obligatorio
├── hooks/        # Estado único del carrito y toasts
└── utils/        # Moneda COP y validación de cantidades
```
