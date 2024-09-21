
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GithubIcon, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import registerImg from "../assets/register.jpg";
import { useForm , Controller } from "react-hook-form";
import { useState, useRef } from "react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import axios from "axios";
export function RegisterPage() {
  const { control, register , handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName:"",
      lastName : "",
      email: "",
      password: "",
      role: "user"
    }
  })
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleRegister = async(data) => {
    // console.log(data);
    const formData = new FormData();

    Object.keys(data).forEach(key =>{
       formData.append(key , data[key])
    })
    if(profileImage){
      formData.append("profileImage" , profileImage)
    }
    console.log(formData)
    try{
      const response = await axios.post("http://localhost:8989/api/v1/register" , formData)
      console.log(response)
    }catch(error){
       console.log(error)
    }
     
  };


  console.log(profileImage);
  return (
    <div className="min-h-screen flex bg-gray-900">
      {/* Left side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-white">
              Create an account
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Sign up and start your journey
            </p>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit(handleRegister)}
            enctype="multipart/form-data"
          >
            <div className="space-y-4">
            <div className="flex space-x-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="firstName" className="text-gray-200">First Name</Label>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: "First name is required" }}
                render={({ field }) => <Input id="firstName"   placeholder="john" className="bg-gray-800 text-gray-100" {...field} />}
              />
              {errors.firstName && <p className="text-sm text-red-400">{errors.firstName.message}</p>}
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="lastName" className="text-gray-200">Last Name</Label>
              <Controller
                name="lastName"
             
                control={control}
                rules={{ required: "Last name is required" }}
                render={({ field }) => <Input id="lastName"  placeholder="doe" className="bg-gray-800 text-gray-100" {...field} />}
              />
              {errors.lastName && <p className="text-sm text-red-400">{errors.lastName.message}</p>}
            </div>
          </div>
              <div>
                <Label htmlFor="email" className="text-white">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="relative">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type={isOpen ? "text" : "password"}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    validate: {
                      hasUppercase: (value) =>
                        /[A-Z]/.test(value) ||
                        "Password must contain at least one uppercase letter",
                      hasLowercase: (value) =>
                        /[a-z]/.test(value) ||
                        "Password must contain at least one lowercase letter",
                      hasNumber: (value) =>
                        /\d/.test(value) ||
                        "Password must contain at least one number",
                    },
                  })}
                />
                <span
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                  className="absolute top-7 right-2 p-2 cursor-pointer "
                >
                  {isOpen ? (
                    <EyeOpenIcon className="fill-white" />
                  ) : (
                    <EyeClosedIcon className="fill-white" />
                  )}
                </span>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
            <Label htmlFor="role" className="text-gray-200">Role</Label>
            <Controller
              name="role"
              control={control}
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger id="role" className="bg-gray-800 text-gray-100">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700">
                    <SelectItem 
                      value="user"
                      className={cn(
                        "cursor-pointer text-gray-100",
                        field.value === "user" && "bg-gray-800 text-white"
                      )}
                    >
                      User
                    </SelectItem>
                    <SelectItem 
                      value="admin"
                      className={cn(
                        "cursor-pointer text-gray-100",
                        field.value === "admin" && "bg-gray-600 text-white"
                      )}
                    >
                      Admin
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.role && <p className="text-sm text-red-400">{errors.role.message}</p>}
          </div>
              <div>
                <Label htmlFor="profile-image" className="text-white">
                  Profile Image
                </Label>
                <div className="mt-1 flex items-center">
                  <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-700">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <svg
                        className="h-full w-full text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )}
                  </span>
                  <Button
                    onClick={handleUploadClick}
                    type="button"
                    className="ml-5 bg-gray-800 border-gray-700 text-white hover:bg-gray-400"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                  <Input
                    ref={fileInputRef}
                    id="profile-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    name="profileImage"
                    //  {...register("profileImage")}
                  />
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Create account
            </Button>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="w-full border-gray-700  text-slate-800 hover:bg-gray-200"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                  />
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full border-gray-700  text-slate-800 hover:bg-gray-200"
              >
                <GithubIcon className="w-5 h-5 mr-2" />
                GitHub
              </Button>
            </div>
          </div>
          <p className="mt-10 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
      {/* Right side - Background Image */}
      <div className="hidden lg:block lg:w-3/5 relative h-screen overflow-hidden">
        <img
          src={registerImg}
          alt="Login background"
          className="absolute inset-0 w-full h-full object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent" />
      </div>
    </div>
  );
}
