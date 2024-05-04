import { useState, useEffect, useMemo, use } from 'react';
import isString from 'lodash/isString';
import { add, set } from 'lodash';
import { da } from 'date-fns/locale';

interface AnyObject {
  [key: string]: any;
}

export function useTable<T extends AnyObject>(
  initialData: T[],
  countPerPage: number = 10,
  currentPage: number = 1,

  initialFilterState?: Partial<Record<string, any>>

  /*
  startDate?: string,
  endDate?: string,

  mealTimeArray?: string[],
  feedbackArray?: string[]
  */
) {
  /*
   * Table data
   */
  const [data, setData] = useState(initialData);

  /*
   * Dummy loading state.
   */
  const [isLoading, setLoading] = useState(true);

  /* get total count */
  const [totalCount, setTotalCount] = useState(0);

  console.log('totalCount', totalCount);

  /*
   * Handle row selection
   */
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const handleRowSelect = (recordKey: string) => {
    const selectedKeys = [...selectedRowKeys];
    if (selectedKeys.includes(recordKey)) {
      setSelectedRowKeys(selectedKeys.filter((key) => key !== recordKey));
    } else {
      setSelectedRowKeys([...selectedKeys, recordKey]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRowKeys.length === data.length) {
      setSelectedRowKeys([]);
    } else {
      setSelectedRowKeys(data.map((record) => record.id));
    }
  };

  /*
   * Handle sorting
   */
  const [sortConfig, setSortConfig] = useState<AnyObject>({
    //key: 'mealDate', // 'mealDate',

    key: 'sequenceNumber',

    direction: 'desc',
  });

  function sortData(data: T[], sortKey: string, sortDirection: string) {
    return [...data].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  const sortedData = useMemo(() => {
    let newData = data;
    if (!sortConfig.key) {
      return newData;
    }
    return sortData(newData, sortConfig.key, sortConfig.direction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortConfig, data]);

  function handleSort(key: string) {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  }

  /*
   * Handle pagination
   */
  /*
  const [currentPage, setCurrentPage] = useState(1);



  function paginatedData(data: T[] = sortedData) {
    const start = (currentPage - 1) * countPerPage;
    const end = start + countPerPage;

    if (data.length > start) return data.slice(start, end);
    return data;
  }

  
  function handlePaginate(pageNumber: number) {
    setCurrentPage(pageNumber);
  }
  */

  /*
   * Handle delete
   */
  function handleDelete(id: string | string[]) {
    /*
    const updatedData = Array.isArray(id)
      ? data.filter((item) => !id.includes(item.id))
      : data.filter((item) => item.id !== id);

    setData(updatedData);
    */
    /*
    const deleteData = async () => {
      setLoading(true);

      console.log('start delete id', id);

      const resDelete = await fetch(`/api/doingdoit/feed/deleteOne?id=${id}`);

      console.log('resDelete', resDelete);

      const res = await fetch('/api/doingdoit/feed/getAll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          limit: countPerPage,
          page: currentPage,
          sort: sortConfig.key,
          order: sortConfig.direction,
          q: searchTerm,

          //startDate: startDate,
          //endDate: endDate,
          //mealTimeArray: mealTimeArray,
          //feedbackArray: feedbackArray,
        }),
      });

      const posts = (await res?.json()) as any;

      ///setData(posts?.data?.feeds);

      setData(
        posts?.data?.feeds.map((item: any) => {
          return {
            ...item,
            key: item.id,
            totalCount: posts?.data?.totalCount,
            currentPage: currentPage,
            countPerPage: countPerPage,
            loginUserId: 0,
          };
        })
      );

      setTotalCount(posts?.data?.totalCount);

      setLoading(false);
    };

    deleteData();
    */
  }

  ///console.log("data======", data);

  /*
   * Handle Filters and searching
   */
  const [searchTerm, setSearchTerm] = useState('');

  const [filters, setFilters] = useState<Record<string, any>>(
    initialFilterState ?? {}
  );

  function updateFilter(columnId: string, filterValue: string | any[]) {
    if (!Array.isArray(filterValue) && !isString(filterValue)) {
      throw new Error('filterValue data type should be string or array of any');
    }

    if (Array.isArray(filterValue) && filterValue.length !== 2) {
      throw new Error('filterValue data must be an array of length 2');
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      [columnId]: filterValue,
    }));
  }

  function applyFilters() {
    const searchTermLower = searchTerm.toLowerCase();

    return (
      sortedData
        .filter((item) => {
          const isMatchingItem = Object.entries(filters).some(
            ([columnId, filterValue]) => {
              if (
                Array.isArray(filterValue) &&
                typeof filterValue[1] === 'object'
              ) {
                const itemValue = new Date(item[columnId]);
                return (
                  // @ts-ignore
                  itemValue >= filterValue[0] && itemValue <= filterValue[1]
                );
              }
              if (
                Array.isArray(filterValue) &&
                typeof filterValue[1] === 'string'
              ) {
                const itemPrice = Math.ceil(Number(item[columnId]));
                return (
                  itemPrice >= Number(filterValue[0]) &&
                  itemPrice <= Number(filterValue[1])
                );
              }
              if (isString(filterValue) && !Array.isArray(filterValue)) {
                const itemValue = item[columnId]?.toString().toLowerCase();
                if (itemValue !== filterValue.toString().toLowerCase()) {
                  return false;
                }
                return true;
              }
            }
          );
          return isMatchingItem;
        })
        // global search after running filters
        .filter((item) =>
          Object.values(item).some((value) =>
            typeof value === 'object'
              ? value &&
                Object.values(value).some(
                  (nestedItem) =>
                    nestedItem &&
                    String(nestedItem).toLowerCase().includes(searchTermLower)
                )
              : value && String(value).toLowerCase().includes(searchTermLower)
          )
        )
    );
  }

  const fetchData = async (
    searchTerm: string = '',
    countPerPage: number = 10,
    currentPage: number = 1,

    //startDate: Date | string = '',
    //endDate: Date | string = '',

    //mealTimeArray: string[] = [],
    //feedbackArray: string[] = [],

    gradeArray: string[] = [],

    address: string = ''
  ) => {
    setLoading(true);

    /*
          const data = await fetch('/api/nft/getHorses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: '',
          pageNumber: 1,
          pageSize: 100,
          ///grades: selectedGradesStorage,
          grades: [],
          manes: [],
          holder: address,
          //sort: selectedGSortStorage,
        }),
      }).then((result) => {
        return result.json();
      });
      */

    const res = await fetch('/api/nft/getHorses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pageSize: countPerPage,
        pageNumber: currentPage,
        sort: sortConfig.key,
        order: sortConfig.direction,
        q: searchTerm,

        //startDate: startDate,
        //endDate: endDate,
        //mealTimeArray: mealTimeArray,
        //feedbackArray: feedbackArray,

        //grades: [],

        grades: gradeArray,

        manes: [],
        holder: address,
      }),
    });

    const posts = (await res?.json()) as any;

    //console.log('posts?.nfts', posts?.nfts);
    //console.log('posts?.total', posts?.total);

    setData(
      posts?.nfts.map((item: any) => {
        // get balance from api asynchrously

        /*
        const balance = async () => {
            
          const response = await fetch('/api/nft/getBalanceByTokenId', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              tokenId: item?.tokenId,
            }),
          });
          const data = await response.json();

          return data?.balance || 0;

        };


        const updatedItem = {
          ...item,
          balance:
            async () => {

              const  balanceData = await balance();

              return balanceData;

            },
        };
        */

        return {
          ...item,

          ///...updatedItem,

          key: item.id,
          totalCount: posts?.total,
          currentPage: currentPage,
          countPerPage: countPerPage,
          loginUserId: 0,
        };
      })
    );

    setTotalCount(posts?.total || 0);

    setLoading(false);
  };

  // when data[0]?.nft?.tokenId is updated, fetch balance from /api/nft/getBalanceByTokenId

  const [loadingBalanceArray, setLoadingBalanceArray] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    if (data[0]?.tokenId) {
      const fetchBalance = async () => {
        loadingBalanceArray[0] = true;

        const response = await fetch('/api/nft/getBalanceByTokenId', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tokenId: data[0]?.tokenId,
          }),
        });
        const json = await response.json();

        const balance = json?.balance || 0;

        setData((prevData) => {
          return prevData.map((prevItem) => {
            if (prevItem?.tokenId === data[0]?.tokenId) {
              return {
                ...prevItem,
                balance: balance,
              };
            }
            return prevItem;
          });
        });

        loadingBalanceArray[0] = false;
      };

      fetchBalance();
    }
  }, [data?.[0]?.tokenId]);

  useEffect(() => {
    if (data[1]?.tokenId) {
      const fetchBalance = async () => {
        loadingBalanceArray[1] = true;

        const response = await fetch('/api/nft/getBalanceByTokenId', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tokenId: data[1]?.tokenId,
          }),
        });
        const json = await response.json();

        const balance = json?.balance || 0;

        setData((prevData) => {
          return prevData.map((prevItem) => {
            if (prevItem?.tokenId === data[1]?.tokenId) {
              return {
                ...prevItem,
                balance: balance,
              };
            }
            return prevItem;
          });
        });

        loadingBalanceArray[1] = false;
      };

      fetchBalance();
    }
  }, [data?.[1]?.tokenId]);

  useEffect(() => {
    if (data[2]?.tokenId) {
      const fetchBalance = async () => {
        loadingBalanceArray[2] = true;

        const response = await fetch('/api/nft/getBalanceByTokenId', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tokenId: data[2]?.tokenId,
          }),
        });
        const json = await response.json();

        const balance = json?.balance || 0;

        setData((prevData) => {
          return prevData.map((prevItem) => {
            if (prevItem?.tokenId === data[2]?.tokenId) {
              return {
                ...prevItem,
                balance: balance,
              };
            }
            return prevItem;
          });
        });

        loadingBalanceArray[2] = false;
      };

      fetchBalance();
    }
  }, [data?.[2]?.tokenId]);

  useEffect(() => {
    if (data[3]?.tokenId) {
      const fetchBalance = async () => {
        loadingBalanceArray[3] = true;

        const response = await fetch('/api/nft/getBalanceByTokenId', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tokenId: data[3]?.tokenId,
          }),
        });
        const json = await response.json();

        const balance = json?.balance || 0;

        setData((prevData) => {
          return prevData.map((prevItem) => {
            if (prevItem?.tokenId === data[3]?.tokenId) {
              return {
                ...prevItem,
                balance: balance,
              };
            }
            return prevItem;
          });
        });

        loadingBalanceArray[3] = false;
      };

      fetchBalance();
    }
  }, [data?.[3]?.tokenId]);

  useEffect(() => {
    if (data[4]?.tokenId) {
      const fetchBalance = async () => {
        loadingBalanceArray[4] = true;

        const response = await fetch('/api/nft/getBalanceByTokenId', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tokenId: data[4]?.tokenId,
          }),
        });
        const json = await response.json();

        const balance = json?.balance || 0;

        setData((prevData) => {
          return prevData.map((prevItem) => {
            if (prevItem?.tokenId === data[4]?.tokenId) {
              return {
                ...prevItem,
                balance: balance,
              };
            }
            return prevItem;
          });
        });

        loadingBalanceArray[4] = false;
      };

      fetchBalance();
    }
  }, [data?.[4]?.tokenId]);

  useEffect(() => {
    if (data[5]?.tokenId) {
      const fetchBalance = async () => {
        loadingBalanceArray[5] = true;

        const response = await fetch('/api/nft/getBalanceByTokenId', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tokenId: data[5]?.tokenId,
          }),
        });
        const json = await response.json();

        const balance = json?.balance || 0;

        setData((prevData) => {
          return prevData.map((prevItem) => {
            if (prevItem?.tokenId === data[5]?.tokenId) {
              return {
                ...prevItem,
                balance: balance,
              };
            }
            return prevItem;
          });
        });

        loadingBalanceArray[5] = false;
      };

      fetchBalance();
    }
  }, [data?.[5]?.tokenId]);

  useEffect(() => {
    if (data[6]?.tokenId) {
      const fetchBalance = async () => {
        loadingBalanceArray[6] = true;

        const response = await fetch('/api/nft/getBalanceByTokenId', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tokenId: data[6]?.tokenId,
          }),
        });
        const json = await response.json();

        const balance = json?.balance || 0;

        setData((prevData) => {
          return prevData.map((prevItem) => {
            if (prevItem?.tokenId === data[6]?.tokenId) {
              return {
                ...prevItem,
                balance: balance,
              };
            }
            return prevItem;
          });
        });

        loadingBalanceArray[6] = false;
      };

      fetchBalance();
    }
  }, [data?.[6]?.tokenId]);

  useEffect(() => {
    if (data[7]?.tokenId) {
      const fetchBalance = async () => {
        loadingBalanceArray[7] = true;

        const response = await fetch('/api/nft/getBalanceByTokenId', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tokenId: data[7]?.tokenId,
          }),
        });
        const json = await response.json();

        const balance = json?.balance || 0;

        setData((prevData) => {
          return prevData.map((prevItem) => {
            if (prevItem?.tokenId === data[7]?.tokenId) {
              return {
                ...prevItem,
                balance: balance,
              };
            }
            return prevItem;
          });
        });

        loadingBalanceArray[7] = false;
      };

      fetchBalance();
    }
  }, [data?.[7]?.tokenId]);

  useEffect(() => {
    if (data[8]?.tokenId) {
      const fetchBalance = async () => {
        loadingBalanceArray[8] = true;

        const response = await fetch('/api/nft/getBalanceByTokenId', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tokenId: data[8]?.tokenId,
          }),
        });
        const json = await response.json();

        const balance = json?.balance || 0;

        setData((prevData) => {
          return prevData.map((prevItem) => {
            if (prevItem?.tokenId === data[8]?.tokenId) {
              return {
                ...prevItem,
                balance: balance,
              };
            }
            return prevItem;
          });
        });

        loadingBalanceArray[8] = false;
      };

      fetchBalance();
    }
  }, [data?.[8]?.tokenId]);

  useEffect(() => {
    if (data[9]?.tokenId) {
      const fetchBalance = async () => {
        loadingBalanceArray[9] = true;

        const response = await fetch('/api/nft/getBalanceByTokenId', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tokenId: data[9]?.tokenId,
          }),
        });
        const json = await response.json();

        const balance = json?.balance || 0;

        setData((prevData) => {
          return prevData.map((prevItem) => {
            if (prevItem?.tokenId === data[9]?.tokenId) {
              return {
                ...prevItem,
                balance: balance,
              };
            }
            return prevItem;
          });
        });

        loadingBalanceArray[9] = false;
      };

      fetchBalance();
    }
  }, [data?.[9]?.tokenId]);

  /*
   * Handle searching
   */
  function handleSearch(
    searchValue: string,
    countPerPage: number = 10,
    currentPage: number = 1,

    //startDate: Date | string = '',
    //endDate: Date | string = '',
    //mealTimeArray: string[] = [],
    //feedbackArray: string[] = [],

    gradeArray: string[] = [],

    address: string = ''
  ) {
    ///setSearchTerm(searchValue);

    /*
    console.log('handleSearch searchValue : ' + searchValue);
    console.log('handleSearch countPerPage : ' + countPerPage);
    console.log('handleSearch currentPage : ' + currentPage);
    console.log('handleSearch startDate : ' + startDate);
    console.log('handleSearch endDate : ' + endDate);
    console.log('handleSearch mealTimeArray : ' + mealTimeArray);
    console.log('handleSearch feedbackArray : ' + feedbackArray);
    */

    fetchData(
      searchValue,
      countPerPage,
      currentPage,

      //startDate,
      //endDate,
      //mealTimeArray,
      //feedbackArray,

      gradeArray,

      address
    );
  }

  ///console.log('data', data);

  // fetch balance from /api/nft/getBalanceByTokenId
  // and update data
  // when data is updated, the table will be updated

  /*
  useEffect(() => {

    data.map((item) => {
      const tokenId = item?.nft?.tokenId;

      const fetchBalance = async () => {

        const response = await fetch('/api/nft/getBalanceByTokenId', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tokenId: tokenId,
          }),
        });
        const data = await response.json();
  
        const balance = data?.balance || 0;

        setData((prevData) => {
          return prevData.map((prevItem) => {
            if (prevItem?.nft?.tokenId === tokenId) {
              return {
                ...prevItem,
                balance: balance,
              };
            }
            return prevItem;
          });
        } );
  
     
      };

      fetchBalance();
    } );

  }
  , [ data ]);
  */

  ///console.log('data', data);

  function searchedData() {
    if (!searchTerm) return sortedData;

    const searchTermLower = searchTerm.toLowerCase();

    return sortedData.filter((item) =>
      Object.values(item).some((value) =>
        typeof value === 'object'
          ? value &&
            Object.values(value).some(
              (nestedItem) =>
                nestedItem &&
                String(nestedItem).toLowerCase().includes(searchTermLower)
            )
          : value && String(value).toLowerCase().includes(searchTermLower)
      )
    );
  }

  /*
   * Reset search and filters
   */
  function handleReset() {
    setData(() => initialData);
    handleSearch('');
    if (initialFilterState) return setFilters(initialFilterState);
  }

  /*
   * Set isFiltered and final filtered data
   */
  const isFiltered = applyFilters().length > 0;

  function calculateTotalItems() {
    /*
    if (isFiltered) {
      return applyFilters().length;
    }
    if (searchTerm) {
      return searchedData().length;
    }
    return sortedData.length;
    */
    return totalCount;
  }

  const filteredAndSearchedData = isFiltered ? applyFilters() : searchedData();

  ////const tableData = paginatedData(filteredAndSearchedData);

  const tableData = data;

  /*
   * Go to first page when data is filtered and searched
   */
  /*
  useEffect(() => {

    handlePaginate(1);

  }, [isFiltered, searchTerm, sortConfig, countPerPage, startDate, endDate, mealTimeArray, feedbackArray]);
  */

  /*
  useEffect(() => {


    fetchData(
      searchTerm,
      countPerPage,
      currentPage,
      startDate,
      endDate,
      mealTimeArray,
      feedbackArray,
    );
  }
  ,[ countPerPage, ]);
  */

  // useTable returns
  return {
    isLoading,
    isFiltered,
    tableData,
    // pagination
    currentPage,

    //handlePaginate,

    totalItems: calculateTotalItems(),
    // sorting
    sortConfig,
    handleSort,
    // row selection
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,

    // searching
    searchTerm,
    handleSearch,

    // filters
    filters,
    updateFilter,
    applyFilters,
    handleDelete,
    handleReset,
  };
}
