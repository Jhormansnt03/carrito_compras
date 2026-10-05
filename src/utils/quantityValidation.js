export const STOCK_MAX_MESSAGE = "Este es el máximo de producto disponible en stock"
export const MIN_QUANTITY_MESSAGE = "La cantidad mínima es 1"

const navigationKeys = new Set([
  "Backspace",
  "Delete",
  "Tab",
  "ArrowLeft",
  "ArrowRight",
  "Home",
  "End",
])

export function isDigitsOnly(value) {
  return /^\d+$/.test(value)
}

export function shouldBlockQuantityKey(event) {
  if (event.ctrlKey || event.metaKey || event.altKey) {
    return false
  }

  if (navigationKeys.has(event.key)) {
    return false
  }

  return !/^\d$/.test(event.key)
}

export function getValueAfterPaste(input, pastedText) {
  const start = input.selectionStart ?? input.value.length
  const end = input.selectionEnd ?? input.value.length
  return `${input.value.slice(0, start)}${pastedText}${input.value.slice(end)}`
}
