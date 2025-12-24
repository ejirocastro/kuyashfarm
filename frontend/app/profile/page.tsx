"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { formatPrice } from "@/lib/utils";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Bell,
  Settings,
  Edit2,
  Save,
  X,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

type TabType = "profile" | "addresses" | "settings";

interface Address {
  id: number;
  label: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  memberSince: string;
}

/**
 * User Dashboard - Profile Management Page
 */
export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);

  // Mock user data
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    memberSince: "January 2024",
  });

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      label: "Home",
      name: "John Doe",
      street: "123 Main Street, Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
      phone: "(555) 123-4567",
      isDefault: true,
    },
    {
      id: 2,
      label: "Work",
      name: "John Doe",
      street: "456 Business Ave, Suite 100",
      city: "Brooklyn",
      state: "NY",
      zipCode: "11201",
      country: "USA",
      phone: "(555) 987-6543",
      isDefault: false,
    },
  ]);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    promotions: true,
    newsletter: false,
  });

  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    label: "",
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA",
    phone: "",
    isDefault: false,
  });

  const tabs = [
    { id: "profile" as TabType, label: "Profile", icon: User },
    { id: "addresses" as TabType, label: "Addresses", icon: MapPin },
    { id: "settings" as TabType, label: "Settings", icon: Settings },
  ];

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    // In a real app, save to backend
  };

  const handleAddAddress = () => {
    if (newAddress.label && newAddress.street && newAddress.city) {
      const id = Math.max(...addresses.map((a) => a.id), 0) + 1;
      setAddresses([...addresses, { ...newAddress, id } as Address]);
      setNewAddress({
        label: "",
        name: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "USA",
        phone: "",
        isDefault: false,
      });
      setIsAddingAddress(false);
    }
  };

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const handleSetDefaultAddress = (id: number) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Account</h1>
            <p className="text-gray-600">Manage your profile and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - User Info & Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                {/* User Avatar */}
                <div className="text-center mb-6">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <Image
                      src={userProfile.avatar}
                      alt={`${userProfile.firstName} ${userProfile.lastName}`}
                      fill
                      className="rounded-full object-cover"
                    />
                    <button className="absolute bottom-0 right-0 p-1.5 bg-green-600 rounded-full text-white hover:bg-green-700 transition-colors">
                      <Edit2 className="w-3 h-3" />
                    </button>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {userProfile.firstName} {userProfile.lastName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Member since {userProfile.memberSince}
                  </p>
                </div>

                {/* Navigation Tabs */}
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                          activeTab === tab.id
                            ? "bg-green-50 text-green-700 font-semibold"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="bg-white rounded-2xl shadow-sm p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Profile Information
                    </h2>
                    {!isEditingProfile ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditingProfile(true)}
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditingProfile(false)}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                        <Button size="sm" onClick={handleSaveProfile}>
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={userProfile.firstName}
                          onChange={(e) =>
                            setUserProfile({ ...userProfile, firstName: e.target.value })
                          }
                          disabled={!isEditingProfile}
                          className={`w-full pl-10 pr-4 py-2.5 border rounded-lg ${
                            isEditingProfile
                              ? "border-gray-300 focus:ring-2 focus:ring-green-500"
                              : "border-gray-200 bg-gray-50"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={userProfile.lastName}
                          onChange={(e) =>
                            setUserProfile({ ...userProfile, lastName: e.target.value })
                          }
                          disabled={!isEditingProfile}
                          className={`w-full pl-10 pr-4 py-2.5 border rounded-lg ${
                            isEditingProfile
                              ? "border-gray-300 focus:ring-2 focus:ring-green-500"
                              : "border-gray-200 bg-gray-50"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={userProfile.email}
                          onChange={(e) =>
                            setUserProfile({ ...userProfile, email: e.target.value })
                          }
                          disabled={!isEditingProfile}
                          className={`w-full pl-10 pr-4 py-2.5 border rounded-lg ${
                            isEditingProfile
                              ? "border-gray-300 focus:ring-2 focus:ring-green-500"
                              : "border-gray-200 bg-gray-50"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={userProfile.phone}
                          onChange={(e) =>
                            setUserProfile({ ...userProfile, phone: e.target.value })
                          }
                          disabled={!isEditingProfile}
                          className={`w-full pl-10 pr-4 py-2.5 border rounded-lg ${
                            isEditingProfile
                              ? "border-gray-300 focus:ring-2 focus:ring-green-500"
                              : "border-gray-200 bg-gray-50"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Change Password Section */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Change Password
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="mt-4">
                      Update Password
                    </Button>
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-sm p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">
                        Saved Addresses
                      </h2>
                      <Button
                        onClick={() => setIsAddingAddress(!isAddingAddress)}
                        size="sm"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Address
                      </Button>
                    </div>

                    {/* Add Address Form */}
                    {isAddingAddress && (
                      <div className="mb-6 p-6 bg-gray-50 rounded-lg border-2 border-green-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          New Address
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Label (e.g., Home, Work)"
                            value={newAddress.label}
                            onChange={(e) =>
                              setNewAddress({ ...newAddress, label: e.target.value })
                            }
                            className="px-4 py-2.5 border border-gray-300 rounded-lg"
                          />
                          <input
                            type="text"
                            placeholder="Full Name"
                            value={newAddress.name}
                            onChange={(e) =>
                              setNewAddress({ ...newAddress, name: e.target.value })
                            }
                            className="px-4 py-2.5 border border-gray-300 rounded-lg"
                          />
                          <input
                            type="text"
                            placeholder="Street Address"
                            value={newAddress.street}
                            onChange={(e) =>
                              setNewAddress({ ...newAddress, street: e.target.value })
                            }
                            className="md:col-span-2 px-4 py-2.5 border border-gray-300 rounded-lg"
                          />
                          <input
                            type="text"
                            placeholder="City"
                            value={newAddress.city}
                            onChange={(e) =>
                              setNewAddress({ ...newAddress, city: e.target.value })
                            }
                            className="px-4 py-2.5 border border-gray-300 rounded-lg"
                          />
                          <input
                            type="text"
                            placeholder="State"
                            value={newAddress.state}
                            onChange={(e) =>
                              setNewAddress({ ...newAddress, state: e.target.value })
                            }
                            className="px-4 py-2.5 border border-gray-300 rounded-lg"
                          />
                          <input
                            type="text"
                            placeholder="ZIP Code"
                            value={newAddress.zipCode}
                            onChange={(e) =>
                              setNewAddress({ ...newAddress, zipCode: e.target.value })
                            }
                            className="px-4 py-2.5 border border-gray-300 rounded-lg"
                          />
                          <input
                            type="tel"
                            placeholder="Phone"
                            value={newAddress.phone}
                            onChange={(e) =>
                              setNewAddress({ ...newAddress, phone: e.target.value })
                            }
                            className="px-4 py-2.5 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button onClick={handleAddAddress}>Save Address</Button>
                          <Button
                            variant="outline"
                            onClick={() => setIsAddingAddress(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Address List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addresses.map((address) => (
                        <div
                          key={address.id}
                          className={`p-6 border-2 rounded-lg ${
                            address.isDefault
                              ? "border-green-500 bg-green-50"
                              : "border-gray-200 bg-white"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-gray-900">
                                {address.label}
                              </h3>
                              {address.isDefault && (
                                <span className="px-2 py-0.5 bg-green-600 text-white text-xs font-semibold rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <button
                              onClick={() => handleDeleteAddress(address.id)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="text-sm text-gray-600 space-y-1">
                            <p className="font-semibold text-gray-900">{address.name}</p>
                            <p>{address.street}</p>
                            <p>
                              {address.city}, {address.state} {address.zipCode}
                            </p>
                            <p>{address.country}</p>
                            <p className="flex items-center gap-1 mt-2">
                              <Phone className="w-3 h-3" />
                              {address.phone}
                            </p>
                          </div>

                          {!address.isDefault && (
                            <button
                              onClick={() => handleSetDefaultAddress(address.id)}
                              className="mt-4 text-sm text-green-600 hover:text-green-700 font-semibold"
                            >
                              Set as Default
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="bg-white rounded-2xl shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Account Settings
                  </h2>

                  {/* Notification Settings */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Bell className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Notifications
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {[
                        {
                          key: "emailNotifications",
                          label: "Email Notifications",
                          description: "Receive notifications via email",
                        },
                        {
                          key: "smsNotifications",
                          label: "SMS Notifications",
                          description: "Receive notifications via text message",
                        },
                        {
                          key: "orderUpdates",
                          label: "Order Updates",
                          description: "Get updates about your order status",
                        },
                        {
                          key: "promotions",
                          label: "Promotions & Offers",
                          description: "Receive special offers and discounts",
                        },
                        {
                          key: "newsletter",
                          label: "Newsletter",
                          description: "Monthly newsletter with farm updates",
                        },
                      ].map((setting) => (
                        <div
                          key={setting.key}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <p className="font-semibold text-gray-900">
                              {setting.label}
                            </p>
                            <p className="text-sm text-gray-500">
                              {setting.description}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              setSettings({
                                ...settings,
                                [setting.key]: !settings[
                                  setting.key as keyof typeof settings
                                ],
                              })
                            }
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings[setting.key as keyof typeof settings]
                                ? "bg-green-600"
                                : "bg-gray-300"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings[setting.key as keyof typeof settings]
                                  ? "translate-x-6"
                                  : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-red-600 mb-4">
                      Danger Zone
                    </h3>
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800 mb-4">
                        Once you delete your account, there is no going back. Please
                        be certain.
                      </p>
                      <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
