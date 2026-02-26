"use client";

import { Mail, Phone, MapPin, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ProfileData = {
  name: string;
  email: string;
  phone: string;
  username: string;
  address: string;
  city: string;
  state: string;
};

type Props = {
  profileData: ProfileData;
  isEditing: boolean;
  onEdit: () => void;
};

export default function ProfileCard({ profileData, isEditing, onEdit }: Props) {
  return (
    <Card className="sticky top-24">
      <CardHeader className="text-center pb-4">
        <Avatar className="w-24 h-24 mx-auto mb-4">
          <AvatarImage
            src="https://avatar.vercel.sh/rajesh"
            alt={profileData.name}
          />
          <AvatarFallback>RK</AvatarFallback>
        </Avatar>
        <CardTitle className="text-xl">{profileData.name}</CardTitle>
        <CardDescription>@{profileData.username}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50">
            <Mail className="w-4 h-4 text-primary shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="break-all font-medium">{profileData.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50">
            <Phone className="w-4 h-4 text-primary shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="font-medium">{profileData.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="font-medium">
                {profileData.city}, {profileData.state}
              </p>
            </div>
          </div>
        </div>
        <Button onClick={onEdit} className="w-full gap-2" disabled={isEditing}>
          <Edit2 className="w-4 h-4" />
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
}