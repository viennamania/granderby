'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';

import { useColumn } from '@/hooks/use-column';

//import ControlledTable from '@/components/controlled-table';
import ControlledTable from '@/components/controlled-table';

import cn from '@/utils/class-names';

//import DateFiled from '@/components/controlled-table/date-field';
//import { getDateRangeStateValues } from '@/utils/get-formatted-date';

//import { DatePicker } from '@/components/ui/datepicker';

///import { Button } from '@/components/ui/button';

import Button from '@/components/ui/button/button';

import { CiSearch } from 'react-icons/ci';

///import TableFooter from '@/app/shared/table-footer';

///import { exportToCSV } from '@/utils/export-to-csv';

import { RadioGroup } from '@/components/ui/radio-group';

//import { Radio } from '@/components/ui/radio';

import { PiMagnifyingGlassBold, PiDownloadSimpleBold } from 'react-icons/pi';

import { useTable } from '@/hooks/use-table-feed';

import { Checkbox } from '@/components/ui/checkbox';

import { useSearchParams, useRouter } from 'next/navigation';

import { useAddress } from '@thirdweb-dev/react';

import toast from 'react-hot-toast';

type ColumnTypes = {
  data?: any[];
  sortConfig?: any;
  checkedItems?: string[];
  handleSelectAll?: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;

  onClickUser: (id: string) => void; // user

  totalItems?: number;
};

type BasicTableWidgetProps = {
  title?: React.ReactNode;
  className?: string;
  pageSize?: number;
  setPageSize?: React.Dispatch<React.SetStateAction<number>>;

  getColumns: ({
    data,
    sortConfig,
    checkedItems,
    handleSelectAll,
    onDeleteItem,
    onHeaderCellClick,
    onChecked,

    onClickUser, // user

    totalItems,
  }: ColumnTypes) => any;

  data: any[];
  enablePagination?: boolean;
  variant?: 'modern' | 'minimal' | 'classic' | 'elegant' | 'retro';
  enableSearch?: boolean;
  paginatorClassName?: string;
  searchPlaceholder?: string;
  noGutter?: boolean;
  scroll?: {
    x?: number;
    y?: number;
  };
  sticky?: boolean;
};

type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[]) => void;
  handleReset: () => void;
};

//export default function FeedTableWidget({

export default function FeedsNftOwnedTable({
  title,

  data = [],

  getColumns,

  //pageSize = 7,

  //setPageSize,
  enablePagination,
  variant = 'modern',
  enableSearch = true,
  paginatorClassName,
  noGutter,
  sticky,
  scroll = { x: 1300 },
  className,
  searchPlaceholder = 'Search...',
}: BasicTableWidgetProps) {
  const address = useAddress();

  const router = useRouter();

  // get params from query string
  const searchParams = useSearchParams();

  const paramSearchTerm = searchParams.get('paramSearchTerm') || '';

  /*
  const paramStartDate = searchParams.get('paramStartDate')
    || new Date( new Date().getFullYear(), new Date().getMonth(), 1 ).toISOString();

  const paramEndDate = searchParams.get('paramEndDate')
    || new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 ).toISOString();
  */

  const paramPageSize = searchParams.get('paramPageSize') || 10;

  const paramCurrentPage = searchParams.get('paramCurrentPage') || 1;

  const paramSortConfigKey =
    searchParams.get('paramSortConfigKey') || 'createdAt';

  const paramSortConfigDirection =
    searchParams.get('paramSortConfigDirection') || 'desc';

  /*
  const paramMealTimeArray = searchParams.get('paramMealTimeArray')
    || '아침,점심,저녁,간식,야식';

  const paramFeedbackArray = searchParams.get('paramFeedbackArray')
    || '미답변,답변완료';
  */

  /*
  console.log('paramSearchTerm=======', paramSearchTerm);
  console.log('paramStartDate=======', paramStartDate);
  console.log('paramEndDate========', paramEndDate);
  console.log('paramPageSize========', paramPageSize);
  console.log('paramCurrentPage=====', paramCurrentPage);
  console.log('paramSortConfigKey===', paramSortConfigKey);
  console.log('paramSortConfigDirection===', paramSortConfigDirection);
  console.log('paramMealTimeArray===', paramMealTimeArray);
  console.log('paramFeedbackArray===', paramFeedbackArray);
  */

  const [searchTerm, setSearchTerm] = useState(paramSearchTerm as string);

  const [pageSize, setPageSize] = useState(parseInt(paramPageSize as string));

  const [currentPage, setCurrentPage] = useState(
    parseInt(paramCurrentPage as string)
  );

  /*
  const [startDate, setStartDate] = useState<Date>(
    new Date(paramStartDate as string)
  );


  const [endDate, setEndDate] = useState<Date>(
    
    //new Date(paramEndDate as string)

    // paramEndData is string
    // so, convert to Date
    // and plus 23h 59m 59s 999ms

    new Date(new Date(paramEndDate as string).setHours(23, 59, 59, 999))



  );
  */

  // collection of mealTime (아침, 점심, 저녁, 간식, 야식)
  //const [mealTimeArray, setMealTimeArray] = useState(['아침', '점심', '저녁', '간식', '야식']);

  // feedbackYn (전체, 미답변, 답변완료)
  //const [feedbackArray, setFeedbackArray] = useState(['미답변', '답변완료']);

  /*
  const [mealTimeArray, setMealTimeArray] = useState([
    ...(paramMealTimeArray as string)?.split(',')
    ]);

  const [feedbackArray, setFeedbackArray] = useState([
    ...(paramFeedbackArray as string)?.split(',')
    ]);
  */

  ///console.log('currentPage=====', currentPage);

  console.log('address', address);

  /*

  const [startDate, setStartDate] = useState<Date>(new Date( new Date().getFullYear(), new Date().getMonth(), 1 ));
  const [endDate, setEndDate] = useState<Date>(new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 ));
  */

  const onClickUser = (id: string) => {
    console.log('id', id);
  };

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = (id: string) => {
    handleDelete(id);
  };

  /*
  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
  }
  */

  const handlePaginate = (page: number) => {
    setCurrentPage(page);

    handleSearch(
      searchTerm,
      pageSize,
      page,

      //startDate,
      //endDate,
      //mealTimeArray,
      //feedbackArray,

      address
    );
  };

  const {
    isLoading,
    sortConfig,
    totalItems,
    tableData,

    ///currentPage,

    //searchTerm,

    handleSort,

    handleDelete,

    handleSearch,

    ///handlePaginate,

    selectedRowKeys,
    handleRowSelect,
    handleSelectAll,
  } = useTable(
    data,
    pageSize,
    currentPage,
    []

    //startDate.toISOString(),
    //endDate.toISOString(),

    //mealTimeArray,
    //feedbackArray
  );

  //const [searchTerm, setSearchTerm] = useState('');

  const columns = React.useMemo(
    () =>
      getColumns({
        data,
        sortConfig,
        onHeaderCellClick,
        onDeleteItem,

        checkedItems: selectedRowKeys,
        onChecked: handleRowSelect,
        handleSelectAll,

        onClickUser, // user

        totalItems: totalItems,
      }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,

      handleRowSelect,
      handleSelectAll,
    ]
  );

  const { visibleColumns } = useColumn(columns);

  const isMediumScreen = true;

  const [value, setValue] = useState('all');

  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log('useEffect=====================');

    router.push(
      // url encoding for url query string

      '/my-asset?paramSearchTerm=' +
        searchTerm +
        '&paramPageSize=' +
        pageSize +
        '&paramCurrentPage=' +
        currentPage +
        '&paramSortConfigKey=' +
        sortConfig.key +
        '&paramSortConfigDirection=' +
        sortConfig.direction

      //+ "&paramStartDate=" + startDate.toISOString()
      //+ "&paramEndDate=" + endDate.toISOString()

      //+ "&paramMealTimeArray=" + mealTimeArray.join(',')
      //+ "&paramFeedbackArray=" + feedbackArray.join(',')
    );
  }, [
    searchTerm,
    pageSize,
    currentPage,
    sortConfig.key,
    sortConfig.direction,

    //, mealTimeArray, feedbackArray, startDate, endDate
  ]);

  useEffect(() => {
    console.log('useEffect>>>>>>>>>>>>>>>>>>>>>');
    console.log('searchTerm', searchTerm);
    console.log('pageSize', pageSize);
    console.log('currentPage', currentPage);

    //console.log('startDate', startDate);
    //console.log('endDate', endDate);
    //console.log('mealTimeArray', mealTimeArray);
    //console.log('feedbackArray', feedbackArray);

    if (address !== undefined) {
      handleSearch(
        searchTerm,
        pageSize,
        currentPage,

        //startDate,
        //endDate,
        //mealTimeArray,
        //feedbackArray,

        address
      );
    }
  }, [address]);

  /*
  useEffect(() => {

    setCurrentPage(1);

  } , [searchTerm, pageSize, startDate, endDate, mealTimeArray, feedbackArray]);
  */

  const [totalBalanceHorse, setTotalBalanceHorse] = useState(0);

  useEffect(() => {
    const main = async () => {
      // Call api for get balance by many horse uid
      // getBalanceByHolder

      const response = await fetch('/api/nft/getHorsesBalanceByHolder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          holder: address,
        }),
      });

      const data = await response.json();

      console.log('data======>', data);

      setTotalBalanceHorse(data?.balance);
    };

    if (address) {
      main();
    }
  }, [address]);

  const [claiming, setClaiming] = useState(false);

  return (
    <>
      <div className="flex flex-col items-start justify-center gap-3">
        <div className="flex flex-row items-center justify-center gap-3">
          <div className=" flex  text-xl font-bold  ">
            Total Allowance: {totalBalanceHorse.toLocaleString()}
          </div>

          {/* claim button */}
          <div className="flex flex-row items-center justify-start">
            <Button
              disabled={claiming}
              isLoading={claiming}
              className="h-8 bg-green-500 font-normal text-gray-600 hover:text-gray-900 dark:bg-gray-600 dark:text-gray-200 dark:hover:text-white md:h-9 md:px-4 lg:mt-6"
              onClick={() => {
                /*
                      toast.success(
                        <div className=" flex flex-col items-center justify-center gap-5 p-5">
                          <div className="flex flex-row items-center justify-center gap-2">
                            <span className="font-extrabold text-gray-900 dark:text-white">
                              Collection has been completed.
                            </span>
                          </div>
                          <div className="flex flex-row items-center justify-center gap-2">
                            <span className="font-extrabold text-gray-900 dark:text-white">
                              Total : {totalItems}
                            </span>
                          </div>
                          <div className="flex flex-row items-center justify-center gap-2">
                            <span className="font-extrabold text-gray-900 dark:text-white">
                              {
                                totalBalanceHorse.toLocaleString()
                              } GDP
                            </span>
                          </div>
                          <div className="flex flex-row items-center justify-center gap-2">
                            <span className="font-extrabold text-gray-900 dark:text-white">
                              ※ Withdrawals are restricted for 5 minutes after
                              full collection.
                            </span>
                          </div>
                        </div>,

                        {
                          duration: 5000,
                        }
                      );
                      */

                async function claim() {
                  if (totalBalanceHorse === 0) {
                    toast.error(
                      <div className=" flex flex-col items-center justify-center gap-5 p-5">
                        <span className="text-xl font-extrabold">
                          No balance to collect
                        </span>
                      </div>,

                      {
                        duration: 5000,
                      }
                    );

                    return;
                  }

                  setClaiming(true);
                  const response = await fetch(
                    '/api/nft/claimBalanceByHolder',
                    {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        holderAddress: address,
                      }),
                    }
                  );

                  const data = await response.json();

                  const claimedBalance = data?.claimedBalance || 0;

                  if (claimedBalance === 0) {
                    toast.error(
                      <div className=" flex flex-col items-center justify-center gap-5 p-5">
                        <span className="text-xl font-extrabold">
                          No balance to collect
                        </span>
                      </div>,

                      {
                        duration: 5000,
                      }
                    );

                    setClaiming(false);

                    return;
                  }

                  //setGameHorseBalance(data?.balance || 0);

                  //setGameHorseLatestAmount(data?.latestAmount || 0);

                  //setGameHorseAccumulatedBalance(data?.accumulatedBalance || 0);

                  //setGameHorseBalance(0);

                  setClaiming(false);

                  setTotalBalanceHorse(0);

                  // reload
                  handleSearch(
                    searchTerm,
                    pageSize,
                    currentPage,

                    //startDate,
                    //endDate,
                    //mealTimeArray,
                    //feedbackArray,

                    address
                  );

                  toast.success(
                    <div className=" flex flex-col items-center justify-center gap-5 p-5">
                      <span className="text-xl font-extrabold">
                        Claim Success
                      </span>
                      <span className="text-xl font-extrabold">
                        {claimedBalance.toLocaleString()} GDP
                      </span>
                    </div>,

                    {
                      duration: 5000,
                    }
                  );
                }

                claim();
              }}
            >
              <span className="flex items-center gap-2 font-extrabold ">
                Collect All
              </span>
            </Button>
          </div>
        </div>

        {/*
      <div className='w-full flex flex-wrap items-center justify-between gap-3'>

        
        <div className='flex flex-row items-center justify-center gap-3'>

            <Input
              type="search"
              placeholder={searchPlaceholder}
              value={searchTerm}

              onClear={() => {

                  //setCurrentPage(1);

                  //handleSearch('')

                }
              }

              onChange={(event) => {

                //setCurrentPage(1);
                //handleSearch(event.target.value)

                setSearchTerm(event.target.value);

              } }
              //clearable

              prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
            />


            <Button
              onClick={() => {
                setStartDate(new Date( new Date().getFullYear(), new Date().getMonth(), 1 ));
                setEndDate(new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 ));
                setSearchTerm('');
                setCurrentPage(1);
                setPageSize(10);
                setMealTimeArray(['아침', '점심', '저녁', '간식', '야식']);
                setFeedbackArray(['미답변', '답변완료']);

                handleSearch(
                  '',
                  10,
                  1,
                  new Date( new Date().getFullYear(), new Date().getMonth(), 1 ),
                  new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 ),
                  ['아침', '점심', '저녁', '간식', '야식'],
                  ['미답변', '답변완료'],
                );
              }}
              className="w-24 bg-gray-200 text-black "
            >
              초기화
            </Button>

            <Button
              onClick={() => {

                setCurrentPage(1);
                
                handleSearch(
                  searchTerm,
                  pageSize,
                  currentPage,
                  startDate,
                  endDate,
                  mealTimeArray,
                  feedbackArray,
                  address,
                );
              }}
              className="w-24 @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
              >
              <CiSearch className="me-1.5 h-[17px] w-[17px]" />
              검색
            </Button>

        </div>

      </div>
      */}

        {/*
      <div className='flex flex-wrap items-center justify-center gap-3'>

        <RadioGroup
          value={value}
          //setValue={setValue}

          //setValue={(value) => {
            //setValue(value);
            //console.log('value', value);
          //} }

          className="justify-center space-x-4 space-y-4"
        >
          <div className="divide-slate-300 flex flex-row items-center justify-center gap-5">
            
            <div className=" w-16 ">
              식사시간
            </div>



            <Checkbox
              label="전체"

              {...(mealTimeArray.includes('아침') && mealTimeArray.includes('점심') && mealTimeArray.includes('저녁') && mealTimeArray.includes('간식') && mealTimeArray.includes('야식') ? { checked: true } : { checked: false})}

              onChange={(event) => {

                setCurrentPage(1);
                if (event.target.checked) {
                  setMealTimeArray(['아침', '점심', '저녁', '간식', '야식']);
                } else {
                  setMealTimeArray([]);
                }
              }}
            />

            <Checkbox
              label="아침"
              checked={mealTimeArray.includes('아침')}
              onChange={(event) => {
                
                setCurrentPage(1);

                if (event.target.checked) {
                  setMealTimeArray([...mealTimeArray, '아침']);
                } else {
                  setMealTimeArray(mealTimeArray.filter((item) => item !== '아침'));
                }
              }}
            />

            <Checkbox
              label="점심"
              checked={mealTimeArray.includes('점심')}
              onChange={(event) => {

                setCurrentPage(1);
                if (event.target.checked) {
                  setMealTimeArray([...mealTimeArray, '점심']);
                } else {
                  setMealTimeArray(mealTimeArray.filter((item) => item !== '점심'));
                }
              }}

            />

            <Checkbox
              label="저녁"
              checked={mealTimeArray.includes('저녁')}
              onChange={(event) => {
                setCurrentPage(1);
                if (event.target.checked) {
                  setMealTimeArray([...mealTimeArray, '저녁']);
                } else {
                  setMealTimeArray(mealTimeArray.filter((item) => item !== '저녁'));
                }
              }}

            />

            <Checkbox
              label="간식"
              checked={mealTimeArray.includes('간식')}
              onChange={(event) => {
                setCurrentPage(1);
                if (event.target.checked) {
                  setMealTimeArray([...mealTimeArray, '간식']);
                } else {
                  setMealTimeArray(mealTimeArray.filter((item) => item !== '간식'));
                }
              }}

            />

            <Checkbox
              label="야식"
              checked={mealTimeArray.includes('야식')}
              onChange={(event) => {
                setCurrentPage(1);
                if (event.target.checked) {
                  setMealTimeArray([...mealTimeArray, '야식']);
                } else {
                  setMealTimeArray(mealTimeArray.filter((item) => item !== '야식'));
                }
              }}

            />


          </div>
        </RadioGroup>

      </div>
      */}

        {/*
      <div className='flex flex-wrap items-center justify-center gap-3'>

        <RadioGroup
          value={value}
          //setValue={setValue}

          //setValue={(value) => {
            //setValue(value);
            //console.log('value', value);
          //} }

          className="justify-center space-x-4 space-y-4"
        >
          <div className="divide-slate-300 flex flex-row items-center justify-center gap-5">
            <div className=" w-16 ">
              피드백
            </div>

            <Checkbox
              label="전체"

              {...(feedbackArray.includes('미답변') && feedbackArray.includes('답변완료') ? { checked: true } : { checked: false})}

              onChange={(event) => {
                setCurrentPage(1);
                if (event.target.checked) {
                  setFeedbackArray(['미답변', '답변완료']);
                } else {
                  setFeedbackArray([]);
                }
              }}

            />

            <Checkbox
              label="미답변"
              checked={feedbackArray.includes('미답변')}
              onChange={(event) => {
                setCurrentPage(1);
                if (event.target.checked) {
                  setFeedbackArray([...feedbackArray, '미답변']);
                } else {
                  setFeedbackArray(feedbackArray.filter((item) => item !== '미답변'));
                }
              }}
            />

            <Checkbox
              label="답변완료"
              checked={feedbackArray.includes('답변완료')}
              onChange={(event) => {
                setCurrentPage(1);
                if (event.target.checked) {
                  setFeedbackArray([...feedbackArray, '답변완료']);
                } else {
                  setFeedbackArray(feedbackArray.filter((item) => item !== '답변완료'));
                }
              }}

            />



          </div>
        </RadioGroup>

      </div>
      */}
      </div>

      <div
        className={cn('table-wrapper flex-grow', noGutter && '-mx-5 lg:-mx-7 ')}
      >
        {/* totalItems */}

        <div className=" mt-7 flex flex-row items-center justify-between border-t border-slate-300  pt-5 dark:border-slate-700">
          <div className="flex flex-row items-center justify-start gap-3">
            <div className="text-base font-medium text-gray-900 dark:text-gray-100">
              Total {totalItems} items
            </div>
          </div>

          {/* reload button */}

          {/*
          <Button
            className='w-24 bg-gray-200 text-black '
            onClick = {() => {
              
              ///handleSearch('');
              // reload

              //handleSearch (searchTerm);


            } }
          >
            새로고침
          </Button>
          */}
        </div>

        <ControlledTable
          showLoadingText={false}
          isLoading={isLoading}
          data={tableData}
          columns={visibleColumns}
          scroll={scroll}
          sticky={sticky}
          //variant={variant}
          variant="modern"
          className="mt-6"
          {...(enablePagination && {
            /*
            paginatorOptions: {
              pageSize,
              ...(setPageSize && { setPageSize }),
              total: totalItems,
              current: currentPage,
              onChange: (page: number) => handlePaginate(page),
            },
            */

            paginatorOptions: {
              pageSize,
              setPageSize,
              total: totalItems,
              current: currentPage,
              onChange: (page: number) => handlePaginate(page),
            },

            paginatorClassName: cn(
              'mt-4 lg:mt-5',
              noGutter && 'px-5 lg:px-7',
              paginatorClassName
            ),
          })}
          onHeaderRow={(column: any) => {
            return {
              onClick: () => {
                //console.log('column', column);
                //alert(column.name);
              },
            };
          }}
        />
      </div>
    </>
  );
}
