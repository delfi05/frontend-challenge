import React from 'react'
import { useCart } from '../context/CartContext'
import './CartPage.css'

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart()

  return (
    <div className="cart-page container">
      <h2 className="page-title h2">Carrito de Compras</h2>
      {cart.length === 0 ? (
        <div className="empty-state">
          <span className="material-icons">shopping_cart</span>
          <h3 className="h2">Tu carrito está vacío</h3>
          <p className="p1">Agrega productos desde el catálogo.</p>
        </div>
      ) : (
        <div className="cart-list">
          {cart.map((item, idx) => (
            <div className="cart-card" key={idx}>
              <div className="cart-img">
                <img src={item.product.image || '/img/default.png'} alt={item.product.name} />
              </div>
              <div className="cart-info">
                <h4 className="cart-name">{item.product.name}</h4>
                <div className="cart-details">
                  <span className="cart-qty">Cantidad: {item.quantity}</span>
                  <span className="cart-price">
                    Precio: ${item.product.basePrice.toLocaleString('es-CL')}
                  </span>
                </div>
                {item.color && <span className="cart-color">Color: {item.color}</span>}
                {item.size && <span className="cart-size">Talla: {item.size}</span>}
              </div>
              <div className="cart-actions">
                <button
                  className="btn btn-danger"
                  title="Eliminar"
                  onClick={() => removeFromCart(item.product.id)}
                >
                  <span className="material-icons">delete</span>
                </button>
              </div>
            </div>
          ))}
          <div className="cart-footer">
            <button className="btn btn-secondary" onClick={clearCart}>
              Vaciar carrito
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage