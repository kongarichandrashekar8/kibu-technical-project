
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Member } from '@/types/member';

const MembersSelection = ({
  currentMember,
  handleSelectChange,
  members,
}: {
  currentMember: Member;
  handleSelectChange: (value: string) => void;
  members?: Member[];
}) => {

  return (
    <>
      <Select
        value={`${currentMember?.id}|${currentMember?.firstName}`}
        onValueChange={handleSelectChange}
      >
        <SelectTrigger className="">
          <SelectValue placeholder="Select the member" />
        </SelectTrigger>

        <SelectContent className="min-w-0">
          <SelectGroup>
            {members?.map((member) => {
              return (
                <SelectItem
                  key={member.id}
                  value={`${member.id}|${member.firstName}`}
                >
                  {member.firstName}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default MembersSelection;
