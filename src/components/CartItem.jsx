import { Minus, Plus, Trash2 } from "lucide-react"
import { formatCOP } from "../utils/currency"
import { QuantityInput } from "./QuantityInput"

export function CartItem({ item, onIncrease, onDecrease, onQuantityChange, onMinimum, onMaximum, onRemove }) {
  const subtotal = item.precio * item.quantity

  return (
    <li className="cart-item">
      <div className="cart-item__header">
        <div>
          <h3>{item.nombre}</h3>
          <p>{formatCOP(item.precio)} c/u</p>
        </div>
        <button
          type="button"
          className="icon-button icon-button--delete"
          onClick={() => onRemove(item.id)}
          aria-label={`Eliminar ${item.nombre} del carrito`}
          title="Eliminar producto"
        >
          <Trash2 size={18} aria-hidden="true" />
        </button>
      </div>

      <div className="cart-item__controls">
        <div className="stepper" aria-label={`Controles de cantidad de ${item.nombre}`}>
          <button
            type="button"
            className="stepper__button"
            onClick={() => onDecrease(item.id)}
            aria-label={`Reducir cantidad de ${item.nombre}`}
          >
            <Minus size={16} aria-hidden="true" />
          </button>
          <QuantityInput
            id={`cart-quantity-${item.id}`}
            value={item.quantity}
            max={item.stock}
            ariaLabel={`Cantidad en carrito de ${item.nombre}`}
            onValueChange={(quantity) => onQuantityChange(item.id, quantity)}
            onMaximum={onMaximum}
            onMinimum={() => onMinimum(item)}
          />
          <button
            type="button"
            className="stepper__button"
            onClick={() => onIncrease(item.id)}
            aria-label={`Aumentar cantidad de ${item.nombre}`}
            title={`Máximo: ${item.stock} unidades`}
          >
            <Plus size={16} aria-hidden="true" />
          </button>
        </div>
        <p className="cart-item__subtotal">
          <span>Subtotal</span>
          <strong>{formatCOP(subtotal)}</strong>
        </p>
      </div>
      <p className="cart-item__equation">
        {formatCOP(item.precio)} × {item.quantity} = {formatCOP(subtotal)}
      </p>
    </li>
  )
}
