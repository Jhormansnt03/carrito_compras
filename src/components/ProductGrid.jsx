import { ProductCard } from "./ProductCard"

export function ProductGrid({ products, quantities, remainingFor, onQuantityChange, onAdd, onMaximum, onMinimum }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          quantity={quantities[product.id] ?? 1}
          available={remainingFor(product.id)}
          onQuantityChange={(quantity) => onQuantityChange(product.id, quantity)}
          onAdd={() => onAdd(product)}
          onMaximum={onMaximum}
          onMinimum={onMinimum}
        />
      ))}
    </div>
  )
}
