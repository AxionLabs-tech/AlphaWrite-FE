"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAdmin, getAdminUser } from "../../utils/adminAuth";
import AdminLayout from "../../components/AdminLayout";
import AnalyticsWidget from "../../components/AnalyticsWidget";
import AnalyticsChart from "../../components/AnalyticsChart";
import { generateMockAnalyticsData } from "../../utils/mockAnalyticsData";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FiTrendingUp,
  FiUsers,
  FiDollarSign,
  FiActivity,
  FiRefreshCw,
  FiBarChart,
} from "react-icons/fi";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function AdminAnalytics() {
  const router = useRouter();
  const [period, setPeriod] = useState("30d");
  const [activeTab, setActiveTab] = useState("overview");

  // Admin authentication check
  useEffect(() => {
    if (!isAdmin()) {
      router.push("/admin/login");
      return;
    }
  }, [router]);

  const adminUser = getAdminUser();

  // Generate mock data directly
  const analyticsData = generateMockAnalyticsData(period);
  const isLoading = false;
  
  const refetch = () => {
    // Mock refetch function
    window.location.reload();
  };

  // Loading state
  if (!adminUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ color: string; name: string; value: number }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{formatDate(label || '')}</p>
          {payload.map((entry: { color: string; name: string; value: number }, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };



  return (
    <AdminLayout title="Analytics Dashboard" subtitle="Comprehensive insights and metrics">
      <div className="space-y-8">
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === "overview"
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FiBarChart className="inline mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === "users"
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FiUsers className="inline mr-2" />
              Users
            </button>
            <button
              onClick={() => setActiveTab("revenue")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === "revenue"
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FiDollarSign className="inline mr-2" />
              Revenue
            </button>
            <button
              onClick={() => setActiveTab("usage")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === "usage"
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FiActivity className="inline mr-2" />
              Usage
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button
              onClick={() => refetch()}
              className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <FiRefreshCw className="text-lg" />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Key Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <AnalyticsWidget
                    title="Total Users"
                    value={analyticsData.user_growth[analyticsData.user_growth.length - 1]?.users || 0}
                    change="+12%"
                    changeType="positive"
                    icon={FiUsers}
                    iconColor="blue"
                  />
                  <AnalyticsWidget
                    title="Total Revenue"
                    value={formatCurrency(analyticsData.revenue_data.reduce((sum, item) => sum + item.revenue, 0))}
                    change="+8%"
                    changeType="positive"
                    icon={FiDollarSign}
                    iconColor="green"
                  />
                  <AnalyticsWidget
                    title="Total Requests"
                    value={analyticsData.usage_data.reduce((sum, item) => sum + item.requests, 0).toLocaleString()}
                    change="+15%"
                    changeType="positive"
                    icon={FiActivity}
                    iconColor="purple"
                  />
                  <AnalyticsWidget
                    title="Active Subscriptions"
                    value={analyticsData.revenue_data.reduce((sum, item) => sum + item.subscriptions, 0)}
                    change="+5%"
                    changeType="positive"
                    icon={FiTrendingUp}
                    iconColor="orange"
                  />
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* User Growth Chart */}
                  <AnalyticsChart title="User Growth">
                    <AreaChart data={analyticsData?.user_growth || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={formatDate} />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="users"
                        stackId="1"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="new_users"
                        stackId="2"
                        stroke="#10B981"
                        fill="#10B981"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </AnalyticsChart>

                  {/* Revenue Chart */}
                  <AnalyticsChart title="Revenue Trend">
                    <LineChart data={analyticsData?.revenue_data || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={formatDate} />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </AnalyticsChart>
                </div>

                {/* Plan Distribution */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <AnalyticsChart title="Plan Distribution">
                    <PieChart>
                                              <Pie
                          data={analyticsData?.plan_distribution || []}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="users"
                        >
                        {analyticsData?.plan_distribution?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </AnalyticsChart>

                  <AnalyticsChart title="Subscription Status">
                    <BarChart data={analyticsData?.subscription_status || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="status" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3B82F6" />
                    </BarChart>
                  </AnalyticsChart>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === "users" && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth Over Time</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={analyticsData?.user_growth || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={formatDate} />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="users"
                        stackId="1"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.6}
                        name="Total Users"
                      />
                      <Area
                        type="monotone"
                        dataKey="new_users"
                        stackId="2"
                        stroke="#10B981"
                        fill="#10B981"
                        fillOpacity={0.6}
                        name="New Users"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Top Users Table */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Active Users</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Plan
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Requests
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Last Activity
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {analyticsData?.top_users?.map((user, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                user.plan_type === 'premium' ? 'bg-purple-100 text-purple-800' :
                                user.plan_type === 'pro' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {user.plan_type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.requests.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(user.last_activity)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Revenue Tab */}
            {activeTab === "revenue" && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={analyticsData?.revenue_data || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={formatDate} />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                        name="Revenue"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscriptions Over Time</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={analyticsData?.revenue_data || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={formatDate} />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="subscriptions" fill="#8B5CF6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Summary</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                        <span className="text-green-800 font-medium">Total Revenue</span>
                        <span className="text-green-800 font-bold">
                          {formatCurrency(analyticsData?.revenue_data?.reduce((sum, item) => sum + item.revenue, 0) || 0)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                        <span className="text-blue-800 font-medium">Total Subscriptions</span>
                        <span className="text-blue-800 font-bold">
                          {analyticsData?.revenue_data?.reduce((sum, item) => sum + item.subscriptions, 0) || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                        <span className="text-purple-800 font-medium">Average Revenue per Day</span>
                        <span className="text-purple-800 font-bold">
                          {formatCurrency((analyticsData?.revenue_data?.reduce((sum, item) => sum + item.revenue, 0) || 0) / (analyticsData?.revenue_data?.length || 1))}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Usage Tab */}
            {activeTab === "usage" && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Analytics</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={analyticsData?.usage_data || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={formatDate} />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="requests"
                        stroke="#3B82F6"
                        strokeWidth={3}
                        dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                        name="Requests"
                      />
                      <Line
                        type="monotone"
                        dataKey="humanized_texts"
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                        name="Humanized Texts"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Summary</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                        <span className="text-blue-800 font-medium">Total Requests</span>
                        <span className="text-blue-800 font-bold">
                          {analyticsData?.usage_data?.reduce((sum, item) => sum + item.requests, 0).toLocaleString() || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                        <span className="text-green-800 font-medium">Total Humanized Texts</span>
                        <span className="text-green-800 font-bold">
                          {analyticsData?.usage_data?.reduce((sum, item) => sum + item.humanized_texts, 0).toLocaleString() || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                        <span className="text-purple-800 font-medium">Average Requests per Day</span>
                        <span className="text-purple-800 font-bold">
                          {Math.round((analyticsData?.usage_data?.reduce((sum, item) => sum + item.requests, 0) || 0) / (analyticsData?.usage_data?.length || 1)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={analyticsData?.usage_data?.slice(-7) || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={formatDate} />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="requests" fill="#3B82F6" name="Requests" />
                        <Bar dataKey="humanized_texts" fill="#10B981" name="Humanized Texts" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
}
