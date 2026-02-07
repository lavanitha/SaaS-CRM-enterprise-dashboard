import React, { useState } from 'react';
import { FiUser, FiLock, FiBell, FiShield, FiDatabase, FiGlobe } from 'react-icons/fi';
import MainLayout from "../components/layout/MainLayout";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Badge from "../components/ui/Badge";

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    // Profile Settings
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1234567890',
    timezone: 'UTC+5:30',
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    taskReminders: true,
    caseUpdates: true,
    weeklyReports: false,
    
    // Security Settings
    twoFactorEnabled: false,
    sessionTimeout: 30,
    passwordLastChanged: '2024-01-15',
    
    // Company Settings
    companyName: 'Acme Corporation',
    companyDomain: 'acme.com',
    defaultTimezone: 'UTC+5:30',
    workingHours: '9:00 AM - 6:00 PM'
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'security', label: 'Security', icon: FiShield },
    { id: 'company', label: 'Company', icon: FiDatabase },
    { id: 'preferences', label: 'Preferences', icon: FiGlobe }
  ];

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleToggle = (field) => {
    setSettings(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved:', settings);
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            value={settings.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
          />
          <Input
            label="Last Name"
            value={settings.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            value={settings.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
          <Input
            label="Phone"
            value={settings.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
          />
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-white mb-2">
              Timezone
            </label>
            <select 
              value={settings.timezone}
              onChange={(e) => handleInputChange('timezone', e.target.value)}
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="UTC+5:30">UTC+5:30 (India)</option>
              <option value="UTC+0">UTC+0 (London)</option>
              <option value="UTC-5">UTC-5 (New York)</option>
              <option value="UTC-8">UTC-8 (Los Angeles)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
            { key: 'pushNotifications', label: 'Push Notifications', description: 'Receive browser push notifications' },
            { key: 'taskReminders', label: 'Task Reminders', description: 'Get reminded about upcoming task deadlines' },
            { key: 'caseUpdates', label: 'Case Updates', description: 'Notify when cases are updated or resolved' },
            { key: 'weeklyReports', label: 'Weekly Reports', description: 'Receive weekly summary reports' }
          ].map((setting) => (
            <div key={setting.key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div>
                <h4 className="text-white font-medium">{setting.label}</h4>
                <p className="text-white/60 text-sm">{setting.description}</p>
              </div>
              <button
                onClick={() => handleToggle(setting.key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings[setting.key] ? 'bg-blue-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings[setting.key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Security Settings</h3>
        <div className="space-y-6">
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                <p className="text-white/60 text-sm">Add an extra layer of security to your account</p>
              </div>
              <button
                onClick={() => handleToggle('twoFactorEnabled')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.twoFactorEnabled ? 'bg-blue-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            {settings.twoFactorEnabled && (
              <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                <p className="text-green-300 text-sm">✓ Two-factor authentication is enabled</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Session Timeout (minutes)
              </label>
              <select 
                value={settings.sessionTimeout}
                onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value))}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={120}>2 hours</option>
                <option value={480}>8 hours</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password Last Changed
              </label>
              <p className="text-white/70 py-3">{settings.passwordLastChanged}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline">
              Change Password
            </Button>
            <Button variant="outline">
              Download Backup Codes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompanySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Company Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Company Name"
            value={settings.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
          />
          <Input
            label="Company Domain"
            value={settings.companyDomain}
            onChange={(e) => handleInputChange('companyDomain', e.target.value)}
          />
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-white mb-2">
              Default Timezone
            </label>
            <select 
              value={settings.defaultTimezone}
              onChange={(e) => handleInputChange('defaultTimezone', e.target.value)}
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="UTC+5:30">UTC+5:30 (India)</option>
              <option value="UTC+0">UTC+0 (London)</option>
              <option value="UTC-5">UTC-5 (New York)</option>
              <option value="UTC-8">UTC-8 (Los Angeles)</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-white mb-2">
              Working Hours
            </label>
            <Input
              value={settings.workingHours}
              onChange={(e) => handleInputChange('workingHours', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Application Preferences</h3>
        <div className="space-y-4">
          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="text-white font-medium mb-2">Theme</h4>
            <div className="flex gap-2">
              <Badge variant="primary">Light</Badge>
              <Badge variant="secondary">Dark</Badge>
              <Badge variant="secondary">Auto</Badge>
            </div>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="text-white font-medium mb-2">Language</h4>
            <select className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="text-white font-medium mb-2">Date Format</h4>
            <select className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileSettings();
      case 'notifications': return renderNotificationSettings();
      case 'security': return renderSecuritySettings();
      case 'company': return renderCompanySettings();
      case 'preferences': return renderPreferences();
      default: return renderProfileSettings();
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
            <p className="text-white/60">Manage your account settings and preferences.</p>
          </div>
          <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600">
            Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <GlassCard className="p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className="text-lg" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </GlassCard>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <GlassCard className="p-6">
              {renderTabContent()}
            </GlassCard>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
