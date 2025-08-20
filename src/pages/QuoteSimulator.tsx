import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import './QuoteSimulator.css'

const QuoteSimulator = () => {
  const { cart } = useCart()
  const [company, setCompany] = useState('')
  const [rut, setRut] = useState('')
  const [email, setEmail] = useState('')
  const [summary, setSummary] = useState('')

  // Calcula el mejor descuento por volumen
  const getUnitPrice = (product: any, quantity: number) => {
    if (!product.priceBreaks) return product.basePrice
    let best = product.basePrice
    product.priceBreaks.forEach((b: any) => {
        if (quantity >= b.minQty && b.price < best) best = b.price
    })
    return best
  }

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    let total = 0
    let lines: string[] = []
    cart.forEach(item => {
    const unitPrice = getUnitPrice(item.product, item.quantity)
    const subtotal = unitPrice * item.quantity
    total += subtotal
    lines.push(
      `${item.product.name} x${item.quantity} - $${unitPrice.toLocaleString('es-CL')} c/u = $${subtotal.toLocaleString('es-CL')}`
    )
  })
    const resumen = 
        `Empresa: ${company}\nRUT: ${rut}\nEmail: ${email}\n\nCotización:\n${lines.join('\n')}\n\nTotal: $${total.toLocaleString('es-CL')}`
    setSummary(resumen)
  }

  const handleExport = () => {
    const blob = new Blob([summary], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cotizacion.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="quote-simulator container">
      <div className="quote-card">
        <h2 className="page-title h2">Simulador de Cotización</h2>
        <form className="quote-form" onSubmit={handleGenerate}>
          <div className="form-row">
            <input
              type="text"
              placeholder="Nombre empresa"
              value={company}
              onChange={e => setCompany(e.target.value)}
              className="input p1"
              required
            />
            <input
              type="text"
              placeholder="RUT"
              value={rut}
              onChange={e => setRut(e.target.value)}
              className="input p1"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="input p1"
              required
            />
            <button type="submit" className="btn btn-primary cta1">
              Generar Cotización
            </button>
          </div>
        </form>
        {summary && (
          <div className="quote-summary">
            <h3 className="h3">Resumen</h3>
            <pre>{summary}</pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuoteSimulator