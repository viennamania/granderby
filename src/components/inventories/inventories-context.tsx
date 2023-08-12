import { atom, useAtom } from 'jotai';

const inventoriesDrawerAtom = atom(false);
export function useInventoriesDrawer() {
  const [isSettingsOpen, setSettingOpen] = useAtom(inventoriesDrawerAtom);
  const opeSettings = () => setSettingOpen(true);
  const closeSettings = () => setSettingOpen(false);
  return {
    isSettingsOpen,
    opeSettings,
    closeSettings,
  };
}
