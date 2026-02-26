"use client";

import { useEffect, useState } from "react";
import { getUsersDetails, updateUserDetails } from "@/apiFasad/apiCalls/user";
import EditProfileForm from "@/components/profiles/components/profile/EditProfileForm";
import ProfileCard from "@/components/profiles/components/profile/ProfileCard";
import ProfileHeader from "@/components/profiles/components/profile/ProfileHeader";
import TransactionHistory from "@/components/profiles/components/profile/Transactionhistory";


type ProfileData = {
  name: string;
  email: string;
  phone: string;
  username: string;
  address: string;
  city: string;
  state: string;
};

const defaultProfile: ProfileData = {
  name: "",
  email: "",
  phone: "",
  username: "",
  address: "",
  city: "",
  state: "",
};

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>(defaultProfile);
  const [editData, setEditData] = useState<ProfileData>(defaultProfile);
  // ── Fetch profile ──────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getUsersDetails();
        const data: ProfileData = {
          name: `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          phone: userData.phone,
          username: userData.username,
          address: userData.address,
          city: userData.city,
          state: userData.state,
        };
        setProfileData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [isEditing]);

  // ── Edit handlers ──────────────────────────────────────────────────────────
  const handleEdit = () => {
    setIsEditing(true);
    setEditData(profileData);
  };

  const handleSave = async () => {
    const nameParts = editData.name.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "";

    try {
      const res = await updateUserDetails({
        firstName,
        lastName,
        phone: editData.phone,
        state: editData.state,
        city: editData.city,
        address: editData.address,
      });

      if (!res) return alert("Update failed");
      setProfileData(res);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const handleChange = (field: string, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="max-w-400 mx-auto px-4">
        <ProfileHeader />

        <main className="w-full px-4 py-8">
          <div className="max-w-400 mx-auto">
            {/* Top grid: profile card + banner */}
            <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8">
              {/* Left: Profile card */}
              <div className="col-span-1">
                <ProfileCard
                  profileData={profileData}
                  isEditing={isEditing}
                  onEdit={handleEdit}
                />
              </div>

              {/* Mobile edit form (between card and banner) */}
              {isEditing && (
                <div className="col-span-1 lg:hidden">
                  <EditProfileForm
                    editData={editData}
                    onChange={handleChange}
                    onSave={handleSave}
                    onCancel={() => setIsEditing(false)}
                    layout="mobile"
                  />
                </div>
              )}

              {/* Right: Promotional banner */}
              <div className="col-span-1">
                <div className="h-full min-h-70 lg:min-h-full rounded-xl overflow-hidden cursor-pointer transition-transform duration-300 ease-out hover:scale-[1.02] shadow-md hover:shadow-xl">
                  <img
                    src="/profile_banner.jpeg"
                    alt="Banner"
                    className="w-auto h-full"
                  />
                </div>
              </div>
            </div>

            {/* Bottom: Desktop edit form + transaction history */}
            <div className="space-y-8 mt-8">
              {isEditing && (
                <div className="hidden lg:block">
                  <EditProfileForm
                    editData={editData}
                    onChange={handleChange}
                    onSave={handleSave}
                    onCancel={() => setIsEditing(false)}
                    layout="desktop"
                  />
                </div>
              )}

              <TransactionHistory />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}