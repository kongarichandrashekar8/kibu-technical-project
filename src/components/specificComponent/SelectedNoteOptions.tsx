
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
const SelectedNoteOptions = ({
  handleModelOpen,
  handleDelete,
}: {
  handleModelOpen: () => void;
  handleDelete: () => void;
}) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="link">
            <svg
              width="20"
              height="20"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>{' '}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex items-center space-x-1"
            onSelect={handleModelOpen}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.15 7.49998C13.15 4.66458 10.9402 1.84998 7.50002 1.84998C4.72167 1.84998 3.34849 3.9064 2.76335 5H4.5C4.77614 5 5 5.22386 5 5.5C5 5.77614 4.77614 6 4.5 6H1.5C1.22386 6 1 5.77614 1 5.5V2.5C1 2.22386 1.22386 2 1.5 2C1.77614 2 2 2.22386 2 2.5V4.31318C2.70453 3.07126 4.33406 0.849976 7.50002 0.849976C11.5628 0.849976 14.15 4.18537 14.15 7.49998C14.15 10.8146 11.5628 14.15 7.50002 14.15C5.55618 14.15 3.93778 13.3808 2.78548 12.2084C2.16852 11.5806 1.68668 10.839 1.35816 10.0407C1.25306 9.78536 1.37488 9.49315 1.63024 9.38806C1.8856 9.28296 2.17781 9.40478 2.2829 9.66014C2.56374 10.3425 2.97495 10.9745 3.4987 11.5074C4.47052 12.4963 5.83496 13.15 7.50002 13.15C10.9402 13.15 13.15 10.3354 13.15 7.49998ZM7.5 4.00001C7.77614 4.00001 8 4.22387 8 4.50001V7.29291L9.85355 9.14646C10.0488 9.34172 10.0488 9.65831 9.85355 9.85357C9.65829 10.0488 9.34171 10.0488 9.14645 9.85357L7.14645 7.85357C7.05268 7.7598 7 7.63262 7 7.50001V4.50001C7 4.22387 7.22386 4.00001 7.5 4.00001Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span>View edit history </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center space-x-1"
            onClick={handleDelete}
          >
            <svg
              className="text-red-500"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="text-red-500">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default SelectedNoteOptions;
