"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAdmin, getAdminUser } from "../utils/adminAuth";
import { 
  useGetAdminStatsQuery, 
  useGetAdminUsersQuery,
  useUpdateUserPlanMutation 
} from "../slices/adminApiSlice";
import type { AdminUser } from "../slices/adminApiSlice";
import AdminLayout from "../components/AdminLayout";
import { 
  FiUsers, 
  FiTrendingUp, 
  FiDollarSign, 
  FiActivity,
  FiSearch,
  FiFilter,
  FiDownload,
  FiUserCheck
} from "react-icons/fi";

export default function AdminDashboard() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Admin authentication check
  useEffect(() => {
    if (!isAdmin()) {
      router.push("/login");
      return;
    }
  }, [router]);

  const adminUser = getAdminUser();

  // API queries
  const { data: statsData } = useGetAdminStatsQuery();
  const { data: usersData } = useGetAdminUsersQuery({
    skip: (currentPage - 1) * 20,
    limit: 20,
  });
  const [updateUserPlan] = useUpdateUserPlanMutation();

  // Loading state
  if (!adminUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const handleUserPlanUpdate = async (userEmail: string, planType: string, subscriptionStatus: string) => {
    try {
      await updateUserPlan({ user_email: userEmail, plan_type: planType, subscription_status: subscriptionStatus }).unwrap();
    } catch (error) {
      console.error("Failed to update user plan:", error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <AdminLayout title="Admin Dashboard" subtitle="Manage your application">
      <div className="space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Total Users",
              value: statsData?.total_users || 0,
              icon: FiUsers,
              color: "blue",
              change: "+12%",
            },
            {
              title: "Active Users",
              value: statsData?.active_users || 0,
              icon: FiUserCheck,
              color: "green",
              change: "+8%",
            },
            {
              title: "Total Revenue",
              value: formatCurrency(statsData?.revenue || 0),
              icon: FiDollarSign,
              color: "purple",
              change: "+15%",
            },
            {
              title: "Total Requests",
              value: statsData?.total_requests || 0,
              icon: FiTrendingUp,
              color: "orange",
              change: "+3%",
            },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                  </div>
                  <div className={`w-12 h-12 bg-${stat.color}-100 rounded-full flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Total Humanized Texts",
              value: statsData?.total_humanized_texts || 0,
              icon: FiActivity,
              color: "indigo",
              change: "+5%",
            },
            {
              title: "Humanized Texts Today",
              value: statsData?.humanized_texts_today || 0,
              icon: FiTrendingUp,
              color: "teal",
              change: "+2%",
            },
            {
              title: "Pro Users",
              value: statsData?.pro_users || 0,
              icon: FiUsers,
              color: "blue",
              change: "+10%",
            },
            {
              title: "Premium Users",
              value: statsData?.premium_users || 0,
              icon: FiUserCheck,
              color: "purple",
              change: "+15%",
            },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                  </div>
                  <div className={`w-12 h-12 bg-${stat.color}-100 rounded-full flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View all
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Requests Today",
                value: statsData?.requests_today || 0,
                icon: FiTrendingUp,
                color: "orange",
              },
              {
                title: "Humanized Texts Today",
                value: statsData?.humanized_texts_today || 0,
                icon: FiActivity,
                color: "teal",
              },
              {
                title: "Free Users",
                value: statsData?.free_users || 0,
                icon: FiUsers,
                color: "gray",
              },
            ].map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`w-12 h-12 bg-${activity.color}-100 rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <Icon className={`w-6 h-6 text-${activity.color}-600`} />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{activity.value}</p>
                  <p className="text-sm text-gray-600">{activity.title}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Users Section */}
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all duration-300"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-3 rounded-xl hover:bg-blue-200 transition-colors">
                  <FiFilter />
                  Filter
                </button>
                <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition-colors">
                  <FiDownload />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/80">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Requests
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50">
                  {usersData?.map((user: AdminUser) => (
                    <tr key={user.email} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold">
                              {user.email.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.email}</div>
                            <div className="text-sm text-gray-500">User</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          user.plan_type === "premium" 
                            ? "bg-purple-100 text-purple-800"
                            : user.plan_type === "pro"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {user.plan_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          user.subscription_status === "active"
                            ? "bg-green-100 text-green-800"
                            : user.subscription_status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {user.subscription_status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.total_requests}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(user.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUserPlanUpdate(user.email, user.plan_type, user.subscription_status)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Update user plan"
                          >
                            <FiUserCheck className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

                  {/* Pagination */}
        {usersData && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {((currentPage - 1) * 20) + 1} to {currentPage * 20} of {usersData.length} users
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={usersData.length < 20}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
    </AdminLayout>
  );
} 