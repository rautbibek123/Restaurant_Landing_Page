import { useState, useEffect } from 'react';
import { Save, Building2, Receipt, Globe, Monitor, Bell, ShieldCheck } from 'lucide-react';
import { useToast } from '../../components/Toast';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();

  const [settings, setSettings] = useState({
    restaurantName: 'Annapurna Kitchen',
    address: 'Baluwatar, Kathmandu, Nepal',
    phone: '+977 1-4412345',
    email: 'info@annapurnakitchen.com.np',
    currency: 'Rs.',
    vatPercent: 13,
    serviceCharge: 0,
    autoPrintKOT: true,
    lowStockThreshold: 10,
    enableLoyalty: true,
    loyaltyDiscount: 10
  });

  useEffect(() => {
    const saved = localStorage.getItem('annapurna_settings');
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    localStorage.setItem('annapurna_settings', JSON.stringify(settings));
    setIsSaving(false);
    toast('Settings saved successfully', 'success');
  };

  const tabs = [
    { id: 'general', label: 'Restaurant Profile', icon: Building2 },
    { id: 'financial', label: 'Tax & Currency', icon: Receipt },
    { id: 'pos', label: 'POS Operations', icon: Monitor },
    { id: 'security', label: 'Security & Access', icon: ShieldCheck },
  ];

  return (
    <div className="settings-page">
      <div className="mgmt-header">
        <div>
          <h2 className="mgmt-title">System Settings</h2>
          <p className="mgmt-card-sub">Configure your restaurant's core preferences</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave} disabled={isSaving}>
          <Save size={18} /> {isSaving ? 'Saving...' : 'Save Configuration'}
        </button>
      </div>

      <div className="settings-layout">
        <aside className="settings-nav">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              className={`settings-nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </aside>

        <main className="settings-content">
          <div className="mgmt-card">
            {activeTab === 'general' && (
              <div className="settings-group">
                <h3>Restaurant Information</h3>
                <div className="input-grid">
                  <div className="form-item">
                    <label>Business Name</label>
                    <input type="text" value={settings.restaurantName} onChange={e => setSettings({...settings, restaurantName: e.target.value})} />
                  </div>
                  <div className="form-item">
                    <label>Contact Email</label>
                    <input type="email" value={settings.email} onChange={e => setSettings({...settings, email: e.target.value})} />
                  </div>
                  <div className="form-item">
                    <label>Phone Number</label>
                    <input type="text" value={settings.phone} onChange={e => setSettings({...settings, phone: e.target.value})} />
                  </div>
                  <div className="form-item full">
                    <label>Physical Address</label>
                    <textarea value={settings.address} onChange={e => setSettings({...settings, address: e.target.value})} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'financial' && (
              <div className="settings-group">
                <h3>Financial Configuration</h3>
                <div className="input-grid">
                  <div className="form-item">
                    <label>Base Currency Symbol</label>
                    <input type="text" value={settings.currency} onChange={e => setSettings({...settings, currency: e.target.value})} />
                  </div>
                  <div className="form-item">
                    <label>VAT Percentage (%)</label>
                    <input type="number" value={settings.vatPercent} onChange={e => setSettings({...settings, vatPercent: Number(e.target.value)})} />
                  </div>
                  <div className="form-item">
                    <label>Service Charge (%)</label>
                    <input type="number" value={settings.serviceCharge} onChange={e => setSettings({...settings, serviceCharge: Number(e.target.value)})} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pos' && (
              <div className="settings-group">
                <h3>POS & Workflow</h3>
                <div className="toggle-list">
                  <div className="toggle-item">
                    <div>
                      <strong>Auto-print KOT</strong>
                      <p>Automatically trigger printer when order is sent to kitchen</p>
                    </div>
                    <label className="switch">
                      <input type="checkbox" checked={settings.autoPrintKOT} onChange={e => setSettings({...settings, autoPrintKOT: e.target.checked})} />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <div>
                      <strong>Enable Customer Loyalty</strong>
                      <p>Apply automatic discounts to frequent diners</p>
                    </div>
                    <label className="switch">
                      <input type="checkbox" checked={settings.enableLoyalty} onChange={e => setSettings({...settings, enableLoyalty: e.target.checked})} />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <div className="form-item" style={{ marginTop: '15px' }}>
                    <label>Low Stock Warning Threshold</label>
                    <input type="number" value={settings.lowStockThreshold} onChange={e => setSettings({...settings, lowStockThreshold: Number(e.target.value)})} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="settings-group">
                <h3>Access Control</h3>
                <div className="info-alert">
                  <ShieldCheck size={20} />
                  <p>Security policies are currently managed via the Staff Management section. Only administrators can access system-wide configuration.</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
