"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import Sidebar, { Tab } from "./Sidebar";
import EditProfileModal from "./EditProfileModal";
import OrderHistory from "./OrderHistory";
import ProfileCard from "./ProfileCard";
import Link from "next/link";

import { getUsersDetails, updateUserDetails } from "@/apiFasad/apiCalls/user";
import { UserProfile } from "./types";
import { useNotificationCount } from "@/zustandStore/notificationCount";

const tabCopy: Record<Tab, { title: string; subtitle: string }> = {
  profile: {
    title: "My Profile",
    subtitle: "Manage your account details",
  },
  transactions: {
    title: "Transactions",
    subtitle: "View and filter your currency conversions",
  },
};

export default function ProfileDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  
    const count = useNotificationCount((s) => s.count);
    console.log("the count is ",count);
    

  // Fetch Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getUsersDetails();

        setProfile({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          email: userData.email || "",
          phone: userData.phone || "",
          username: userData.username || "",
          address: userData.address || "",
          city: userData.city || "",
          state: userData.state || "",
        });
      } catch (error) {
        console.error("Profile fetch failed:", error);
      }
    };

    fetchProfile();
  }, []);

  // Save Profile
  const handleSaveProfile = async (updated: UserProfile) => {
    try {
      const res = await updateUserDetails({
        firstName: updated.firstName,
        lastName: updated.lastName,
        phone: updated.phone,
        address: updated.address,
        city: updated.city,
        state: updated.state,
      });

      if (!res) {
        alert("Update failed");
        return;
      }

      setProfile({
        ...updated,
      });

      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const { title, subtitle } = tabCopy[activeTab];

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 md:flex-row">
        {/* PASS COLLAPSED STATE */}
      <Sidebar
        active={activeTab}
        onSelect={setActiveTab}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* 👇 MAIN CONTENT RESPONSIVE MARGIN */}
      <div
        className={`
          flex-1 transition-all duration-300
          ${collapsed ? "ml-[72px]" : "ml-60"}
        `}
      >
        <header className="border-b border-slate-200 bg-white">
          <div className="flex items-center justify-between px-6 py-5">
            <div>
              <h1 className="text-xl font-bold text-slate-900">{title}</h1>
              <p className="text-sm text-slate-500">{subtitle}</p>
            </div>
          
           
                 <Link href="/notifications">
                 
            <button
              className="relative shrink-0 rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
              aria-label="Notifications"
              >
              <Bell className="h-5 w-5" />
               {count >= 0 && (
                 <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-destructive text-destructive-foreground text-[10px] font-semibold rounded-full flex items-center justify-center leading-none">
                      {count > 99 ? "99+" : count}
                    </span>
                  )}
            </button>
                  </Link>

        
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-6 py-8">
          {activeTab === "profile" ? (
            <ProfileCard
              profile={profile}
              onEdit={() => setIsEditing(true)}
            />
          ) : (
            <div className="space-y-6">
              <OrderHistory />
            </div>
          )}
        </main>
      </div>

      {isEditing && (
        <EditProfileModal
          profile={profile}
          onClose={() => setIsEditing(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  );
}