import { useState } from 'react';
import { motion } from 'framer-motion';
import Slider from 'rc-slider';

import { RadioGroup } from '@/components/ui/radio-group';

import { Combobox } from '@headlessui/react';

import Collapse from '@/components/ui/collapse';
import CollectionSelect from '@/components/ui/collection-select-list';
import { useDrawer } from '@/components/drawer-views/context';
import Scrollbar from '@/components/ui/scrollbar';
import Button from '@/components/ui/button';
import { NormalGridIcon } from '@/components/icons/normal-grid';
import { CompactGridIcon } from '@/components/icons/compact-grid';
import { Close } from '@/components/icons/close';
import { Listbox } from '@/components/ui/listbox';
import { Transition } from '@headlessui/react';
import { ChevronDown } from '@/components/icons/chevron-down';
import { useGridSwitcher } from '@/lib/hooks/use-grid-switcher';

import Image from 'next/image';

import { useLocalStorage } from '@/lib/hooks/use-local-storage';
import { lowerCase } from 'lodash';

export function GridSwitcher() {
  const { isGridCompact, setIsGridCompact } = useGridSwitcher();

  return (
    <div className="flex overflow-hidden rounded-lg">
      <button
        className={`relative flex h-11 w-11 items-center justify-center bg-gray-100 transition dark:bg-gray-800 ${
          !isGridCompact ? 'z-10 text-white' : 'text-brand dark:text-white'
        }`}
        onClick={() => setIsGridCompact(!isGridCompact)}
        aria-label="Normal Grid"
      >
        {!isGridCompact && (
          <motion.span
            className="absolute bottom-0 left-0 right-0 h-full w-full bg-brand shadow-large"
            layoutId="gridSwitchIndicator"
          />
        )}
        <NormalGridIcon className="relative" />
      </button>
      <button
        className={`relative flex h-11 w-11 items-center justify-center bg-gray-100 transition dark:bg-gray-800 ${
          isGridCompact ? 'z-10 text-white' : 'text-brand dark:text-white'
        }`}
        onClick={() => setIsGridCompact(!isGridCompact)}
        aria-label="Normal Grid"
      >
        {isGridCompact && (
          <motion.span
            className="absolute bottom-0 left-0 right-0 h-full w-full  bg-brand shadow-large"
            layoutId="gridSwitchIndicator"
          />
        )}
        <CompactGridIcon className="relative" />
      </button>
    </div>
  );
}

export const sort = [
  /*
  { id: 1, name: 'Date Minted: Newest' }, // mint date
  { id: 2, name: 'Date Minted: Oldest' },

  { id: 3, name: 'Token ID: Ascending' }, // tokenid date
  { id: 4, name: 'Token ID: Descending' },

  //{ id: 3, name: 'Ending: Soonest' },
  //{ id: 4, name: 'Ending: Latest' },
  */

  { id: 1, name: 'Token ID: Ascending' }, // tokenid
  { id: 2, name: 'Token ID: Descending' },
];

export function SortList() {
  const [selectedSortStorage, setSelectedSortStorage] =
    useLocalStorage('selected-sort');

  if (!selectedSortStorage) {
    setSelectedSortStorage(sort[0]);
  }

  //const [selectedItem, setSelectedItem] = useState(selectedSortStorage);

  return (
    <div className="relative">
      <Listbox
        value={
          //selectedItem
          selectedSortStorage
        }
        onChange={
          //setSelectedItem

          setSelectedSortStorage
        }
      >
        <Listbox.Button className="flex h-10 w-auto items-center justify-between rounded-lg bg-gray-100 px-4 text-xs text-gray-900 dark:bg-gray-800 dark:text-white sm:w-56 sm:text-sm lg:h-11">
          {
            //selectedItem.name

            selectedSortStorage?.name
          }

          <ChevronDown className="ltr:ml-2 rtl:mr-2" />
        </Listbox.Button>

        <Transition
          enter="ease-out duration-200"
          enterFrom="opacity-0 translate-y-2"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 -translate-y-0"
          leaveTo="opacity-0 translate-y-2"
        >
          <Listbox.Options className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white p-3 shadow-large dark:bg-light-dark sm:w-full">
            {sort.map((item) => (
              <Listbox.Option key={item.id} value={item}>
                {({ selected }) => {
                  ///setSelectedSortStorage(item);

                  //console.log('item', item);

                  return (
                    <div
                      className={`block cursor-pointer rounded-lg px-3 py-2 text-xs font-medium text-gray-900 transition dark:text-white sm:text-sm  ${
                        selected
                          ? 'my-1 bg-gray-100 dark:bg-gray-800'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {item.name}
                    </div>
                  );
                }}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
}

export function PriceRange() {
  let [range, setRange] = useState({ min: 0, max: 1000 });
  function handleRangeChange(value: any) {
    setRange({
      min: value[0],
      max: value[1],
    });
  }
  function handleMaxChange(max: number) {
    setRange({
      ...range,
      max: max || range.min,
    });
  }
  function handleMinChange(min: number) {
    setRange({
      ...range,
      min: min || 0,
    });
  }
  return (
    <div className="p-5">
      <div className="mb-4 grid grid-cols-2 gap-2">
        <input
          className="h-9 rounded-lg border-gray-200 text-sm text-gray-900 outline-none focus:border-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
          type="number"
          value={range.min}
          onChange={(e) => handleMinChange(parseInt(e.target.value))}
          min="0"
          max={range.max}
        />
        <input
          className="h-9 rounded-lg border-gray-200 text-sm text-gray-900 outline-none focus:border-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
          type="number"
          value={range.max}
          onChange={(e) => handleMaxChange(parseInt(e.target.value))}
          min={range.min}
        />
      </div>
      <Slider
        range
        min={0}
        max={1000}
        value={[range.min, range.max]}
        allowCross={false}
        onChange={(value) => handleRangeChange(value)}
      />
    </div>
  );
}

export function Status() {
  let [plan, setPlan] = useState('buy-now');
  return (
    <RadioGroup
      value={plan}
      onChange={setPlan}
      className="grid grid-cols-2 gap-2 p-5"
    >
      <RadioGroup.Option value="grade-u">
        {({ checked }) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
              checked
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            Grade U
          </span>
        )}
      </RadioGroup.Option>

      <RadioGroup.Option value="grade-s">
        {({ checked }) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
              checked
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            Grade S
          </span>
        )}
      </RadioGroup.Option>

      <RadioGroup.Option value="grade-a">
        {({ checked }) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
              checked
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            Grade A
          </span>
        )}
      </RadioGroup.Option>

      <RadioGroup.Option value="grade-b">
        {({ checked }) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
              checked
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            Grade B
          </span>
        )}
      </RadioGroup.Option>

      <RadioGroup.Option value="grade-c">
        {({ checked }) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
              checked
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            Grade C
          </span>
        )}
      </RadioGroup.Option>

      <RadioGroup.Option value="grade-d">
        {({ checked }) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
              checked
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            Grade D
          </span>
        )}
      </RadioGroup.Option>
    </RadioGroup>
  );
}

export function Grade() {
  const [filtersGrade, setFiltersGrade] =
    useLocalStorage<string>('filters-grade');
  setFiltersGrade('D');

  console.log('filters-horse grade', filtersGrade);

  //setGrade('A');

  ///setFiltersGrade(grade);

  return (
    <RadioGroup
      value={
        //grade
        filtersGrade
      }
      onChange={
        //setGrade
        setFiltersGrade
      }
      className="grid grid-cols-2 gap-2 p-5"
    >
      <RadioGroup.Option value="U">
        {({ checked }) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
              checked
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            <Image
              src="/images/grade-u.png"
              alt="Grade U"
              width={15}
              height={15}
            />
            &nbsp; Grade U
          </span>
        )}
      </RadioGroup.Option>

      <RadioGroup.Option value="S">
        {({ checked }) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
              checked
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            <Image
              src="/images/grade-s.png"
              alt="Grade S"
              width={15}
              height={15}
            />
            &nbsp; Grade S
          </span>
        )}
      </RadioGroup.Option>

      <RadioGroup.Option value="A">
        {({ checked }) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
              checked
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            <Image
              src="/images/grade-a.png"
              alt="Grade A"
              width={15}
              height={15}
            />
            &nbsp; Grade A
          </span>
        )}
      </RadioGroup.Option>

      <RadioGroup.Option value="B">
        {({ checked }) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
              checked
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            <Image
              src="/images/grade-b.png"
              alt="Grade B"
              width={15}
              height={15}
            />
            &nbsp; Grade B
          </span>
        )}
      </RadioGroup.Option>

      <RadioGroup.Option value="C">
        {({ checked }) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
              checked
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            <Image
              src="/images/grade-c.png"
              alt="Grade C"
              width={15}
              height={15}
            />
            &nbsp; Grade C
          </span>
        )}
      </RadioGroup.Option>

      <RadioGroup.Option value="D">
        {({ checked }) => (
          <span
            className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
              checked
                ? 'border-brand bg-brand text-white shadow-button'
                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
            }`}
          >
            <Image
              src="/images/grade-d.png"
              alt="Grade D"
              width={15}
              height={15}
            />
            &nbsp; Grade D
          </span>
        )}
      </RadioGroup.Option>
    </RadioGroup>
  );
}

const grades = ['U', 'S', 'A', 'B', 'C', 'D'];

export function GradeMultiple() {
  //const [selectedGrade, setSelectedGrade] = useLocalStorage(
  //  'selected-grade',
  //);
  ///setSelectedGrade(['U', 'S', 'A', 'B', 'C', 'D']);

  const [isOpen, setIsOpen] = useState(false);

  const [selectedGradesStorage, setSelectedGradesStorage] =
    useLocalStorage('selected-grades');

  if (!selectedGradesStorage) {
    setSelectedGradesStorage(grades);
  }

  const [selectedGrades, setSelectedGrades] = useState(selectedGradesStorage);

  function isSelected(value: any) {
    return selectedGrades.find((el) => el === value) ? true : false;
  }

  function handleSelect(value: any) {
    if (!isSelected(value)) {
      const selectedGradesUpdated = [
        ...selectedGrades,
        grades.find((el) => el === value),
      ];
      setSelectedGrades(selectedGradesUpdated);
      setSelectedGradesStorage(selectedGradesUpdated);
    } else {
      handleDeselect(value);
    }
    //setIsOpen(true);
  }

  function handleDeselect(value: any) {
    const selectedGradesUpdated = selectedGrades.filter((el) => el !== value);
    setSelectedGrades(selectedGradesUpdated);
    setSelectedGradesStorage(selectedGradesUpdated);
    //setIsOpen(true);
  }

  return (
    <div className="grid grid-cols-2 gap-2 p-3  ">
      {/*
        <Listbox
          as="div"
          className="space-y-1"
          value={selectedGrades}
          onChange={(value) => handleSelect(value)}
          open={isOpen}
        >
          {() => (
            <>
              <Listbox.Label className="block text-sm font-medium leading-5 text-gray-700">
                Grade
              </Listbox.Label>

              <div className="relative">
                <span className="inline-block w-full rounded-md shadow-sm">
                  <Listbox.Button
                    className="focus:shadow-outline-blue relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
                    onClick={() => setIsOpen(!isOpen)}
                    open={isOpen}
                  >
                    <span className="block truncate">
                      {selectedGrades.length < 1
                        ? 'Select grades'
                        : `Selected grades (${selectedGrades.length})`}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Listbox.Button>
                </span>

                <Transition
                  unmount={false}
                  show={isOpen}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
                >
                  <Listbox.Options
                    static
                    className="shadow-xs max-h-60 overflow-auto rounded-md py-1 text-base leading-6 focus:outline-none sm:text-sm sm:leading-5"
                  >
                    {grade.map((grade) => {
                      const selected = isSelected(grade);
                      return (
                        <Listbox.Option key={grade} value={grade}>
                          {({ active }) => (
                            <div
                              className={`${
                                active
                                  ? 'bg-blue-600 text-white'
                                  : 'text-gray-900'
                              } relative cursor-default select-none py-2 pl-8 pr-4`}
                            >
                              <span
                                className={`${
                                  selected ? 'font-semibold' : 'font-normal'
                                } block truncate`}
                              >
                                Grade {grade}
                              </span>
                              {selected && (
                                <span
                                  className={`${
                                    active ? 'text-white' : 'text-blue-600'
                                  } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                >
                                  <svg
                                    className="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </span>
                              )}
                            </div>
                          )}
                        </Listbox.Option>
                      );
                    })}
                  </Listbox.Options>
                </Transition>
                <div className="pt-1 text-sm">
                  {selectedGrades.length > 0 && (
                    <>Selected grades: {selectedGrades.join(', ')}</>
                  )}
                </div>
              </div>
            </>
          )}
        </Listbox>
        */}

      {grades.map((grade) => {
        const selected = isSelected(grade);

        return (
          <div
            key={grade}
            className="flex items-center justify-center gap-2"
            onClick={() => handleSelect(grade)}
          >
            <span
              className={`flex cursor-pointer items-center justify-center rounded-lg border border-solid p-2 text-center text-xs uppercase tracking-wide transition-all ${
                selected
                  ? 'border-brand bg-brand text-white shadow-button'
                  : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
              }`}
            >
              <Image
                src={`/images/grade-${lowerCase(grade)}.png`}
                alt={grade}
                width={20}
                height={20}
              />
              &nbsp;Grade {grade}
            </span>
          </div>
        );
      })}
    </div>
  );
}

const manes = ['Long Mane', 'Short Mane', 'Sporty Mane'];

export function ManeMultiple() {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedManesStorage, setSelectedManesStorage] =
    useLocalStorage('selected-manes');

  if (!selectedManesStorage) {
    setSelectedManesStorage(manes);
  }

  const [selectedManes, setSelectedManes] = useState(selectedManesStorage);

  function isSelected(value: any) {
    return selectedManes.find((el) => el === value) ? true : false;
  }

  function handleSelect(value: any) {
    if (!isSelected(value)) {
      const selectedGradesUpdated = [
        ...selectedManes,
        manes.find((el) => el === value),
      ];
      setSelectedManes(selectedGradesUpdated);
      setSelectedManesStorage(selectedGradesUpdated);
    } else {
      handleDeselect(value);
    }
    //setIsOpen(true);
  }

  function handleDeselect(value: any) {
    const selectedManesUpdated = selectedManes.filter((el) => el !== value);
    setSelectedManes(selectedManesUpdated);
    setSelectedManesStorage(selectedManesUpdated);
    //setIsOpen(true);
  }

  return (
    <div className="grid grid-cols-3 gap-2 p-3  ">
      {manes.map((mane) => {
        const selected = isSelected(mane);

        return (
          <div
            key={mane}
            className=" flex items-center justify-center gap-2"
            onClick={() => handleSelect(mane)}
          >
            <span
              className={` flex cursor-pointer items-center justify-center rounded-lg border border-solid p-2 text-center text-xs uppercase tracking-wide transition-all ${
                selected
                  ? 'border-brand bg-brand text-white shadow-button'
                  : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
              }`}
            >
              {/*
              <Image
                src={`/images/mane-${lowerCase(mane)}.png`}
                alt={mane}
                width={20}
                height={20}
              />
              */}
              {mane}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function Filters() {
  return (
    <>
      <Collapse label="Grades" initialOpen>
        <GradeMultiple />
      </Collapse>

      {/*
      <Collapse label="Manes" initialOpen>
        <ManeMultiple />
      </Collapse>
  */}

      {/*
      <Collapse label="Status" initialOpen>
        <Status />
      </Collapse>
  */}

      {/*
      <Collapse label="Price Range" initialOpen>
        <PriceRange />
      </Collapse>

      <Collapse label="Collection" initialOpen>
        <CollectionSelect onSelect={(value) => console.log(value)} />
      </Collapse>
      */}
    </>
  );
}

export default function DrawerFilters() {
  const { closeDrawer } = useDrawer();

  return (
    <div className="relative w-full max-w-full bg-white dark:bg-dark xs:w-72">
      <div className="flex h-20 items-center justify-between overflow-hidden px-6 py-4">
        <h2 className="text-xl font-medium uppercase tracking-wider text-gray-900 dark:text-white">
          Filters
        </h2>
        <Button
          shape="circle"
          color="white"
          onClick={closeDrawer}
          className="dark:bg-light-dark"
        >
          <Close className="h-auto w-3" />
        </Button>
      </div>
      <Scrollbar style={{ height: 'calc(100% - 96px)' }}>
        <div className="px-6 pb-20 pt-1">
          <Filters />
        </div>
      </Scrollbar>
      <div className="absolute bottom-4 left-0 z-10 w-full px-6">
        <Button fullWidth onClick={closeDrawer}>
          DONE
        </Button>
      </div>
    </div>
  );
}
