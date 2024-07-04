'use client';

import Link from 'next/link';

import { HeaderCell } from '@/components/ui/doingdoit/table';

import { Badge } from '@/components/ui/doingdoit/badge';

import { Title, Text } from '@/components/ui/doingdoit/text';

import { Tooltip } from '@/components/ui/doingdoit/tooltip';

import { ActionIcon } from '@/components/ui/doingdoit/action-icon';

//import { routes } from '@/config/routes';

import EyeIcon from '@/components/icons/eye';

import PencilIcon from '@/components/icons/pencil';

import TableAvatar from '@/components/ui/doingdoit/avatar-card';

import { PiCheckCircleFill, PiStarFill } from 'react-icons/pi';

import DateCell from '@/components/ui/doingdoit/date-cell';

import Image from 'next/image';
import Button from '@/components/ui/button';
import { ro } from 'date-fns/locale';

///import DeletePopover from '@/shared/popover';

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'pending':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="text-orange-dark ms-2 font-medium">{status}</Text>
        </div>
      );
    case 'completed':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="text-green-dark ms-2 font-medium">{status}</Text>
        </div>
      );
    case 'cancelled':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="text-red-dark ms-2 font-medium">{status}</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}

// get rating calculation
function getRating(rating: number[]) {
  let totalRating = rating.reduce((partialSum, value) => partialSum + value, 0);
  let review = totalRating / rating?.length;

  return (
    <div className="flex items-center">
      <span className="me-1 shrink-0">{review.toFixed(1)}</span>
      {[...new Array(5)].map((arr, index) => {
        return index < Math.round(review) ? (
          <PiStarFill className="fill-orange text-orange w-4" key={index} />
        ) : (
          <PiStarFill className="w-4 fill-gray-300 text-gray-300" key={index} />
        );
      })}{' '}
      <span className="ms-1 shrink-0">({totalRating})</span>
    </div>
  );
}

type Columns = {
  sortConfig?: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;

  onClickUser: (id: string) => void;

  totalItems?: number;
};

export const getColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,

  onClickUser,

  totalItems,
}: Columns) => [
  /*
  {
    title: <HeaderCell title="No" />,
    dataIndex: 'sequenceNumber',
    key: 'sequenceNumber',
    width: 50,
    render: 
    (
      _: any,
      row: any,
      index: number,
      
    ) => (

      <Link
        href={routes.feed.edit(row?.id)}

        className="ps-4 hover:text-gray-900 hover:underline"
      >
        <Text className='text-center'>
          {

            row.sequenceNumber


          }
        </Text>
      </Link>
      
    ),
  },
  */

  {
    title: <HeaderCell title="No" />,
    dataIndex: 'id',
    key: 'id',
    width: 80,
    //render: (value: string) => <Text className='  text-center ' >{value}</Text>,
    render: (_: any, row: any, index: number) => (
      <Text className="  text-center ">
        {row?.totalCount - index - (row?.currentPage - 1) * row?.countPerPage}
      </Text>
    ),
  },

  {
    title: <HeaderCell title="Token Id" />,
    dataIndex: 'tokenId',
    key: 'tokenId',
    width: 100,
    render: (value: string) => <Text className="text-center">{value}</Text>,
  },
  {
    title: <HeaderCell title="Name" />,
    dataIndex: 'gameHorseName',
    key: 'gameHorseName',
    width: 100,
    render: (value: string) => <Text className="text-center">#{value}</Text>,
  },

  {
    title: <HeaderCell title="Grade" />,
    dataIndex: 'grade',
    key: 'grade',
    width: 100,
    render: (value: string) => (
      <Text className="text-center text-xl font-bold">{value}</Text>
    ),
  },

  {
    title: <HeaderCell title="Image" />,
    dataIndex: 'imageUrl',
    key: 'imageUrl',
    width: 200,

    render: (_: string, row: any) => (
      <div className="flex items-center justify-center">
        {
          // if grade is 'U' then show default image (/images/default-horse.png)
          row?.grade === 'U' ? (
            <Image
              src="/images/default-horse.png"
              alt="Granderby Horse NFT"
              width={150}
              height={150}
              className="rounded-lg"
            />
          ) : (
            <Image
              src={row?.imageUrl}
              alt="Granderby Horse NFT"
              width={150}
              height={150}
              className="rounded-lg"
            />
          )
        }
      </div>
    ),
  },

  /*
  {
    title: <HeaderCell title="Allowance" />,
    dataIndex: 'balance',
    key: 'balance',
    width: 80,
    render: (value: string) => (
      <>
        {value == null ? (
          <Text className="text-center text-xl font-bold">0</Text>
        ) : (
          <Text className="text-center text-xl font-bold">
            {
              // currency format
              value.toLocaleString()
            }
          </Text>
        )}
      </>
    ),
  },
  */

  /*
  {
    title: <HeaderCell title="Allowance" />,
    dataIndex: 'balanceRealtime',
    key: 'balanceRealtime',
    width: 80,
    render: (value: string) => (
      <>
        {value == null ? (
          <Text className="text-center text-xl font-bold">0</Text>
        ) : (
          <Text className="text-center text-xl font-bold">
            {
              // currency format
              value.toLocaleString()
            }
          </Text>
        )}
      </>
    ),
  },
  */

  //my-horse-details/87

  ///my-horse-details/${row?.tokenId}
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" />,
    dataIndex: 'action',
    key: 'action',
    width: 80,
    render: (_: string, row: any) => (
      <Link
        href={`/my-horse-details/${row?.tokenId}`}
        className="ps-4 text-black  hover:text-gray-900 hover:underline"
      >
        <Text className="text-center text-lg font-bold ">Details</Text>
      </Link>
    ),
  },

  /*
  {
    title: <HeaderCell title="피드백작성자" />,
    dataIndex: 'feedbackWriterId',
    key: 'feedbackWriterId',
    width: 100,
    render: (_: any, row: any) => (
      <div className="flex items-center gap-2">

        <Text className="">{row.feedbackWriterId}</Text>
        <Text className="">{row.feedbackWriterNickname}</Text>
        <Text className="">{row.feedbackWriterAvatar}</Text>
        <Text className="">{row.feedbackWriterEmail}</Text>
        


      </div>
    ),
  },
  */

  /*
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 80,
    render: (_: string, row: any) => (


      <div className="flex items-center justify-end gap-3 pe-4">


        
        <Tooltip
          size="sm"
          content={() => '피드 상세보기'}
          placement="top"
          color="invert"
        >

          <Link href={routes.feed.details(row?.id)}>
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              aria-label={'피드 상세보기'}
              className="hover:text-gray-700"
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        



      </div>
    ),
  },
  */
];

export const getWidgetColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
}: Columns) => [
  {
    title: (
      <HeaderCell title="Order ID" className="ps-4 [&>div]:whitespace-nowrap" />
    ),
    dataIndex: 'id',
    key: 'id',
    width: 90,
    render: (value: string, row: any) => (
      <Link
        href={routes.eCommerce.editOrder(row?.id)}
        className="ps-4 hover:text-gray-900 hover:underline"
      >
        #{value}
      </Link>
    ),
  },
  {
    title: <HeaderCell title="Customer" />,
    dataIndex: 'customer',
    key: 'customer',
    width: 300,
    hidden: 'customer',
    render: (_: any, row: any) => (
      <TableAvatar src={row.avatar} name={row.name} description={row.email} />
    ),
  },
  {
    title: <HeaderCell title="Items" />,
    dataIndex: 'items',
    key: 'items',
    width: 150,
    render: (value: string) => <Text className="">{value}</Text>,
  },
  {
    title: (
      <HeaderCell
        title="Price"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'price'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('price'),
    dataIndex: 'price',
    key: 'price',
    width: 150,
    render: (value: string) => <Text className="">${value}</Text>,
  },
  {
    title: (
      <HeaderCell
        title="Created"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'createdAt'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('createdAt'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 200,
    render: (createdAt: Date) => <DateCell date={createdAt} />,
  },
  {
    title: (
      <HeaderCell
        title="Modified"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'updatedAt'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('updatedAt'),
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: 200,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    width: 140,
    render: (value: string) => getStatusBadge(value),
  },

  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 130,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={() => 'Edit Order'}
          placement="top"
          color="invert"
        >
          <Link href={routes.eCommerce.editOrder(row?.id)}>
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              aria-label={'Edit Order'}
              className="hover:text-gray-700"
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={() => 'View Order'}
          placement="top"
          color="invert"
        >
          <Link href={routes.eCommerce.orderDetails(row?.id)}>
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              aria-label={'View Order'}
              className="hover:text-gray-700"
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        {/*
        <DeletePopover
          title={`Delete the order`}
          description={`Are you sure you want to delete this #${row?.id} order?`}
          onDelete={() => onDeleteItem(row.id)}
        />
        */}
      </div>
    ),
  },
];
