import React, { useState, useEffect } from 'react';
import { 
  FiTarget, 
  FiBriefcase, 
  FiCheckSquare, 
  FiUsers,
  FiTrendingUp,
  FiArrowUpRight,
  FiArrowDownRight
} from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import MainLayout from "../components/layout/MainLayout";
import GlassCard from "../components/ui/GlassCard";
import StatCard from "../components/ui/StatCard";
import Badge from "../components/ui/Badge";
import { getDashboardStats } from '../api/dashboardApi';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalLeads: 0,
    activeCases: 0,
    completedTasks: 0,
    teamMembers: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await getDashboardStats();
        setStats(response);
      } catch (error) {
        console.error('❌ Error fetching dashboard data:', error);
        // Set default stats to 0 when API fails
        setStats({
          totalLeads: 0,
          activeCases: 0,
          completedTasks: 0,
          teamMembers: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Empty chart data - will be populated from API
  const [chartData, setChartData] = useState({
    leadConversionData: [],
    monthlyData: [],
    recentActivities: []
  });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        // TODO: Implement API calls for chart data
        // For now, keep empty until API is ready
        setChartData({
          leadConversionData: [],
          monthlyData: [],
          recentActivities: []
        });
      } catch (error) {
        console.error('❌ Error fetching chart data:', error);
        setChartData({
          leadConversionData: [],
          monthlyData: [],
          recentActivities: []
        });
      }
    };

    fetchChartData();
  }, []);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-white/60">Welcome back! Here's what's happening today.</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="success" size="sm">
              <FiTrendingUp className="w-3 h-3 mr-1" />
              +12% from last month
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Leads"
            value={stats.totalLeads}
            change="+12% this month"
            changeType="positive"
            icon={FiTarget}
          />
          <StatCard
            title="Active Cases"
            value={stats.activeCases}
            change="+8% this week"
            changeType="positive"
            icon={FiBriefcase}
          />
          <StatCard
            title="Completed Tasks"
            value={stats.completedTasks}
            change="+15% this week"
            changeType="positive"
            icon={FiCheckSquare}
          />
          <StatCard
            title="Team Members"
            value={stats.teamMembers}
            change="+2 new this month"
            changeType="positive"
            icon={FiUsers}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Performance */}
          <GlassCard className="p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Monthly Performance</h3>
            {chartData.monthlyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" />
                  <Tooltip 
                    contentStyle={{
                      background: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="leads" fill="#60A5FA" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="cases" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="tasks" fill="#1D4ED8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-white/40">
                <p>No chart data available</p>
              </div>
            )}
          </GlassCard>

          {/* Lead Status Distribution */}
          <GlassCard className="p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Lead Status Distribution</h3>
            {chartData.leadConversionData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData.leadConversionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.leadConversionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        background: 'rgba(0,0,0,0.8)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-2 mt-4">
                  {chartData.leadConversionData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-white/70 text-sm">{item.name}: {item.value}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-white/40">
                <p>No distribution data available</p>
              </div>
            )}
          </GlassCard>
        </div>

        {/* Recent Activity */}
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
          {chartData.recentActivities.length > 0 ? (
            <div className="space-y-4">
              {chartData.recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className={`w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center ${activity.color}`}>
                      <Icon className="text-lg" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{activity.title}</h4>
                      <p className="text-white/60 text-sm">{activity.description}</p>
                    </div>
                    <span className="text-white/40 text-sm">{activity.time}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-8 text-center text-white/40">
              <p>No recent activity available</p>
            </div>
          )}
        </GlassCard>

        {/* Quick Actions */}
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-all duration-300 group">
              <FiTarget className="text-blue-300 text-2xl mb-2 group-hover:scale-110 transition-transform" />
              <h4 className="text-white font-medium">Add New Lead</h4>
              <p className="text-white/60 text-sm">Create a new lead</p>
            </button>
            <button className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-all duration-300 group">
              <FiBriefcase className="text-green-300 text-2xl mb-2 group-hover:scale-110 transition-transform" />
              <h4 className="text-white font-medium">Create Case</h4>
              <p className="text-white/60 text-sm">Open a new case</p>
            </button>
            <button className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg hover:bg-yellow-500/30 transition-all duration-300 group">
              <FiCheckSquare className="text-yellow-300 text-2xl mb-2 group-hover:scale-110 transition-transform" />
              <h4 className="text-white font-medium">Add Task</h4>
              <p className="text-white/60 text-sm">Create a new task</p>
            </button>
          </div>
        </GlassCard>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
