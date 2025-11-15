import { useState } from 'react';
import { FaSignOutAlt, FaBlog, FaStar, FaChartLine } from 'react-icons/fa';

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'reviews' | 'blogs' | 'analytics'>('reviews');

  const tabs = [
    { id: 'reviews' as const, label: 'Reviews', icon: FaStar },
    { id: 'blogs' as const, label: 'Blogs', icon: FaBlog },
    { id: 'analytics' as const, label: 'Analytics', icon: FaChartLine },
  ];

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <header className="bg-background-secondary shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-text-primary">Admin Dashboard</h1>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-background-secondary border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex gap-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? 'text-accent-primary border-accent-primary'
                      : 'text-text-secondary border-transparent hover:text-text-primary'
                  }`}
                >
                  <Icon />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'reviews' && (
          <div className="text-text-primary">
            <h2 className="text-2xl font-bold mb-4">Manage Reviews</h2>
            <p className="text-text-secondary">Review management interface coming soon...</p>
          </div>
        )}
        {activeTab === 'blogs' && (
          <div className="text-text-primary">
            <h2 className="text-2xl font-bold mb-4">Manage Blogs</h2>
            <p className="text-text-secondary">Blog management interface coming soon...</p>
          </div>
        )}
        {activeTab === 'analytics' && (
          <div className="text-text-primary">
            <h2 className="text-2xl font-bold mb-4">Analytics</h2>
            <p className="text-text-secondary">Analytics dashboard coming soon...</p>
          </div>
        )}
      </main>
    </div>
  );
};
