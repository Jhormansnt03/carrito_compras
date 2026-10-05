import { useEffect, useState } from "react"
import {
  getValueAfterPaste,
  isDigitsOnly,
  shouldBlockQuantityKey,
} from "../utils/quantityValidation"

export function QuantityInput({
  id,
  value,
  max,
  onValueChange,
  onMaximum,
  onMinimum,
  onRequestRemoval,
  ariaLabel,
  disabled = false,
}) {
  const [draft, setDraft] = useState(String(value))

  useEffect(() => {
    setDraft(String(value))
  }, [value])

  const commitValue = (rawValue) => {
    if (!isDigitsOnly(rawValue)) {
      setDraft(String(value))
      return false
    }

    const parsedValue = Number(rawValue)
    if (parsedValue <= 0) {
      setDraft(String(value))
      onMinimum?.()
      onRequestRemoval?.()
      return false
    }

    const permittedMaximum = Math.max(1, max)
    if (!Number.isSafeInteger(parsedValue) || parsedValue > permittedMaximum) {
      setDraft(String(permittedMaximum))
      onValueChange(permittedMaximum)
      onMaximum?.()
      return false
    }

    setDraft(String(parsedValue))
    onValueChange(parsedValue)
    return true
  }

  return (
    <input
      id={id}
      className="quantity-input"
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      autoComplete="off"
      value={draft}
      disabled={disabled}
      aria-label={ariaLabel}
      onKeyDown={(event) => {
        if (shouldBlockQuantityKey(event)) event.preventDefault()
      }}
      onChange={(event) => {
        const nextValue = event.target.value
        setDraft(nextValue)
        if (nextValue !== "") commitValue(nextValue)
      }}
      onBlur={() => {
        if (draft === "" || !isDigitsOnly(draft)) setDraft(String(value))
      }}
      onPaste={(event) => {
        const pastedText = event.clipboardData.getData("text")
        if (!isDigitsOnly(pastedText)) {
          event.preventDefault()
          return
        }

        event.preventDefault()
        commitValue(getValueAfterPaste(event.currentTarget, pastedText))
      }}
      onDrop={(event) => event.preventDefault()}
      onWheel={(event) => event.currentTarget.blur()}
    />
  )
}
