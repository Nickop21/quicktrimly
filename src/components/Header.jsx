import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/db/apiAuth";
import useFetch from "@/hooks/useFetch";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { UrlState } from "@/context/context";
import { BarLoader } from "react-spinners";

function Header() {
  const navigate = useNavigate();
  const { user, fetchUser } = UrlState();
  const { loading, fn: fnLogout } = useFetch(logout);
  return (
    <>
      <nav className="fixed left-0 w-full z-[9999] py-2 px-7 flex justify-between items-center bg-[black]">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" className="h-12" alt="Trimrr Logo" />
        <h1 className="font-bold text-2xl">Quick <span className="text-orange-400">Trimly</span></h1>
        </Link>
        <div className="flex gap-4">
          {!user ? (
            <Button onClick={() => navigate("/auth")}>Login</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden ">
                <Avatar>
                  <AvatarImage src={user?.user_metadata?.profile_pic||"https://github.com/shadcn.png"} />
              
                  <AvatarFallback>PA</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                 
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/dashboard" className="flex">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    My Links
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    fnLogout().then(() => {
                      fetchUser();
                      navigate("/auth");
                    });
                  }}
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
      {loading && (
        <BarLoader
          className="absolute top-0 left-0"
          width={"100%"}
          color="#36d7b7"
        />
      )}
    </>
  );
}

export default Header;

// https://media.licdn.com/dms/image/D4D12AQFCAc9opGujrw/article-cover_image-shrink_720_1280/0/1685613726106?e=2147483647&v=beta&t=HfSIZmxen095ZXH3M82GLYmWyfXzZ8VNZ2WOtLueK5s
// https://www.landingfolio.com/inspiration/post/perspective-funnels