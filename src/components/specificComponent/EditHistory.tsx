import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { Note } from '@/types/note';
import { useEffect } from 'react';
const EditHistory = ({
  openModel,
  currentAudit,
  currentAuditList,
  handleChangeAudit,
  handleRestore,
  setOpenModel
}: {
  openModel: boolean;
  currentAudit?: Note;
  currentAuditList?: Note[];
  handleChangeAudit: (v: string) => void;
  handleRestore:()=>void,
  setOpenModel:(v:boolean)=>void
}) => {

  useEffect(()=>{
    console.log('currentAuditList ',currentAuditList)
  },[])
  return (
    <>
      <Dialog open={openModel}>
        <DialogContent className="">
          <DialogHeader className="flex flex-row">
            <div className="flex w-9/12">
              <DialogDescription>
                <p >{currentAudit?.text}</p>
  
              </DialogDescription>
            </div>
            <div>
              <div className="flex flex-col h-96 box-border w-lg p-6 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 bg-white">
                <ScrollArea className="flex-grow bg-blue-200 bg-white h-10 ">
                  {currentAuditList?.map((audit) => (
                    <div className="pt-1 pb-1">
                      <div
                        key={audit.timestamp}
                        onClick={() => handleChangeAudit(audit.timestamp)}
                        className={`p-4 w-full max-w-md cursor-pointer flex items-center p-2 text-gray-900 rounded-lg ${
                          currentAudit?.timestamp === audit.timestamp
                            ? 'bg-[#0F70FF]'
                            : 'bg-[#F7F7F7] dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group'
                        }`}
                      >
                        <div>
                          <p
                            className={`line-clamp-1 ${
                              currentAudit?.timestamp === audit.timestamp
                                ? 'text-white'
                                : 'text-grey-500'
                            }`}
                          >
                            {new Date(audit.timestamp).toLocaleTimeString()}{' '}
                            , {new Date(audit.timestamp).toDateString()}
                          </p>
                          <p
                            className={`line-clamp-1 ${
                              currentAudit?.timestamp === audit.timestamp
                                ? 'text-white'
                                : 'text-grey-500'
                            }`}
                          >
                            {audit.text.length > 0
                              ? audit.text
                              : 'New Note'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </div>

              <div className="pt-2 flex justify-between">
                <div className="mr-4">
                  <DialogClose asChild>
                    <Button
                      type="button"
                      
                      variant="default"
                      className=""
                      onClick={handleRestore}
                    >
                      Restore version
                    </Button>
                  </DialogClose>
                </div>
                <div>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setOpenModel(false)}
                      className=""
                    >
                      Close
                    </Button>
                  </DialogClose>
                </div>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditHistory;
