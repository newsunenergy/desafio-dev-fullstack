import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { menuItems, routes } from '../../routes/Router';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { useTheme } from '../../hooks/useTheme';
import { uniqueId } from 'lodash';
import { HorizontalLogo } from './horizontal-logo';
import { Icon } from './icon';
import 'animate.css';

export interface IMenuItem {
  title: string;
  path: string;
  icon: JSX.Element;
  isOnlySearch?: boolean;
  permissions?: string[];
}

export const Menu = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useWindowWidth();

  useEffect(() => {
    if (isMobile && isOpen) setIsOpen(false);
  }, [isMobile]);

  const isDark = theme === 'dark';

  return (
    <div>
      <div
        className={`fixed top-0 left-0 h-screen border-r transition-all duration-300 pt-4 z-50 ${
          isOpen ? 'w-64' : 'w-20'
        } ${isDark ? 'bg-zinc-900 text-white' : 'bg-white text-black'} md:relative`}
      >
        <div
          onClick={() => navigate(routes.home.path)}
          className="cursor-pointer w-full flex justify-center"
        >
          {isOpen ? (
            <HorizontalLogo className="w-[8rem] my-2" />
          ) : (
            <Icon className="h-[2rem]" />
          )}
        </div>
        <nav className="mt-4 space-y-3 flex flex-col items-center justify-center px-4">
          {menuItems.map((item) => {
            const isActive = item.path === location.pathname;

            return (
              <div key={item.path + uniqueId()} className="w-full">
                <Button
                  size="sm"
                  className={`w-full justify-start rounded-lg ${
                    isActive
                      ? isDark
                        ? 'bg-zinc-700 text-white hover:text-black'
                        : 'bg-gray-200 text-black hover:text-white'
                      : isDark
                        ? 'bg-zinc-800 text-gray-300 hover:text-black'
                        : 'bg-gray-100 text-black hover:text-white'
                  } hover:bg-primary `}
                  onClick={() => {
                    navigate(item.path);
                    if (isMobile) setIsOpen(false);
                  }}
                >
                  <div className="flex space-x-2 items-center">
                    {item.icon}
                    {isOpen && <span>{item.title}</span>}
                  </div>
                </Button>
              </div>
            );
          })}
        </nav>
        <div className="absolute bottom-0 w-full pb-4">
          <div
            className={`flex ${isOpen ? 'mr-4 justify-end' : 'justify-center'}`}
          >
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="link"
              className="p-0 mt-2"
            >
              {isOpen ? (
                <ChevronLeft color={isDark ? 'white' : 'black'} />
              ) : (
                <ChevronRight color={isDark ? 'white' : 'black'} />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
