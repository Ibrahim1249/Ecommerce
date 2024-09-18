import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { User, LogOut, Upload } from "lucide-react"

const initialUserData = {
  username: "johndoe",
  avatarUrl: "/placeholder.svg?height=100&width=100",
  email: "johndoe@example.com",
  fullName: "John Doe",
  joinDate: "January 1, 2023",
}

export function Profile() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [userData, setUserData] = useState(initialUserData)
  const [newUsername, setNewUsername] = useState(userData.username)
  const [newAvatarUrl, setNewAvatarUrl] = useState(userData.avatarUrl)

  const handleUpdateProfile = (e) => {
    e.preventDefault()
    setUserData({ ...userData, username: newUsername, avatarUrl: newAvatarUrl })
    setIsDrawerOpen(false)
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewAvatarUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (<>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src={userData.avatarUrl} alt={userData.username} />
          <AvatarFallback>{userData.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => setIsDrawerOpen(true)}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <SheetContent className="sm:max-w-[425px]">
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleUpdateProfile} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="avatar">Profile Picture</Label>
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={newAvatarUrl} alt={userData.username} />
                <AvatarFallback>{userData.username.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <Label htmlFor="avatar-upload" className="cursor-pointer">
                <div
                  className="flex items-center space-x-2 rounded-md border border-gray-300 px-3 py-2 text-sm">
                  <Upload className="h-4 w-4" />
                  <span>Upload</span>
                </div>
                <Input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleAvatarChange} />
              </Label>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={userData.email} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" value={userData.fullName} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="joinDate">Join Date</Label>
            <Input id="joinDate" value={userData.joinDate} disabled />
          </div>
          <Button type="submit" className="w-full">Save Changes</Button>
        </form>
      </SheetContent>
    </Sheet>
  </>);
}