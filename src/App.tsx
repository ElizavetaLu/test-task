import { Routes, Route, Navigate } from 'react-router';
import RootLayout from './layouts/root/RootLayout';
import JournalSingle from './pages/journal/JournalSingle';
import Frontend from './pages/description/Frontend';
import Backend from './pages/description/Backend';
import Journal from './pages/journal/Journal';
import Demo from './pages/demo/Demo';
import API from './pages/api/API';

export default function App() {
  return (
    <Routes>
      <Route path="/user" element={<RootLayout />}>
        <Route path="demo" element={<Demo />} />

        <Route path="description">
          <Route path="frontend" element={<Frontend />} />
          <Route path="backend" element={<Backend />} />
        </Route>

        <Route path="journal" element={<Journal />} />
        <Route path="journal/:id" element={<JournalSingle />} />

        <Route path="api" element={<API />} />
      </Route>

      <Route path="*" element={<Navigate to="/user/demo" />} />
    </Routes>
  );
}
