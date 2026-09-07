import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { TabBar } from './components/TabBar';
import { Fab } from './components/Fab';
import { CaptureModal } from './components/CaptureModal';
import { MaisSheet } from './components/MaisSheet';
import { Hoje } from './screens/Hoje';
import { Placeholder } from './screens/Placeholder';
import { useAppDataContext } from './AppDataContext';

export default function App() {
  const [captureOpen, setCaptureOpen] = useState(false);
  const [maisOpen, setMaisOpen] = useState(false);
  const { addInboxItem } = useAppDataContext();

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 min-w-0 p-8 pb-24 md:pb-8">
        <Routes>
          <Route path="/" element={<Navigate to="/hoje" replace />} />
          <Route path="/hoje" element={<Hoje />} />
          <Route path="/inbox" element={<Placeholder routeId="inbox" />} />
          <Route path="/semana" element={<Placeholder routeId="semana" />} />
          <Route path="/projetos" element={<Placeholder routeId="projetos" />} />
          <Route path="/areas" element={<Placeholder routeId="areas" />} />
          <Route path="/vida" element={<Placeholder routeId="vida" />} />
        </Routes>
      </main>

      <TabBar onMaisClick={() => setMaisOpen(true)} />
      <Fab onClick={() => setCaptureOpen(true)} />
      <CaptureModal open={captureOpen} onClose={() => setCaptureOpen(false)} onSave={addInboxItem} />
      <MaisSheet open={maisOpen} onClose={() => setMaisOpen(false)} />
    </div>
  );
}
