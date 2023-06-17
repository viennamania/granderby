import { atom, useAtom } from 'jotai';
import { LAYOUT_OPTIONS } from '@/lib/constants';

// 1. set initial atom for criptic layout
const granderbyLayoutAtom = atom(
  typeof window !== 'undefined'
    ? localStorage.getItem('granderby-layout')
    : LAYOUT_OPTIONS.MOMOCON
);

const granderbyLayoutAtomWithPersistence = atom(
  (get) => get(granderbyLayoutAtom),
  (get, set, newStorage: any) => {
    set(granderbyLayoutAtom, newStorage);

    localStorage.setItem('granderby-layout', newStorage);
  }
);

// 2. useLayout hook to check which layout is available
export function useLayout() {
  ///console.log("granderbyLayoutAtom", granderbyLayoutAtom);

  ///console.log("granderbyLayoutAtomWithPersistence", granderbyLayoutAtomWithPersistence);

  const [layout, setLayout] = useAtom(granderbyLayoutAtomWithPersistence);

  //setLayout("Momocon");
  ///console.log("layout", layout);

  return {
    layout,
    setLayout,
  };
}
