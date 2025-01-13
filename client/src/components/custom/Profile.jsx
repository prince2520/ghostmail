import { Button } from "@/components/ui/button"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector(state => state.user);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="rounded-full">{user.name}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
       <div className="text-xs font-semibold">{user.email}</div>
      </PopoverContent>
    </Popover>
  )
};

export default Profile;
