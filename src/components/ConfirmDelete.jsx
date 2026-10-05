import { useEffect, useRef } from "react"
import { Trash2, X } from "lucide-react"

export function ConfirmDelete({ product, onConfirm, onCancel }) {
  const dialogRef = useRef(null)
  const confirmButtonRef = useRef(null)

  useEffect(() => {
    confirmButtonRef.current?.focus()
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onCancel()
        return
      }
      if (event.key !== "Tab" || !dialogRef.current) return

      const focusable = [...dialogRef.current.querySelectorAll("button:not([disabled])")]
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
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [onCancel])

  if (!product) return null

  return (
    <div className="confirm-layer" role="presentation">
      <div
        ref={dialogRef}
        className="confirm-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-delete-title"
        aria-describedby="confirm-delete-description"
      >
        <button type="button" className="icon-button confirm-dialog__close" onClick={onCancel} aria-label="Cancelar eliminación">
          <X size={19} aria-hidden="true" />
        </button>
        <span className="confirm-dialog__icon" aria-hidden="true">
          <Trash2 size={24} />
        </span>
        <p className="section-kicker">Cantidad mínima</p>
        <h2 id="confirm-delete-title">¿Desea eliminar el producto?</h2>
        <p id="confirm-delete-description">
          Esta es la cantidad mínima para <strong>{product.nombre}</strong>. Puede conservarlo o retirarlo de la canasta.
        </p>
        <div className="confirm-dialog__actions">
          <button type="button" className="button button--secondary" onClick={onCancel}>
            Cancelar
          </button>
          <button type="button" className="button button--danger" onClick={onConfirm} ref={confirmButtonRef}>
            <Trash2 size={17} aria-hidden="true" />
            Confirmar eliminación
          </button>
        </div>
      </div>
    </div>
  )
}
