import { useEffect, useState } from "react";
import Error from "./error";
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
import { signup } from "@/db/apiAuth";
import { BeatLoader } from "react-spinners";
import useFetch from "@/hooks/useFetch";
import { useForm } from "react-hook-form";

const Signup = () => {
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const [errors, setErrors] = useState({});
  

  const {
    loading,
    error: fetcherror,
    fn: fnSignup,
    data,
  } = useFetch(signup);

  useEffect(() => {
    if (fetcherror === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcherror, loading]);

  const handleSignup = async (data) => {
    try {
      await fnSignup(data);
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit(handleSignup)}>
      <Card>
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription>
            Create a new account if you haven&rsquo;t already
          </CardDescription>
          {fetcherror && <Error message={"Somthing wents wrong"} />}
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Input
              name="name"
              type="text"
              placeholder="Enter Name"
              {...register("name", { required: true })}
            />
          </div>
          {errors.name && <Error message={"Name required"} />}
          <div className="space-y-1">
            <Input
              name="email"
              type="email"
              placeholder="Enter Email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
          </div>
          {errors.email && (
            <Error message={"Email address must be a valid address"} />
          )}
          <div className="space-y-1">
            <Input
              name="password"
              type="password"
              placeholder="Enter Password"
              {...register("password", { required: true })}
            />
          </div>
          {errors.password && <Error message={"password required"} />}
          <div className="space-y-1">
            <input
              name="profile_pic"
              type="file"
              accept="image/*"
              {...register("profile_pic")}
            />
          </div>
          {/* {errors.pic && <Error message={errors.pic} />} */}
        </CardContent>
        <CardFooter>
          <Button type="submit">
            {loading ? (
              <BeatLoader size={10} color="#36d7b7" />
            ) : (
              "Create Account"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Signup;
