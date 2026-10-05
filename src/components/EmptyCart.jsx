import { ShoppingBasket } from "lucide-react"

export function EmptyCart({ onClose }) {
  return (
    <div className="empty-cart">
      <span className="empty-cart__icon" aria-hidden="true">
        <ShoppingBasket size={31} strokeWidth={1.7} />
      </span>
      <h3>Tu canasta está esperando</h3>
      <p>Explora productos de nuestra tierra y agrégalos a tu compra.</p>
      <button type="button" className="button button--secondary" onClick={onClose}>
        Ver productos
      </button>
    </div>
  )
}
