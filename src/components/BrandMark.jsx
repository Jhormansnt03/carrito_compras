import { Store } from "lucide-react"

export function BrandMark({ compact = false }) {
  return (
    <div className="brand-mark" aria-label="TIENDA PALMIRA">
      <span className="brand-mark__icon" aria-hidden="true">
        <Store size={compact ? 20 : 24} strokeWidth={2.2} />
      </span>
      <span className="brand-mark__text">
        <strong>TIENDA</strong>
        <span>PALMIRA</span>
      </span>
    </div>
  )
}
