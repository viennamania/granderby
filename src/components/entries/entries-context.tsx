import { atom, useAtom } from 'jotai';

const entriesDrawerAtom = atom(false);
export function useEntriesDrawer() {
  const [isEntriesOpen, setSettingOpen] = useAtom(entriesDrawerAtom);
  const opeEntries = () => setSettingOpen(true);
  const closeEntries = () => setSettingOpen(false);
  return {
    isEntriesOpen,
    opeEntries,
    closeEntries,
  };
}
