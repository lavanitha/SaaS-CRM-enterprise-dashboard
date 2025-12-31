import React, { useState, useEffect } from 'react';
import { FiPlus, FiSearch, FiMail, FiPhone, FiUser, FiEdit, FiTrash2 } from 'react-icons/fi';
import MainLayout from "../components/layout/MainLayout";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Badge from "../components/ui/Badge";
import Modal from "../components/ui/Modal";
import StatCard from "../components/ui/StatCard";
import { getCompanyUsers } from '../api/userApi';

const Team = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration
      setUsers([
        {
          _id: '1',
          name: 'John Doe',
          email: 'john.doe@company.com',
          phone: '+1234567890',
          role: 'admin',
          status: 'active',
          lastActive: new Date().toISOString(),
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          name: 'Jane Smith',
          email: 'jane.smith@company.com',
          phone: '+1234567891',
          role: 'user',
          status: 'active',
          lastActive: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          createdAt: new Date().toISOString()
        },
        {
          _id: '3',
          name: 'Mike Johnson',
          email: 'mike.johnson@company.com',
          phone: '+1234567892',
          role: 'user',
          status: 'active',
          lastActive: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          createdAt: new Date().toISOString()
        },
        {
          _id: '4',
          name: 'Sarah Wilson',
          email: 'sarah.wilson@company.com',
          role: 'user',
          status: 'inactive',
          lastActive: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
          createdAt: new Date().toISOString()
        },
        {
          _id: '5',
          name: 'David Brown',
          email: 'david.brown@company.com',
          phone: '+1234567893',
          role: 'admin',
          status: 'active',
          lastActive: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
          createdAt: new Date().toISOString()
        }
      ]);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate stats
  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    admins: users.filter(u => u.role === 'admin').length,
    regularUsers: users.filter(u => u.role === 'user').length
  };

  const getRoleBadgeVariant = (role) => {
    return role === 'admin' ? 'danger' : 'primary';
  };

  const getStatusBadgeVariant = (status) => {
    return status === 'active' ? 'success' : 'secondary';
  };

  const formatLastActive = (lastActive) => {
    const now = new Date();
    const last = new Date(lastActive);
    const diffMs = now.getTime() - last.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) {
      return 'Just now';
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else {
      return last.toLocaleDateString();
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Team Management</h1>
            <p className="text-white/60">Manage team members and their roles.</p>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            icon={<FiPlus />}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Add Team Member
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={FiUser}
          />
          <StatCard
            title="Active Users"
            value={stats.activeUsers}
            icon={FiUser}
          />
          <StatCard
            title="Admins"
            value={stats.admins}
            icon={FiUser}
          />
          <StatCard
            title="Team Members"
            value={stats.regularUsers}
            icon={FiUser}
          />
        </div>

        {/* Search */}
        <GlassCard className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<FiSearch />}
              />
            </div>
          </div>
        </GlassCard>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <GlassCard 
              key={user._id} 
              className="p-6 transition-all duration-300 cursor-pointer hover:scale-105"
              onClick={() => handleUserClick(user)}
            >
              {/* User Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
                  <FiUser className="text-white text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg">{user.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={getRoleBadgeVariant(user.role)} size="sm">
                      {user.role}
                    </Badge>
                    <Badge variant={getStatusBadgeVariant(user.status)} size="sm">
                      {user.status}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-white/60">
                  <FiMail className="w-4 h-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-2 text-white/60">
                    <FiPhone className="w-4 h-4" />
                    <span className="text-sm">{user.phone}</span>
                  </div>
                )}
              </div>

              {/* Metadata */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/40">Last active</span>
                <span className="text-white/70">{formatLastActive(user.lastActive)}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-all duration-300">
                  <FiEdit className="w-4 h-4" />
                  <span className="text-sm">Edit</span>
                </button>
                <button className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all duration-300">
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <GlassCard className="p-12 text-center">
            <FiUser className="w-12 h-12 text-white/40 mx-auto mb-4" />
            <h3 className="text-white text-lg font-medium mb-2">No team members found</h3>
            <p className="text-white/60">
              {searchTerm 
                ? 'Try adjusting your search' 
                : 'Add your first team member to get started'
              }
            </p>
          </GlassCard>
        )}

        {/* Create User Modal */}
        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="Add Team Member"
          size="lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                placeholder="Enter first name"
                required
              />
              <Input
                label="Last Name"
                placeholder="Enter last name"
                required
              />
            </div>
            <Input
              label="Email"
              type="email"
              placeholder="Enter email address"
              required
            />
            <Input
              label="Phone"
              placeholder="Enter phone number"
            />
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Role
              </label>
              <select className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="user">Team Member</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
            <Input
              label="Temporary Password"
              type="password"
              placeholder="Enter temporary password"
              required
            />
            <div className="flex items-center justify-end gap-4 pt-4">
              <Button
                variant="secondary"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </Button>
              <Button>
                Add Team Member
              </Button>
            </div>
          </div>
        </Modal>

        {/* User Details Modal */}
        <Modal
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          title="Team Member Details"
          size="lg"
        >
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
                  <FiUser className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{selectedUser.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={getRoleBadgeVariant(selectedUser.role)}>
                      {selectedUser.role}
                    </Badge>
                    <Badge variant={getStatusBadgeVariant(selectedUser.status)}>
                      {selectedUser.status}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/60 text-sm">Email</label>
                  <p className="text-white font-medium">{selectedUser.email}</p>
                </div>
                <div>
                  <label className="text-white/60 text-sm">Phone</label>
                  <p className="text-white font-medium">{selectedUser.phone || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-white/60 text-sm">Role</label>
                  <p className="text-white font-medium capitalize">{selectedUser.role}</p>
                </div>
                <div>
                  <label className="text-white/60 text-sm">Status</label>
                  <p className="text-white font-medium capitalize">{selectedUser.status}</p>
                </div>
                <div>
                  <label className="text-white/60 text-sm">Last Active</label>
                  <p className="text-white font-medium">{formatLastActive(selectedUser.lastActive)}</p>
                </div>
                <div>
                  <label className="text-white/60 text-sm">Joined</label>
                  <p className="text-white font-medium">
                    {new Date(selectedUser.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-end gap-4 pt-4">
                <Button
                  variant="secondary"
                  onClick={() => setSelectedUser(null)}
                >
                  Close
                </Button>
                <Button icon={<FiEdit />}>
                  Edit Member
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </MainLayout>
  );
};

export default Team;
