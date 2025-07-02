import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import InventoryForm from './components/InventoryManager/InventoryForm';
import StatsCard from './components/common/StatsCard';
import { Flame, Wind, Map, Building } from 'lucide-react';
import FireMap from './components/Map/FireMap';
import NewsFeed from './components/Layout/NewsFeed';
import SocialFeed from './components/Layout/SocialFeed';
import ResourcesSection from './components/Layout/ResourcesSection';
import Footer from './components/Layout/Footer';
import { useStats } from './hooks/useStats';
import { Analytics } from '@vercel/analytics/react';
import { useTranslation } from 'react-i18next';
import Forum from './components/Forum/PublicForum';

// Dashboard component to keep App.jsx clean
function Dashboard({ stats }) {
  const { t } = useTranslation();

  const statsData = [
    { title: t('dashboardDetails.activeFires'), value: stats.activeFires, icon: Flame },
    { title: t('dashboardDetails.airQuality'), value: stats.airQuality, icon: Wind },
    { title: t('dashboardDetails.fireArea'), value: stats.fireArea, icon: Map },
    { title: t('dashboardDetails.structuresDamaged'), value: stats.structuresDamaged, icon: Building },
  ];


  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      <div className="mb-20">
        <FireMap />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <NewsFeed title={t('dashboard.newsFeed')} />
        <SocialFeed title={t('dashboard.socialFeed')} />
      </div>

      <div>
        <ResourcesSection title={t('dashboard.resources')} />
      </div>
    </main>
  );
}

function App() {
  const { stats } = useStats();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard stats={stats} />} />
          <Route path="/forum" element={<Forum />} />
        </Routes>
        <Footer />
        <Analytics />
      </div>
    </Router>
  );
}

export default App;
