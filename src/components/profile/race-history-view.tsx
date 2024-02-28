import Avatar from '@/components/ui/avatar';
import { useModal } from '@/components/modal-views/context';
import Button from '@/components/ui/button';
import Scrollbar from '@/components/ui/scrollbar';

import Image from 'next/image';

import User1 from '@/assets/images/game/icon_rank_1.jpg';
import User2 from '@/assets/images/game/icon_rank_2.jpg';
import User3 from '@/assets/images/game/icon_rank_3.jpg';

export default function RaceHistory({ ...props }) {
  const { data } = useModal();

  return (
    <div
      //className="relative z-50 mx-auto h-[600px] w-[540px] max-w-full rounded-lg bg-white px-6 py-6 dark:bg-light-dark"
      className="relative z-50 mx-auto h-[800px] w-[1000px] max-w-full rounded-lg bg-white px-6 py-6 dark:bg-light-dark"
      {...props}
    >
      {data && (
        <h2 className="mb-5 text-xl font-medium ltr:text-left rtl:text-right">
          {/*
          {data?.title} ({data?.count})
          */}
          #KR01-278
        </h2>
      )}
      <Scrollbar style={{ height: 'calc(100% - 60px)' }}>
        <div className="ltr:pr-2 rtl:pl-2">
          {data?.users?.map((user: any, index: number) => (
            <div
              className="flex flex-row items-center gap-5 border-b border-dashed border-gray-200 py-4 text-center dark:border-gray-700 "
              key={user.name + index}
            >
              <div className=" flex h-24  w-24 items-center justify-center ">
                {index === 0 ? (
                  <Image
                    src={User1}
                    alt="Ranking"
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                ) : index === 1 ? (
                  <Image
                    src={User2}
                    alt="Ranking"
                    width={90}
                    height={90}
                    className="rounded-full"
                  />
                ) : index === 2 ? (
                  <Image
                    src={User3}
                    alt="Ranking"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                ) : (
                  <div
                    className="
                    flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-lg font-bold dark:bg-gray-700"
                  >
                    {index + 1}
                  </div>
                )}
              </div>

              {/*
              <Avatar
                className="!h-12 !w-12"
                image={user?.thumbnail}
                alt="Author"
              />
              */}
              <Image
                src={user?.thumbnail}
                alt="Ranking"
                width={100}
                height={100}
                className="rounded-lg"
              />
              <h3 className="text-md tracking-tighter text-gray-900 ltr:ml-4 rtl:mr-4 dark:text-white">
                {user?.name}
              </h3>
              {/*
              <Button
                color="white"
                className="shadow-card ltr:ml-auto rtl:mr-auto dark:bg-light-dark md:h-10 md:px-5 xl:h-12 xl:px-7"
              >
                Follow
              </Button>
              */}
            </div>
          ))}
        </div>
      </Scrollbar>
    </div>
  );
}
