import { Note } from "@/types/note"
import { ScrollArea } from "../ui/scroll-area"


const NoteList = ({handleNoteSelect,currentNotes,selectedNote}:{handleNoteSelect:(v:string)=>void,currentNotes:Note[],selectedNote?:Note}) => {
  return (
    <>
    <ScrollArea className="flex-grow bg-blue-200 bg-white ">
            {currentNotes.map((note) => (
              <div className="pt-1 pb-1">
                <div
                  key={note.id}
                  onClick={() => handleNoteSelect(note.id)}
                  className={`p-4 w-full max-w-md cursor-pointer flex items-center p-2 text-gray-900 rounded-lg ${
                    selectedNote?.id === note.id
                      ? 'bg-[#0F70FF]'
                      : 'bg-[#F7F7F7] dark:text-white hover:bg-blue-100'
                  }`}
                >
                  <p
                    className={`line-clamp-1 ${
                      selectedNote?.id === note.id
                        ? 'text-white'
                        : 'text-grey-500'
                    }`}
                  >
                    {note.text.length > 0 ? note.text : 'New Note'}
                  </p>
                </div>
              </div>
            ))}
          </ScrollArea>
    
    </>
  )
}

export default NoteList