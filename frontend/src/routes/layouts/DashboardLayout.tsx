import { Outlet } from 'react-router-dom';
import { Menu } from '../../components/shared/menu';
import { HeaderMenu } from '../../components/shared/header-menu';

export const DashboardLayout = () => {
  return (
    <div className="flex">
      <Menu />
      <div className="w-[100%] ml-20 md:ml-0">
        <HeaderMenu />
        <Outlet />
      </div>
    </div>
  );
};