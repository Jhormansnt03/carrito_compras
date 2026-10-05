import { useCallback, useEffect, useRef, useState } from "react"

const TOAST_DURATION = 4200

export function useToasts() {
  const [toasts, setToasts] = useState([])
  const timers = useRef(new Map())
  const visibleMessages = useRef(new Set())

  const dismissToast = useCallback((id) => {
    window.clearTimeout(timers.current.get(id))
    timers.current.delete(id)
    setToasts((current) => {
      const toast = current.find((item) => item.id === id)
      if (toast) visibleMessages.current.delete(toast.message)
      return current.filter((item) => item.id !== id)
    })
  }, [])

  const showToast = useCallback(
    (message, tone = "info") => {
      if (visibleMessages.current.has(message)) return null

      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`
      visibleMessages.current.add(message)
      setToasts((current) => [...current, { id, message, tone }])
      const timer = window.setTimeout(() => dismissToast(id), TOAST_DURATION)
      timers.current.set(id, timer)
      return id
    },
    [dismissToast],
  )

  useEffect(
    () => () => {
      timers.current.forEach((timer) => window.clearTimeout(timer))
      timers.current.clear()
      visibleMessages.current.clear()
    },
    [],
  )

  return { toasts, showToast, dismissToast }
}
