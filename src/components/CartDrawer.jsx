import { useEffect, useRef } from "react"
import { ShoppingBag, X } from "lucide-react"
import { formatCOP } from "../utils/currency"
import { CartItem } from "./CartItem"
import { EmptyCart } from "./EmptyCart"

function keepFocusInside(event, container) {
  if (event.key !== "Tab" || !container) return

  const focusable = [...container.querySelectorAll(
    'button:not([disabled]), input:not([disabled]), a[href]',
  )]
  if (focusable.length === 0) return

  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

export function CartDrawer({
  isOpen,
  lines,
  totals,
  hasConfirmation,
  onClose,
  onIncrease,
  onDecrease,
  onQuantityChange,
  onMinimum,
  onMaximum,
  onRemove,
}) {
  const drawerRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event) => {
      if (event.key === "Escape" && !hasConfirmation) onClose()
      if (!hasConfirmation) keepFocusInside(event, drawerRef.current)
    }

    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", onKeyDown)
    if (!hasConfirmation) closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [hasConfirmation, isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="drawer-layer" role="presentation">
      <button
        type="button"
        className="drawer-backdrop"
        aria-label="Cerrar carrito"
        onClick={() => {
          if (!hasConfirmation) onClose()
        }}
      />
      <aside
        ref={drawerRef}
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <header className="cart-drawer__header">
          <div>
            <p className="section-kicker">Tu selección</p>
            <h2 id="cart-title">Mi canasta</h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="icon-button"
            onClick={() => {
              if (!hasConfirmation) onClose()
            }}
            aria-label="Cerrar carrito"
          >
            <X size={21} aria-hidden="true" />
          </button>
        </header>

        {lines.length === 0 ? (
          <EmptyCart onClose={onClose} />
        ) : (
          <>
            <ul className="cart-list" aria-label="Productos en el carrito">
              {lines.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                  onQuantityChange={onQuantityChange}
                  onMinimum={onMinimum}
                  onMaximum={onMaximum}
                  onRemove={onRemove}
                />
              ))}
            </ul>
            <footer className="cart-summary">
              <div className="cart-summary__row">
                <span>Total de unidades</span>
                <strong>{totals.totalUnits}</strong>
              </div>
              <div className="cart-summary__total">
                <span>Total de compra</span>
                <strong>{formatCOP(totals.totalPrice)}</strong>
              </div>
              <p>
                <ShoppingBag size={16} aria-hidden="true" />
                El total se actualiza al instante
              </p>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
