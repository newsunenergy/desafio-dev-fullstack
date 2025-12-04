import { CommandEmpty } from 'cmdk';
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { useEffect, useState } from 'react';
import { IMenuItem } from './menu';
import _ from 'lodash';
import { Button } from '../ui/button';
import { menuItems } from '../../routes/Router';
import { useTheme } from '../../hooks/useTheme';
import { IoIosSunny, IoMdMoon } from 'react-icons/io';

export const HeaderMenu = () => {
  const { toggleTheme } = useTheme();

  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<IMenuItem[]>([]);

  const handleSearch = (value: string) => {
    const searchWord = _.deburr(value).toLocaleLowerCase();

    const filterMenu = (items: IMenuItem[]): IMenuItem[] => {
      return items.filter((item) => {
        const isTitleMatch = item.title
          .toLocaleLowerCase()
          .includes(searchWord);

        return isTitleMatch;
      });
    };

    setResults(filterMenu(menuItems));
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Digite uma palavra para buscar..."
          onChangeCapture={(e) => handleSearch(e.currentTarget.value)}
        />
        <CommandList>
          {results.length === 0 ? (
            <div className="w-[100%] flex justify-center py-[1rem]">
              <CommandEmpty className="text-black opacity-60 font-semibold">
                Nenhum resultado encontrado.
              </CommandEmpty>
            </div>
          ) : (
            <CommandGroup heading="Resultado">
              {results.map((i) => (
                <CommandItem key={i.path}>{i.title}</CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
      <div className="px-[1%] flex justify-between items-center py-[0.5rem] border-b">
        <div className="mx-auto">
          <Button
            className="h-[30px] px-[8rem] cursor-pointer bg-gray-400 bg-opacity-20 shadow-sm border"
            variant="secondary"
            onClick={() => {
              setOpen(true);
            }}
          >
            <div className="space-x-2">
              <span className="opacity-60">Pesquisar</span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">Ctrl +</span>K
              </kbd>
            </div>
          </Button>
        </div>
        <nav className="flex justify-end">
          <Button onClick={toggleTheme} className="flex items-center space-x-2">
            <IoIosSunny className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <IoMdMoon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </nav>
      </div>
    </>
  );
};