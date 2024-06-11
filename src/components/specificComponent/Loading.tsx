
import { Skeleton } from '../ui/skeleton'

const Loading = () => {
  return (
    <>
    <div className="flex h-screen bg-white">
      <Skeleton className="w-1/3 h-screen box-border max-w-sm bg-[#d7e3f7] border border-gray-200"></Skeleton>
      <Skeleton className="flex-grow p-20"></Skeleton>
    </div>
  </>
  )
}

export default Loading