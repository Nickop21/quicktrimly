import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import {logout} from "@/db/apiAuth";
// import useFetch from "@/hooks/use-fetch";
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";
import {LinkIcon, LogOut} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
// import {BarLoader} from "react-spinners";
import {Button} from "./ui/button";
// import {UrlState} from "@/context";
function Header() {
 const navigate= useNavigate()
 const user=false;
  return (
    <nav className="py-2 px-7 flex justify-between items-center shadow-sm shadow-[#5d5d7eda]">
        <Link to="/">
          <img src="/logo.png" className="h-16" alt="Trimrr Logo" />
        </Link>
        <div className="flex gap-4">

        {user?(

          <Button onClick={() => navigate("/auth")}>Login</Button>
        )
        :(
          <DropdownMenu >
          <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden ">
            <Avatar>
              {/* <AvatarImage src="https://github.com/shadcn.png" src={user?.user_metadata?.profile_pic} /> */}
              <AvatarImage src="https://github.com/shadcn.png" />
              
              <AvatarFallback>PA</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
             Nitin
              {/* {user?.user_metadata?.name} */}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/dashboard" className="flex">
                <LinkIcon className="mr-2 h-4 w-4" />
                My Links
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              // onClick={() => {
              //   fnLogout().then(() => {
              //     fetchUser();
              //     navigate("/auth");
              //   });
              // }}
              className="text-red-400"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        )}
        </div>
    </nav>
          // {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
  )
}

export default Header
