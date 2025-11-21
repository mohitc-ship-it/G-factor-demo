import { useState } from 'react';
import TopBar from './components/TopBar';
import TabNavigation from './components/TabNavigation';
import Dashboard from './pages/Dashboard';
import KnowledgeBase from './pages/KnowledgeBase';
import Analytics from './pages/Analytics';
import AIAssistant from './pages/AIAssistant';
import Rules from './pages/Rules';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'knowledge-base':
        return <KnowledgeBase />;
      case 'analytics':
        return <Analytics />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'rules':
        return <Rules />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 container py-6">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
