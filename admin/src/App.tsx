import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminLayout } from './pages/AdminLayout';
import { AdminPlaceholder } from './pages/AdminPlaceholder';
import { ReviewDashboard } from './pages/ReviewDashboard';
import { PageEditor } from './pages/PageEditor';
import { MenuEditor } from './pages/MenuEditor';
import { MediaLibrary } from './pages/MediaLibrary';
import { AuditLogs } from './pages/AuditLogs';
import { SettingsEditor } from './pages/SettingsEditor';

export const App: React.FC = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminPlaceholder />} />
        <Route path="/admin" element={<AdminPlaceholder />} />
        <Route path="/admin/reviews" element={<ReviewDashboard />} />
        <Route path="/reviews" element={<ReviewDashboard />} />
        <Route path="/admin/pages" element={<PageEditor />} />
        <Route path="/pages" element={<PageEditor />} />
        <Route path="/admin/menu" element={<MenuEditor />} />
        <Route path="/menu" element={<MenuEditor />} />
        <Route path="/admin/media" element={<MediaLibrary />} />
        <Route path="/media" element={<MediaLibrary />} />
        <Route path="/admin/audit" element={<AuditLogs />} />
        <Route path="/audit" element={<AuditLogs />} />
        <Route path="/admin/settings" element={<SettingsEditor />} />
        <Route path="/settings" element={<SettingsEditor />} />
      </Routes>
    </AdminLayout>
  );
};

export default App;
