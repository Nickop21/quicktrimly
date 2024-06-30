import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Error from "./error";
import { useForm } from "react-hook-form";
import { login } from "@/db/apiAuth";
import { BeatLoader } from "react-spinners";
import useFetch from "@/hooks/useFetch";
import {UrlState} from "@/context/context";

function Login() {
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formerror,setFormerror]=useState("")
 const{data, loading, error:fetcherror, fn:fnlogin}= useFetch(login)
 const {fetchUser} = UrlState();

//  when ever change in loading or data update context data and navigate acc.

 useEffect(() => {
  if (fetcherror === null && data) {
    fetchUser()
    navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [fetcherror, data]);

  const handleLogin = async (data) => {
     
    console.log(data);
    // setFormData(data)
    // console.log("data",formData);
    try {
      await fnlogin(data)
    } catch (error) {
      setFormerror(error)
    }
  };
  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            to your account if you already have one
          </CardDescription>
          {fetcherror && <Error message={"Invalid login credentials"} />}
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Input
              name="email"
              type="email"
              placeholder="Enter Email"
             
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                      value
                    ) || "Email address must be a valid address",
                },
              })}
            />
          </div>
          {errors.email && <Error message="email is required" />}
          <div className="space-y-1">
            <Input
              name="password"
              type="password"
              placeholder="Enter Password"
              {...register("password", {
                required: true,
              })}
            />
          </div>
          {errors.password && <Error message="password is required" />}
        </CardContent>
        <CardFooter>
          <Button type="submit">
            {/* Login */}
            {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Login"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
export default Login;
