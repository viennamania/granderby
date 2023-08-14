import { atom, useAtom } from 'jotai';

const entriesDrawerAtom = atom(false);
export function useInventoriesDrawer() {
  const [isInventoriesOpen, setSettingOpen] = useAtom(entriesDrawerAtom);
  const opeInventories = () => setSettingOpen(true);
  const closeInventories = () => setSettingOpen(false);
  return {
    isInventoriesOpen,
    opeInventories,
    closeInventories,
  };
}
