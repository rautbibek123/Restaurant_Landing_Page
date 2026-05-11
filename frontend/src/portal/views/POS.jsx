import { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/Toast';
import { Send, Plus, Minus, Trash2 } from 'lucide-react';

export default function POS() {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [activeCat, setActiveCat] = useState('All');
  const [cart, setCart] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const { user } = useAuth();
  const toast = useToast();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('/api/menu');
        const data = await res.json();
        if (data.success) {
          setMenuItems(data.data);
          const cats = ['All', ...new Set(data.data.map(i => i.category))];
          setCategories(cats);
        }
      } catch (error) {
        toast("Failed to load POS menu items", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, [toast]);

  const filteredItems = useMemo(() => {
    if (activeCat === 'All') return menuItems;
    return menuItems.filter(i => i.category === activeCat);
  }, [activeCat, menuItems]);

  const addToCart = (item) => {
    setCart(prev => {
      const exists = prev.find(i => i.name === item.name);
      if (exists) {
        return prev.map(i => i.name === item.name ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { name: item.name, price: item.price, qty: 1 }];
    });
  };

  const updateQty = (name, delta) => {
    setCart(prev => prev.map(i => {
      if (i.name === name) {
        const newQty = i.qty + delta;
        return newQty > 0 ? { ...i, qty: newQty } : i;
      }
      return i;
    }).filter(i => i.qty > 0));
  };

  const removeItem = (name) => {
    setCart(prev => prev.filter(i => i.name !== name));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = subtotal * 0.13;
  const grandTotal = subtotal + tax;

  const handleSubmitOrder = async () => {
    if (cart.length === 0) return;
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('portal_token');
      const payload = {
        items: cart.map(i => ({ name: i.name, price: i.price, quantity: i.qty })),
        totalAmount: grandTotal
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        toast(`Order ${data.data.orderNumber} sent to kitchen!`, 'success');
        setCart([]);
      } else {
        toast(data.message || 'Failed to submit order', 'error');
      }
    } catch (err) {
      toast('Network error saving order.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div style={{padding: '40px', textAlign: 'center'}}>Loading POS System...</div>;
  }

  return (
    <div className="pos-layout">
      {/* LEFT: Menu Grid */}
      <div className="pos-menu-area">
        {/* Categories */}
        <div className="pos-categories">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`pos-cat-btn ${activeCat === cat ? 'active' : ''}`}
              onClick={() => setActiveCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Item Grid */}
        <div className="pos-grid">
          {filteredItems.map(item => (
            <div key={item._id || item.id} className="pos-item-card" onClick={() => addToCart(item)}>
              <img src={item.image} alt={item.name} className="pos-item-img" loading="lazy" />
              <div className="pos-item-info">
                <h4 className="pos-item-name">{item.name}</h4>
                <div className="pos-item-price">Rs. {item.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: Ticket / Cart */}
      <div className="pos-ticket-area">
        <div className="pos-ticket-header">
          <span>New Order</span>
          <span style={{color: 'var(--color-muted)', fontWeight: 'normal'}}>{user?.name}</span>
        </div>

        <div className="pos-ticket-items">
          {cart.length === 0 ? (
            <div style={{textAlign: 'center', color: 'var(--color-muted)', marginTop: '40px'}}>
              <p>Tap items to add to order</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.name} className="pos-ticket-item">
                <div className="pos-ticket-item-details">
                  <div className="pos-ticket-item-name">{item.name}</div>
                  <div className="pos-ticket-qty-controls">
                    <button className="pos-qty-btn" onClick={() => updateQty(item.name, -1)}><Minus size={14}/></button>
                    <span>{item.qty}</span>
                    <button className="pos-qty-btn" onClick={() => updateQty(item.name, 1)}><Plus size={14}/></button>
                    <button className="pos-qty-btn" style={{borderColor: 'transparent', color: '#E74C3C', marginLeft: 'auto'}} onClick={() => removeItem(item.name)}>
                      <Trash2 size={14}/>
                    </button>
                  </div>
                </div>
                <div className="pos-ticket-item-price">
                  Rs. {item.price * item.qty}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pos-ticket-footer">
          <div className="pos-ticket-total-row">
            <span>Subtotal</span>
            <span>Rs. {subtotal.toFixed(0)}</span>
          </div>
          <div className="pos-ticket-total-row">
            <span>VAT (13%)</span>
            <span>Rs. {tax.toFixed(0)}</span>
          </div>
          <div className="pos-ticket-total-row grand-total">
            <span>Total</span>
            <span>Rs. {grandTotal.toFixed(0)}</span>
          </div>

          <button 
            className="btn btn-primary pos-action-btn"
            disabled={cart.length === 0 || isSubmitting}
            onClick={handleSubmitOrder}
          >
            {isSubmitting ? <span className="spinner" /> : <><Send size={20} /> Send to Kitchen</>}
          </button>
        </div>
      </div>
    </div>
  );
}
