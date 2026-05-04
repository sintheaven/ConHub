import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Profile {
  name: string;
  coreIdentity: string;
  toneOfVoice: string;
  knowledgeBase: string;
}

export interface Trend {
  id: number;
  title: string;
  score: number;
  context: string;
}

interface DashboardContextType {
  currentProfileName: string;
  setCurrentProfileName: (name: string) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  profile: Profile | null;
  trends: Trend[];
  refreshData: () => Promise<void>;
  statusNode252: 'online' | 'offline' | 'connecting';
  statusNode188: 'online' | 'offline' | 'connecting';
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [currentProfileName, setCurrentProfileName] = useState('AllergyNet / Ольга');
  const [activeView, setActiveView] = useState('dashboard');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [trends, setTrends] = useState<Trend[]>([]);
  const [statusNode252, setStatusNode252] = useState<'online' | 'offline' | 'connecting'>('connecting');
  const [statusNode188, setStatusNode188] = useState<'online' | 'offline' | 'connecting'>('connecting');

  const fetchData = async () => {
    setStatusNode252('connecting');
    setStatusNode188('connecting');
    try {
      const [profileRes, trendsRes] = await Promise.all([
        fetch(`/api/v1/profile/${encodeURIComponent(currentProfileName)}`),
        fetch('/api/v1/trends')
      ]);

      if (profileRes.ok) {
        setProfile(await profileRes.json());
        setStatusNode252('online');
      } else {
        setStatusNode252('offline');
      }

      if (trendsRes.ok) {
        setTrends(await trendsRes.json());
        setStatusNode188('online');
      } else {
        setStatusNode188('offline');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setStatusNode252('offline');
      setStatusNode188('offline');
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentProfileName]);

  return (
    <DashboardContext.Provider value={{
      currentProfileName,
      setCurrentProfileName,
      activeView,
      setActiveView,
      profile,
      trends,
      refreshData: fetchData,
      statusNode252,
      statusNode188
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) throw new Error('useDashboard must be used within DashboardProvider');
  return context;
};
