/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useMeasure } from '@/lib/hooks/use-measure';
import { Plus } from '@/components/icons/plus';

import { useLocalStorage } from '@/lib/hooks/use-local-storage';

interface CollapseProps {
  label: string;
  initialOpen?: boolean;
}

export default function CollapseCurrentEvent({
  label,
  children,
  initialOpen = false,
}: React.PropsWithChildren<CollapseProps>) {
  const [currentEventIsOpen, setCurrentEventIsOpen] = useLocalStorage(
    'recent-event-isopen'
  );

  if (currentEventIsOpen === undefined) {
    setCurrentEventIsOpen(true);
  }

  ////let [isOpen, setIsOpen] = useState(livePricingIsOpen);

  const [ref, { height }] = useMeasure<HTMLDivElement>();

  /*
  useEffect(() => {
    initialOpen && setIsOpen(true);
  }, [initialOpen]);
  */

  ////const [livePricingInitialOpen] = useLocalStorage('live-pricing-initialOpen');
  //setIsOpen(livePricingInitialOpen);

  return (
    <div
      className={`ease-[cubic-bezier(0.33, 1, 0.68, 1)] relative mb-5 overflow-hidden rounded-lg bg-white shadow-card transition-all duration-[350ms] last:mb-0 hover:shadow-transaction dark:bg-light-dark ${
        currentEventIsOpen ? 'shadow-transaction' : 'shadow-card'
      }`}
      style={{ height: currentEventIsOpen ? 54 + height : 54 }}
    >
      <button
        className="flex h-13 w-full items-center justify-between px-5 py-2 text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white"
        //onClick={() => setIsOpen(!isOpen)}

        onClick={() => setCurrentEventIsOpen(!currentEventIsOpen)}
      >
        {label}

        <span
          className={`shrink-0 transition-transform duration-200 ltr:ml-4 rtl:mr-4 ${
            currentEventIsOpen ? 'rotate-45' : ''
          }`}
        >
          <Plus className="" />
        </span>
      </button>

      <div
        className={`border-t border-dashed ${
          currentEventIsOpen
            ? 'border-gray-200 dark:border-gray-700'
            : 'border-transparent'
        }`}
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
}
