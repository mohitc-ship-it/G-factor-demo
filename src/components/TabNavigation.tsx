import React from 'react';
import { LayoutDashboard, Book, BarChart3, Bot, ShieldAlert } from 'lucide-react';

interface TabNavigationProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'knowledge-base', label: 'Knowledge Base', icon: Book },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot },
    { id: 'rules', label: 'Rules', icon: ShieldAlert },
];

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
    return (
        <div className="bg-white/80 backdrop-blur-md border-b border-border sticky top-[73px] z-10 shadow-sm">
            <div className="container">
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className={`
                  flex items-center gap-2 px-4 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap
                  ${isActive
                                        ? 'border-primary text-primary bg-primary/5'
                                        : 'border-transparent text-muted-foreground hover:text-card-foreground hover:bg-muted/30'
                                    }
                `}
                            >
                                <Icon className={`h-4 w-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TabNavigation;
