import { atom, useAtom } from 'jotai';

const inventoriesDrawerAtom = atom(false);
export function useInventoriesDrawer() {
  const [isInventoriesOpen, setSettingOpen] = useAtom(inventoriesDrawerAtom);
  const opeInventories = () => setSettingOpen(true);
  const closeInventories = () => setSettingOpen(false);
  return {
    isInventoriesOpen,
    opeInventories,
    closeInventories,
  };
}
