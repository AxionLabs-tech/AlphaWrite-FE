"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAdmin } from "../../utils/adminAuth";
import { useGetAdminUsersQuery, useUpdateUserPlanMutation, useSendBulkEmailMutation } from "../../slices/adminApiSlice";
import type { AdminUser } from "../../slices/adminApiSlice";
import AdminLayout from "../../components/AdminLayout";
import { FiSearch, FiFilter, FiDownload, FiUserCheck } from "react-icons/fi";

export default function AdminUsersPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showBulkEmail, setShowBulkEmail] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [bulkEmailStatus, setBulkEmailStatus] = useState<string | null>(null);

  // Admin authentication check
  useEffect(() => {
    if (!isAdmin()) {
      router.push("/admin/login");
      return;
    }
  }, [router]);

  const { data: usersData } = useGetAdminUsersQuery({
    skip: (currentPage - 1) * 20,
    limit: 20,
  });
  // const { data: allUsersData } = useGetAllUsersQuery(); // Uncomment if you want to use all users data
  const [sendBulkEmail, { isLoading: isBulkEmailLoading }] = useSendBulkEmailMutation();
  const [updateUserPlan] = useUpdateUserPlanMutation();

  const handleUserPlanUpdate = async (userEmail: string, planType: string, subscriptionStatus: string) => {
    try {
      await updateUserPlan({ user_email: userEmail, plan_type: planType, subscription_status: subscriptionStatus }).unwrap();
    } catch (error) {
      console.error("Failed to update user plan:", error);
    }
  };

  const handleSendBulkEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setBulkEmailStatus(null);
    try {
      const res = await sendBulkEmail({ subject: emailSubject, body: emailBody }).unwrap();
      setBulkEmailStatus(res.message);
      setEmailSubject("");
      setEmailBody("");
      setShowBulkEmail(false);
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'data' in err && typeof (err as { data?: { detail?: string } }).data?.detail === 'string') {
        setBulkEmailStatus((err as { data: { detail: string } }).data.detail);
      } else {
        setBulkEmailStatus("Failed to send bulk email.");
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <AdminLayout title="User Management" subtitle="Manage your application users">
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

        {/* Bulk Email Button */}
        <div className="flex justify-end">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            onClick={() => setShowBulkEmail(true)}
          >
            Send Bulk Email
          </button>
        </div>

        {/* Bulk Email Modal */}
        {showBulkEmail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Send Bulk Email</h2>
              <form onSubmit={handleSendBulkEmail} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Subject</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={emailSubject}
                    onChange={e => setEmailSubject(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Body</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-[100px]"
                    value={emailBody}
                    onChange={e => setEmailBody(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                    onClick={() => setShowBulkEmail(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
                    disabled={isBulkEmailLoading}
                  >
                    {isBulkEmailLoading ? "Sending..." : "Send"}
                  </button>
                </div>
                {bulkEmailStatus && (
                  <div className="mt-2 text-sm text-center text-blue-700">{bulkEmailStatus}</div>
                )}
              </form>
            </div>
          </div>
        )}

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
    </AdminLayout>
  );
} 