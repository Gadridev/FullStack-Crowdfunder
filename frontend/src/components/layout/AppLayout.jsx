import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Ticker from './Ticker';

export default function AppLayout() {
  return (

    <div className="flex flex-col min-h-screen">
      <Ticker />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-bg-primary">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
