import { atom, useAtom } from 'jotai';

export type DRAWER_VIEW =
  | 'DASHBOARD_SIDEBAR'
  | 'DRAWER_MENU'
  | 'DRAWER_SEARCH'
  | 'DRAWER_FILTER'
  | 'DRAWER_PREVIEW_NFT'
  | 'DRAWER_HORSE_INFO';

const drawerAtom = atom({
  isOpen: false,
  view: 'DASHBOARD_SIDEBAR',
  tokenid: null,
});

export function useDrawer() {
  const [state, setState] = useAtom(drawerAtom);

  const openDrawer = (view: DRAWER_VIEW, tokenid: any) => {
    ///console.log("useDrawer openDrawer tokenid", tokenid);

    setState({ ...state, isOpen: true, view, tokenid: tokenid });
  };

  const closeDrawer = () => setState({ ...state, isOpen: false });

  return {
    ...state,
    openDrawer,
    closeDrawer,
  };
}
