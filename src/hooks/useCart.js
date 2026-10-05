import { useCallback, useMemo, useState } from "react"

function quantityIn(items, productId) {
  return items.find((item) => item.productId === productId)?.quantity ?? 0
}

export function useCart(products) {
  const [items, setItems] = useState([])

  const productById = useMemo(
    () => new Map(products.map((product) => [product.id, product])),
    [products],
  )

  const getQuantity = useCallback(
    (productId) => quantityIn(items, productId),
    [items],
  )

  const addToCart = useCallback(
    (productId, requestedQuantity) => {
      const product = productById.get(productId)
      if (!product) return { added: 0, quantity: 0, limited: false }

      const requested = Math.max(1, Math.floor(Number(requestedQuantity) || 1))
      const expectedCurrent = getQuantity(productId)
      const expectedNext = Math.min(product.stock, expectedCurrent + requested)

      setItems((current) => {
        const currentQuantity = quantityIn(current, productId)
        const nextQuantity = Math.min(product.stock, currentQuantity + requested)
        if (nextQuantity === currentQuantity) return current

        const existing = current.find((item) => item.productId === productId)
        if (existing) {
          return current.map((item) =>
            item.productId === productId ? { ...item, quantity: nextQuantity } : item,
          )
        }
        return [...current, { productId, quantity: nextQuantity }]
      })

      return {
        added: expectedNext - expectedCurrent,
        quantity: expectedNext,
        limited: expectedNext - expectedCurrent < requested,
      }
    },
    [getQuantity, productById],
  )

  const setQuantity = useCallback(
    (productId, requestedQuantity) => {
      const product = productById.get(productId)
      const currentQuantity = getQuantity(productId)
      if (!product || currentQuantity === 0) {
        return { quantity: 0, limited: false }
      }

      const requested = Math.max(1, Math.floor(Number(requestedQuantity) || 1))
      const expectedNext = Math.min(product.stock, requested)

      setItems((current) =>
        current.map((item) => {
          if (item.productId !== productId) return item
          return { ...item, quantity: Math.min(product.stock, requested) }
        }),
      )

      return {
        quantity: expectedNext,
        limited: requested > product.stock,
      }
    },
    [getQuantity, productById],
  )

  const increment = useCallback(
    (productId) => {
      const product = productById.get(productId)
      const expectedCurrent = getQuantity(productId)
      if (!product || expectedCurrent === 0) return { quantity: 0, limited: false }

      setItems((current) =>
        current.map((item) => {
          if (item.productId !== productId || item.quantity >= product.stock) return item
          return { ...item, quantity: item.quantity + 1 }
        }),
      )

      return {
        quantity: Math.min(product.stock, expectedCurrent + 1),
        limited: expectedCurrent >= product.stock,
      }
    },
    [getQuantity, productById],
  )

  const decrement = useCallback(
    (productId) => {
      const expectedQuantity = getQuantity(productId)
      if (expectedQuantity <= 1) return { needsConfirmation: true }

      setItems((current) =>
        current.map((item) => {
          if (item.productId !== productId || item.quantity <= 1) return item
          return { ...item, quantity: item.quantity - 1 }
        }),
      )
      return { needsConfirmation: false }
    },
    [getQuantity],
  )

  const remove = useCallback((productId) => {
    setItems((current) => current.filter((item) => item.productId !== productId))
  }, [])

  const lines = useMemo(
    () =>
      items
        .map((item) => {
          const product = productById.get(item.productId)
          return product ? { ...product, quantity: item.quantity } : null
        })
        .filter(Boolean),
    [items, productById],
  )

  const totals = useMemo(() => {
    const totalUnits = lines.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = lines.reduce(
      (sum, item) => sum + item.precio * item.quantity,
      0,
    )
    return { totalUnits, totalPrice }
  }, [lines])

  const remainingFor = useCallback(
    (productId) => {
      const product = productById.get(productId)
      return product ? Math.max(0, product.stock - getQuantity(productId)) : 0
    },
    [getQuantity, productById],
  )

  return {
    lines,
    totals,
    getQuantity,
    remainingFor,
    addToCart,
    setQuantity,
    increment,
    decrement,
    remove,
  }
}
