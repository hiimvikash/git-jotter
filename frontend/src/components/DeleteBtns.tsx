import { MdDelete } from "react-icons/md"


function DeleteBtns({onClick}:any) {
  return (
    <div className="m-10 mt-20">
    <div
      className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <svg
        className="flex-shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Info</span>
      <div>
        <span className="font-medium">Caution:</span> Once deleted, this jotter cannot be recovered. Are you certain?
      </div>
    </div>
    <div>

    <button onClick = {onClick} className=" flex gap-1 bg-red-800 hover:bg-red-900 text-red-100  items-center py-2.5 px-4 text-xs font-medium text-center rounded-lg">
      <span className="text-[14px]">Delete Jotter </span> <span className="text-[16px]"> <MdDelete /></span>
    </button>
    </div>

  </div>
  )
}

export default DeleteBtns