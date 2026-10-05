import { ShoppingBag } from "lucide-react"
import { BrandMark } from "./BrandMark"

export function Navbar({ totalUnits, isCartOpen, onOpenCart }) {
  return (
    <header className="navbar">
      <div className="page-shell navbar__inner">
        <BrandMark />
        <button
          type="button"
          className="cart-trigger"
          aria-label={`Abrir carrito${totalUnits ? `, ${totalUnits} unidades` : ""}`}
          aria-haspopup="dialog"
          aria-expanded={isCartOpen}
          onClick={onOpenCart}
        >
          <ShoppingBag size={22} aria-hidden="true" />
          <span className="cart-trigger__label">Mi canasta</span>
          {totalUnits > 0 && (
            <span className="cart-badge" aria-label={`${totalUnits} unidades en el carrito`}>
              {totalUnits}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
