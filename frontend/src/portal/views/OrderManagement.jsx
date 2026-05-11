import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/Toast';

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const toast = useToast();

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('portal_token');
      const res = await fetch('/api/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setOrders(data.data);
      }
    } catch (err) {
      toast('Failed to load orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // In a real app, we'd poll this or use WebSockets
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('portal_token');
      await fetch(`/api/orders/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      fetchOrders();
    } catch (err) {
      toast('Failed to update status', 'error');
    }
  };

  const markPaid = async (id) => {
    try {
      const token = localStorage.getItem('portal_token');
      await fetch(`/api/orders/${id}/pay`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchOrders();
      toast('Order marked as paid!', 'success');
    } catch (err) {
      toast('Failed to process payment', 'error');
    }
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <div>
      <h1 style={{marginBottom: '20px', fontFamily: 'var(--font-serif)', color: 'var(--color-gold)'}}>Active Orders</h1>
      
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px'}}>
        {orders.map(order => (
          <div key={order._id} className="glass-card" style={{padding: '20px', borderTop: `4px solid ${order.status === 'completed' ? '#2ECC71' : 'var(--color-gold)'}`}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
              <strong>{order.orderNumber}</strong>
              <span className={`badge badge-${order.status === 'completed' ? 'green' : 'orange'}`}>{order.status}</span>
            </div>
            
            <div style={{marginBottom: '15px'}}>
              {order.items.map(item => (
                <div key={item._id} style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-text-secondary)', margin: '4px 0'}}>
                  <span>{item.quantity}x {item.name}</span>
                  <span>Rs. {item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div style={{display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '10px', marginBottom: '15px'}}>
              <span>Total</span>
              <strong>Rs. {order.totalAmount}</strong>
            </div>

            <div style={{display: 'flex', gap: '10px', flexDirection: 'column'}}>
              {order.status === 'pending' && (
                <button className="btn btn-primary" onClick={() => updateStatus(order._id, 'preparing')}>Acknowledge (Start Prep)</button>
              )}
              {order.status === 'preparing' && (
                <button className="btn btn-primary" onClick={() => updateStatus(order._id, 'completed')}>Mark Ready to Serve</button>
              )}
              {order.paymentStatus === 'unpaid' && (
                <button className="btn btn-outline" style={{borderColor: '#2ECC71', color: '#2ECC71'}} onClick={() => markPaid(order._id)}>Process Payment</button>
              )}
            </div>
            
            <div style={{marginTop: '15px', fontSize: '0.75rem', color: 'var(--color-muted)', textAlign: 'center'}}>
              Taken by: {order.staffId?.name || 'Unknown'} • Payment: <strong style={{color: order.paymentStatus === 'paid' ? '#2ECC71' : '#E74C3C'}}>{order.paymentStatus.toUpperCase()}</strong>
            </div>
          </div>
        ))}
        {orders.length === 0 && <p>No active orders.</p>}
      </div>
    </div>
  );
}
