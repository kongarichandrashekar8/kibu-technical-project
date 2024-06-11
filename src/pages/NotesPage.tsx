import * as React from 'react';
import TextareaForm from '../components/specificComponent/TextAreaForm';
import { Separator } from '@/components/ui/separator';
import SideNav from '@/components/layout/SideNav';
import MembersSelection from '@/components/specificComponent/MembersSelection';
import CreateNote from '@/components/specificComponent/CreateNote';
import NoteList from '@/components/specificComponent/NoteList';
import SelectedNoteOptions from '@/components/specificComponent/SelectedNoteOptions';
import EditHistory from '@/components/specificComponent/EditHistory';
import { Member } from '@/types/member';
import { Note } from '@/types/note';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import Loading from '@/components/specificComponent/Loading';

export default function NotesPage() {
  const [members, setMembers] = React.useState<Member[]>();
  const [currentMember, setCurrentMember] = React.useState<Member>();
  const [currentNotes, setCurrentNotes] = React.useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = React.useState<Note>();
  const [currentAuditList, setCurrentAuditList] = React.useState<Note[]>();
  const [currentAudit, setCurrentAudit] = React.useState<Note>();

  const [openModel, setOpenModel] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState(true);
  const { toast } = useToast();

  //API operations
  const getMembers = async () => {
    try {
      const response = await fetch('http://localhost:3000/member');
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const membersData = await response.json();
  
      if (membersData.length > 0) {
        setMembers(membersData);
        setCurrentMember(membersData[0]);
        getNotesByMemberId(membersData[0].id);
      } else {
        toast({
          title: 'No members found',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Something went wrong, please try again later',
        variant: 'destructive',
      });
    }
  };

  const getNotesByMemberId = async (memberId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/notes?member=${memberId}`);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const notes = await response.json();
      const reversedNotes = notes.reverse();
  
      setCurrentNotes(reversedNotes);
      setSelectedNote(reversedNotes.length > 0 ? reversedNotes[0] : undefined);
    } catch (error) {
      toast({
        title: 'Something went wrong, please try again later',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateNote = async (noteId: string, updatedNote: Note, message: string) => {
    try {
      const response = await fetch(`http://localhost:3000/notes/${noteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNote),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update note');
      }
  
      const data = await response.json();

      setCurrentNotes((prevNotes) => 
        prevNotes.map((note) => (note.id === noteId ? data : note))
      );
      setSelectedNote(data);
  
      toast({
        title: message,
      });
    } catch (error) {
      toast({
        title: 'Something went wrong, please try again later',
        variant: 'destructive',
      });
    }
  };
  

 
  const getLogsByNoteId = async (noteId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/audit_log?note=${noteId}`);
      if (!response.ok) {
        throw new Error('Failed to get logs');
      }
      const data = await response.json();
  
      if (!data.length) {
        throw new Error(`No logs found for the given noteId, ${noteId}`);
      }
  
      const logs = data[0].log.reverse();
      setCurrentAuditList(logs);
      setCurrentAudit(logs[0]);
      setOpenModel(true);
    } catch (error) {
      toast({
        title: 'Something went wrong, please try again later',
        variant: 'destructive',
      });
    }
  };
  const createNote = async (newNote?: Note) => {
    try {
      const response = await fetch(`http://localhost:3000/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });
      if (!response.ok) {
        throw new Error('Failed to create new note');
      }
      const data = await response.json();
      setCurrentNotes((prevnotes) => [data, ...prevnotes]);
      setSelectedNote(data);
    } catch (error) {
      toast({
        title: 'Something went wrong, please try again later',
        variant: 'destructive',
      });
    }
  };

  const addToAuditLog = async (
    noteId: string,
    text: string,
    timestamp: string
  ) => {
    if (!currentMember) {
      return;
    }
    try {
      const auditLogResponse = await fetch(
        `http://localhost:3000/audit_log?note=${noteId}`
      );
      if (!auditLogResponse.ok) {
        throw new Error('Failed to add to audit log');
      }
      const auditLogData = await auditLogResponse.json();
      const existingAuditLogEntry = auditLogData[0];

      if (existingAuditLogEntry) {
        const updatedLog = [
          ...existingAuditLogEntry.log,
          { id: noteId, member: currentMember.id, text, timestamp },
        ];
        await fetch(
          `http://localhost:3000/audit_log/${existingAuditLogEntry.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...existingAuditLogEntry, log: updatedLog }),
          }
        );
      } else {
        // Note does not exist in the audit log, create a new entry
        await fetch(`http://localhost:3000/audit_log`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            note: noteId,
            log: [{ id: noteId, member: currentMember.id, text, timestamp }],
          }),
        });
      }
    } catch (error) {
      toast({
        title: 'Something went wrong, please try again later',
        variant: 'destructive',
      });
    }
  };

  const deleteNote = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/notes/${selectedNote?.id}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        throw new Error('Failed to delete the note');
      }
      const updatedCurrentNotes = currentNotes.filter(
        (note) => note.id != selectedNote?.id
      );
      if (updatedCurrentNotes.length > 0) {
        setCurrentNotes(updatedCurrentNotes);
        setSelectedNote(updatedCurrentNotes[0]);
      } else {
        setCurrentNotes([]);
        setSelectedNote(undefined);
      }
      toast({
        title: 'Sucessfully deleted the note.',
      });
    } catch (error) {
      toast({
        title: 'Something went wrong, please try again later',
        variant: 'destructive',
      });
    }
  };

  //Methods

  const addNote = () => {
    const randomNumber = Math.floor(Math.random() * 100000) + 1;
    const idd = randomNumber.toString();
    const timestamp = new Date().toISOString();
    const t = '';
    if (currentMember) {
      const note = {
        id: randomNumber.toString(),
        member: currentMember.id,
        text: '',
        timestamp: timestamp,
      };
      createNote(note);
      addToAuditLog(idd, t, timestamp);
    }
  };

  const saveNote = (note: Note) => {
    if (note.text) {
      const timestamp = new Date().toISOString();
      const updatedNote = { ...note, text: note.text, timestamp: timestamp };
      updateNote(note.id, updatedNote, 'Successfully updated the note');
      addToAuditLog(note.id, note.text, timestamp);
    }
  };

  const handleRestore = () => {
    if (currentAudit) {
      updateNote(
        currentAudit.id,
        currentAudit,
        'Successfully restored the note'
      );
    }
    setOpenModel(false);
  };

  const handleDelete = () => {
    deleteNote();
  };

  const handleMemberSelect = (value: string) => {
    const [id, _] = value.split('|');
    getNotesByMemberId(id);
    if (members) {
      setCurrentMember(members.filter((m) => m.id == id)[0]);
    }
  };

  const handleAuditSelect = (id: string) => {
    setCurrentAudit(currentAuditList?.find((audit) => audit.timestamp === id));
  };

  const handleNoteSelect = (id: string) => {
    const selectedNote = currentNotes.find((note) => note.id == id);
    setSelectedNote(selectedNote);
  };

  const handleModelOpen = () => {
    if (selectedNote) {
      getLogsByNoteId(selectedNote.id);
    }
    
  };

  React.useEffect(() => {
    getMembers();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Loading />
          <Toaster />
        </>
      ) : (
        <>
        
            <EditHistory
              openModel={openModel}
              currentAudit={currentAudit}
              currentAuditList={currentAuditList}
              handleChangeAudit={handleAuditSelect}
              handleRestore={handleRestore}
              setOpenModel={setOpenModel}
            />
      
          <Toaster />

          <div className="flex h-screen bg-white">
            <SideNav />

            <div className="w-1/3 flex flex-col h-screen box-border max-w-sm p-6 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 bg-white">
              {' '}
              <div className="">
                {currentMember && (
                  <MembersSelection
                    currentMember={currentMember}
                    handleSelectChange={handleMemberSelect}
                    members={members}
                  />
                )}

                <Separator className="my-4 border-t" />

                <CreateNote addNote={addNote} />
              </div>
              {currentNotes.length == 0 ? (
                <p>Please add notes</p>
              ) : (
                <NoteList
                  handleNoteSelect={handleNoteSelect}
                  currentNotes={currentNotes}
                  selectedNote={selectedNote}
                />
              )}
            </div>

            <div className="flex-grow p-20 bg-[#F2F7FF]">
              {selectedNote ? (
                <>
                  <div className="flex justify-end">
                    <SelectedNoteOptions
                      handleModelOpen={handleModelOpen}
                      handleDelete={handleDelete}
                    />
                  </div>
                  {selectedNote && (
                    <TextareaForm
                      selectedNote={selectedNote}
                      saveNote={saveNote}
                    />
                  )}
                </>
              ) : (
                <p>please select note</p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
