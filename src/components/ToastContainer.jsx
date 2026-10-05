import { CircleAlert, Info, X } from "lucide-react"

export function ToastContainer({ toasts, onDismiss }) {
  return (
    <div className="toast-stack" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast--${toast.tone}`} role="status">
          <span className="toast__icon" aria-hidden="true">
            {toast.tone === "warning" ? <CircleAlert size={19} /> : <Info size={19} />}
          </span>
          <p>{toast.message}</p>
          <button
            type="button"
            className="toast__close"
            onClick={() => onDismiss(toast.id)}
            aria-label="Cerrar notificación"
          >
            <X size={17} aria-hidden="true" />
          </button>
        </div>
      ))}
    </div>
  )
}
