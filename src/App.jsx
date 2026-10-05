import { useCallback, useMemo, useState } from "react"
import { ArrowUpRight, Leaf, MapPin, ShieldCheck, Sparkles } from "lucide-react"
import { Navbar } from "./components/Navbar"
import { ProductGrid } from "./components/ProductGrid"
import { CartDrawer } from "./components/CartDrawer"
import { ToastContainer } from "./components/ToastContainer"
import { ConfirmDelete } from "./components/ConfirmDelete"
import { PRODUCTOS } from "./data/products"
import { useCart } from "./hooks/useCart"
import { useToasts } from "./hooks/useToasts"
import {
  MIN_QUANTITY_MESSAGE,
  STOCK_MAX_MESSAGE,
} from "./utils/quantityValidation"

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [pendingRemovalId, setPendingRemovalId] = useState(null)
  const [catalogQuantities, setCatalogQuantities] = useState(() =>
    Object.fromEntries(PRODUCTOS.map((product) => [product.id, 1])),
  )

  const cart = useCart(PRODUCTOS)
  const { toasts, showToast, dismissToast } = useToasts()

  const pendingProduct = useMemo(
    () => cart.lines.find((item) => item.id === pendingRemovalId) ?? null,
    [cart.lines, pendingRemovalId],
  )

  const openCart = useCallback(() => setIsCartOpen(true), [])
  const closeCart = useCallback(() => {
    setIsCartOpen(false)
    window.setTimeout(() => document.querySelector(".cart-trigger")?.focus(), 0)
  }, [])
  const showMaximumToast = useCallback(
    () => showToast(STOCK_MAX_MESSAGE, "warning"),
    [showToast],
  )
  const showMinimumToast = useCallback(
    () => showToast(MIN_QUANTITY_MESSAGE, "warning"),
    [showToast],
  )

  const handleCatalogQuantityChange = (productId, quantity) => {
    setCatalogQuantities((current) => ({ ...current, [productId]: quantity }))
  }

  const handleAdd = (product) => {
    const available = cart.remainingFor(product.id)
    if (available <= 0) return

    const selectedQuantity = Math.min(catalogQuantities[product.id] ?? 1, available)
    const result = cart.addToCart(product.id, selectedQuantity)
    if (result.limited) showMaximumToast()

    const nextAvailable = Math.max(0, product.stock - result.quantity)
    setCatalogQuantities((current) => ({
      ...current,
      [product.id]: Math.min(current[product.id] ?? 1, Math.max(1, nextAvailable)),
    }))
  }

  const handleCartQuantityChange = (productId, quantity) => {
    const result = cart.setQuantity(productId, quantity)
    if (result.limited) showMaximumToast()
  }

  const handleIncrease = (productId) => {
    const result = cart.increment(productId)
    if (result.limited) showMaximumToast()
  }

  const handleDecrease = (productId) => {
    const result = cart.decrement(productId)
    if (result.needsConfirmation) setPendingRemovalId(productId)
  }

  const handleMinimumInCart = (product) => {
    showMinimumToast()
    setPendingRemovalId(product.id)
  }

  const confirmRemoval = () => {
    if (pendingRemovalId !== null) cart.remove(pendingRemovalId)
    setPendingRemovalId(null)
  }

  return (
    <>
      <Navbar totalUnits={cart.totals.totalUnits} isCartOpen={isCartOpen} onOpenCart={openCart} />

      <main>
        <section className="hero-section">
          <div className="page-shell hero-section__grid">
            <div className="hero-section__content">
              <p className="eyebrow"><MapPin size={15} aria-hidden="true" /> Palmira, Valle del Cauca</p>
              <h1>El sabor de <em>nuestra tierra</em>, en tu canasta.</h1>
              <p className="hero-section__lead">
                Una selección consciente de básicos colombianos para disfrutar, compartir y llevar a casa.
              </p>
              <div className="hero-section__notes">
                <span><Leaf size={16} aria-hidden="true" /> Selección local</span>
                <span><ShieldCheck size={16} aria-hidden="true" /> Stock verificado</span>
              </div>
              <a className="hero-section__jump" href="#catalogo">
                Conocer productos <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
            <aside className="hero-card" aria-label="Compra con control de stock">
              <span className="hero-card__sparkle" aria-hidden="true"><Sparkles size={22} /></span>
              <p>Compra transparente</p>
              <strong>Sin sorpresas al finalizar</strong>
              <span>Controlamos cada unidad disponible mientras armas tu canasta.</span>
            </aside>
          </div>
        </section>

        <section className="catalog-section page-shell" id="catalogo" aria-labelledby="catalog-title">
          <div className="catalog-section__heading">
            <div>
              <p className="section-kicker">Mercado de confianza</p>
              <h2 id="catalog-title">Una selección para la mesa</h2>
            </div>
            <p>Elige tus cantidades con tranquilidad: el inventario se actualiza en tiempo real.</p>
          </div>

          <ProductGrid
            products={PRODUCTOS}
            quantities={catalogQuantities}
            remainingFor={cart.remainingFor}
            onQuantityChange={handleCatalogQuantityChange}
            onAdd={handleAdd}
            onMaximum={showMaximumToast}
            onMinimum={showMinimumToast}
          />
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-shell">
          <span>TIENDA PALMIRA</span>
          <p>Productos de nuestra tierra, compra clara.</p>
        </div>
      </footer>

      <CartDrawer
        isOpen={isCartOpen}
        lines={cart.lines}
        totals={cart.totals}
        hasConfirmation={Boolean(pendingProduct)}
        onClose={closeCart}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        onQuantityChange={handleCartQuantityChange}
        onMinimum={handleMinimumInCart}
        onMaximum={showMaximumToast}
        onRemove={cart.remove}
      />
      <ConfirmDelete
        product={pendingProduct}
        onCancel={() => setPendingRemovalId(null)}
        onConfirm={confirmRemoval}
      />
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  )
}

export default App
