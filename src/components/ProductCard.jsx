import {
  Candy,
  Coffee,
  Cookie,
  GlassWater,
  PackageOpen,
  Plus,
  Wheat,
} from "lucide-react"
import { formatCOP } from "../utils/currency"
import { QuantityInput } from "./QuantityInput"

const productIcons = {
  1: Coffee,
  2: Wheat,
  3: Cookie,
  4: Candy,
  5: PackageOpen,
  6: GlassWater,
}

export function ProductCard({
  product,
  quantity,
  available,
  onQuantityChange,
  onAdd,
  onMaximum,
  onMinimum,
}) {
  const ProductIcon = productIcons[product.id] ?? PackageOpen
  const unavailable = available <= 0
  const visibleQuantity = Math.min(quantity, Math.max(1, available))

  return (
    <article className={`product-card ${unavailable ? "product-card--sold-out" : ""}`}>
      <div className="product-card__topline">
        <span className="product-icon" aria-hidden="true">
          <ProductIcon size={25} strokeWidth={1.85} />
        </span>
        <span className={`stock-chip ${unavailable ? "stock-chip--empty" : ""}`}>
          {unavailable
            ? "Sin unidades disponibles"
            : product.stock === 1
              ? "Última unidad"
              : `${available} disponible${available === 1 ? "" : "s"} para agregar`}
        </span>
      </div>

      <div className="product-card__content">
        <p className="product-card__eyebrow">Selección colombiana</p>
        <h3>{product.nombre}</h3>
        <p className="product-card__price">{formatCOP(product.precio)}</p>
        <p className="product-card__stock">Stock total: {product.stock} unidades</p>
      </div>

      <div className="product-card__actions">
        <label className="quantity-label" htmlFor={`catalog-quantity-${product.id}`}>
          Cantidad
        </label>
        <div className="product-card__control-row">
          <QuantityInput
            id={`catalog-quantity-${product.id}`}
            value={visibleQuantity}
            max={Math.max(1, available)}
            disabled={unavailable}
            ariaLabel={`Cantidad de ${product.nombre}`}
            onValueChange={onQuantityChange}
            onMaximum={onMaximum}
            onMinimum={onMinimum}
          />
          <button
            type="button"
            className="button button--primary add-button"
            onClick={onAdd}
            disabled={unavailable}
          >
            <Plus size={18} strokeWidth={2.4} aria-hidden="true" />
            Agregar
          </button>
        </div>
      </div>
    </article>
  )
}
