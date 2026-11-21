
import { useState } from "react";
import {
  UserRound,

  Phone,
  MapPin,
  
  Bell,
  Moon,
  Sun,
  Lock,
  ShieldCheck,
  LogOut,
  ChevronRight,
  Camera,
  Pencil,
  
  Languages,
  Settings as SettingsIcon,
} from "lucide-react";
import {  useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const [language, setLanguage] = useState("English");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const settingsGroups = [
    {
      title: "Personal Information",
      items: [
        {
          icon: UserRound,
          title: "Profile Information",
          description: "Manage your name and personal details",
          action: () => navigate("/profile"),
        },
        {
          icon: MapPin,
          title: "Address Book",
          description: "Manage your delivery addresses",
          action: () => navigate("/addresses"),
        },
        {
          icon: Phone,
          title: "Contact Information",
          description: "Update your phone number and email",
          action: () => navigate("/profile"),
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: Languages,
          title: "Language",
          description: "Choose your preferred language",
          type: "language",
        },
        {
          icon: Bell,
          title: "Notifications",
          description: "Receive updates about your orders",
          type: "notifications",
        },
        {
          icon: darkMode ? Moon : Sun,
          title: "Appearance",
          description: "Choose between light and dark mode",
          type: "theme",
        },
      ],
    },
    {
      title: "Security",
      items: [
        {
          icon: Lock,
          title: "Change Password",
          description: "Update your account password",
          action: () => navigate("/change-password"),
        },
        {
          icon: ShieldCheck,
          title: "Privacy & Security",
          description: "Manage your account security",
          action: () => navigate("/privacy"),
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">


          <h1 className="flex items-center gap-3 text-3xl font-bold text-[#0B2E26]">
            <SettingsIcon size={30} />
            Settings
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your account, preferences and security.
          </p>
        </div>

        {/* Profile Card */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="h-24 bg-gradient-to-r from-[#0B2E26] to-[#00A86B]" />

          <div className="flex flex-col gap-5 px-6 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="-mt-12 flex items-end gap-4">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-emerald-50 text-[#00A86B] shadow-sm">
                <UserRound size={42} />

                <button className="absolute -bottom-2 -right-2 rounded-full bg-[#00A86B] p-2 text-white shadow-md hover:bg-[#0B2E26]">
                  <Camera size={15} />
                </button>
              </div>

              <div className="pb-1">
                <h2 className="text-xl font-bold text-[#0B2E26]">
                  My Account
                </h2>
                <p className="text-sm text-gray-500">
                  Welcome back to DzShopi!
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/profile")}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-[#0B2E26] transition hover:border-[#00A86B] hover:text-[#00A86B]"
            >
              <Pencil size={16} />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Settings Groups */}
        <div className="space-y-6">
          {settingsGroups.map((group) => (
            <div
              key={group.title}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
            >
              <div className="border-b border-gray-100 px-6 py-4">
                <h3 className="font-bold text-[#0B2E26]">
                  {group.title}
                </h3>
              </div>

              <div className="divide-y divide-gray-100">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      onClick={item.action}
                      className={`flex items-center gap-4 px-6 py-5 transition ${
                        item.action
                          ? "cursor-pointer hover:bg-gray-50"
                          : ""
                      }`}
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#00A86B]">
                        <Icon size={21} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-800">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                          {item.description}
                        </p>
                      </div>

                      {item.type === "language" && (
                        <select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          className="max-w-28 rounded-lg border border-gray-200 bg-gray-50 px-2 py-2 text-sm outline-none focus:border-[#00A86B]"
                        >
                          <option>English</option>
                          <option>Français</option>
                          <option>العربية</option>
                        </select>
                      )}

                      {item.type === "notifications" && (
                        <button
                          onClick={() => setNotifications(!notifications)}
                          className={`relative h-6 w-11 rounded-full transition ${
                            notifications
                              ? "bg-[#00A86B]"
                              : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all ${
                              notifications ? "left-6" : "left-1"
                            }`}
                          />
                        </button>
                      )}

                      {item.type === "theme" && (
                        <button
                          onClick={() => setDarkMode(!darkMode)}
                          className={`relative h-6 w-11 rounded-full transition ${
                            darkMode ? "bg-[#00A86B]" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all ${
                              darkMode ? "left-6" : "left-1"
                            }`}
                          />
                        </button>
                      )}

                      {!item.type && (
                        <ChevronRight
                          size={19}
                          className="shrink-0 text-gray-400"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Logout */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-red-100 bg-white shadow-sm">
          <button
            onClick={() => setShowLogout(true)}
            className="flex w-full items-center gap-4 px-6 py-5 text-left transition hover:bg-red-50"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500">
              <LogOut size={21} />
            </div>

            <div className="flex-1">
              <h4 className="font-bold text-red-500">
                Log Out
              </h4>
              <p className="mt-1 text-sm text-gray-500">
                Sign out from your DzShopi account
              </p>
            </div>

            <ChevronRight size={20} className="text-red-400" />
          </button>
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">
          DzShopi. — Shop Smarter, Live Better!
          <br />
          Version 1.0.0
        </p>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-7 shadow-2xl">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
              <LogOut size={30} />
            </div>

            <h3 className="text-center text-xl font-bold text-[#0B2E26]">
              Log Out?
            </h3>

            <p className="mt-2 text-center text-sm leading-6 text-gray-500">
              Are you sure you want to log out from your DzShopi account?
            </p>

            <div className="mt-7 flex gap-3">
              <button
                onClick={() => setShowLogout(false)}
                className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
