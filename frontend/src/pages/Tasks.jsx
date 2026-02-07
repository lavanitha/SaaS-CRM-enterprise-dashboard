import React, { useState, useEffect } from 'react';
import { FiPlus, FiSearch, FiFilter, FiCheckCircle, FiClock, FiUser } from 'react-icons/fi';
import MainLayout from "../components/layout/MainLayout";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Badge from "../components/ui/Badge";
import Modal from "../components/ui/Modal";
import StatCard from "../components/ui/StatCard";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration
      setTasks([
        {
          _id: '1',
          title: 'Follow up with client',
          description: 'Call John Smith to discuss project requirements',
          status: 'pending',
          assignedTo: 'John Doe',
          case: 'Website Performance Issue',
          dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          title: 'Review API documentation',
          description: 'Update integration documentation for new endpoints',
          status: 'completed',
          assignedTo: 'Jane Smith',
          case: 'API Integration Problem',
          dueDate: new Date().toISOString(),
          completedAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
          createdAt: new Date().toISOString()
        },
        {
          _id: '3',
          title: 'Test database performance',
          description: 'Run performance tests on new database schema',
          status: 'pending',
          assignedTo: 'Mike Johnson',
          case: 'Database Connection Timeout',
          dueDate: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
          createdAt: new Date().toISOString()
        },
        {
          _id: '4',
          title: 'Update user documentation',
          description: 'Create user guide for new authentication features',
          status: 'pending',
          assignedTo: 'Sarah Wilson',
          case: 'User Authentication Bug',
          dueDate: new Date(Date.now() + 259200000).toISOString(), // 3 days from now
          createdAt: new Date().toISOString()
        }
      ]);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskToggle = async (taskId) => {
    try {
      setTasks(prev => prev.map(task => 
        task._id === taskId 
          ? { 
              ...task, 
              status: task.status === 'completed' ? 'pending' : 'completed',
              completedAt: task.status === 'completed' ? null : new Date().toISOString()
            } 
          : task
      ));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || task.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  // Calculate stats
  const stats = {
    totalTasks: tasks.length,
    pendingTasks: tasks.filter(t => t.status === 'pending').length,
    completedTasks: tasks.filter(t => t.status === 'completed').length,
    overdueTasks: tasks.filter(t => 
      t.status === 'pending' && new Date(t.dueDate) < new Date()
    ).length
  };

  const isOverdue = (task) => {
    return task.status === 'pending' && new Date(task.dueDate) < new Date();
  };

  const isDueSoon = (task) => {
    if (task.status === 'completed') return false;
    const dueDate = new Date(task.dueDate);
    const now = new Date();
    const timeDiff = dueDate.getTime() - now.getTime();
    return timeDiff > 0 && timeDiff < 24 * 60 * 60 * 1000; // Less than 24 hours
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Tasks Management</h1>
            <p className="text-white/60">Manage and track tasks for cases and projects.</p>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            icon={<FiPlus />}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Add Task
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Total Tasks"
            value={stats.totalTasks}
            icon={FiCheckCircle}
          />
          <StatCard
            title="Pending Tasks"
            value={stats.pendingTasks}
            icon={FiClock}
          />
          <StatCard
            title="Completed Tasks"
            value={stats.completedTasks}
            icon={FiCheckCircle}
          />
          <StatCard
            title="Overdue Tasks"
            value={stats.overdueTasks}
            icon={FiClock}
          />
        </div>

        {/* Search and Filters */}
        <GlassCard className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<FiSearch />}
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            <Button variant="outline" icon={<FiFilter />}>
              More Filters
            </Button>
          </div>
        </GlassCard>

        {/* Tasks List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredTasks.map((task) => (
            <GlassCard 
              key={task._id} 
              className={`p-6 transition-all duration-300 cursor-pointer hover:scale-105 ${
                task.status === 'completed' ? 'opacity-75' : ''
              } ${isOverdue(task) ? 'border-red-500/50' : ''} ${isDueSoon(task) ? 'border-yellow-500/50' : ''}`}
              onClick={() => handleTaskClick(task)}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTaskToggle(task._id);
                  }}
                  className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    task.status === 'completed'
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-white/30 hover:border-white/50'
                  }`}
                >
                  {task.status === 'completed' && (
                    <FiCheckCircle className="w-3 h-3" />
                  )}
                </button>

                {/* Task Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`font-semibold ${task.status === 'completed' ? 'line-through text-white/60' : 'text-white'}`}>
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      {isOverdue(task) && (
                        <Badge variant="danger" size="sm">Overdue</Badge>
                      )}
                      {isDueSoon(task) && !isOverdue(task) && (
                        <Badge variant="warning" size="sm">Due Soon</Badge>
                      )}
                      <Badge variant={task.status === 'completed' ? 'success' : 'primary'} size="sm">
                        {task.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className={`text-sm mb-3 ${task.status === 'completed' ? 'text-white/50' : 'text-white/70'}`}>
                    {task.description}
                  </p>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2 text-white/60">
                      <FiUser className="w-4 h-4" />
                      <span>{task.assignedTo}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <FiClock className="w-4 h-4" />
                      <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="text-white/60">
                      Case: {task.case}
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
          
          {filteredTasks.length === 0 && (
            <GlassCard className="p-12 text-center">
              <FiCheckCircle className="w-12 h-12 text-white/40 mx-auto mb-4" />
              <h3 className="text-white text-lg font-medium mb-2">No tasks found</h3>
              <p className="text-white/60">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'Create your first task to get started'
                }
              </p>
            </GlassCard>
          )}
        </div>

        {/* Create Task Modal */}
        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="Create New Task"
          size="lg"
        >
          <div className="space-y-4">
            <Input
              label="Title"
              placeholder="Enter task title"
              required
            />
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Description
              </label>
              <textarea
                placeholder="Enter task description"
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 h-32 resize-none"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Assigned To
                </label>
                <select className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select User</option>
                  <option value="john">John Doe</option>
                  <option value="jane">Jane Smith</option>
                  <option value="mike">Mike Johnson</option>
                  <option value="sarah">Sarah Wilson</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Related Case
              </label>
              <select className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Case</option>
                <option value="website">Website Performance Issue</option>
                <option value="api">API Integration Problem</option>
                <option value="database">Database Connection Timeout</option>
                <option value="auth">User Authentication Bug</option>
              </select>
            </div>
            <div className="flex items-center justify-end gap-4 pt-4">
              <Button
                variant="secondary"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </Button>
              <Button>
                Create Task
              </Button>
            </div>
          </div>
        </Modal>

        {/* Task Details Modal */}
        <Modal
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          title="Task Details"
          size="lg"
        >
          {selectedTask && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{selectedTask.title}</h3>
                <p className="text-white/70">{selectedTask.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/60 text-sm">Status</label>
                  <Badge variant={selectedTask.status === 'completed' ? 'success' : 'primary'}>
                    {selectedTask.status}
                  </Badge>
                </div>
                <div>
                  <label className="text-white/60 text-sm">Assigned To</label>
                  <p className="text-white font-medium">{selectedTask.assignedTo}</p>
                </div>
                <div>
                  <label className="text-white/60 text-sm">Due Date</label>
                  <p className="text-white font-medium">
                    {new Date(selectedTask.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-white/60 text-sm">Related Case</label>
                  <p className="text-white font-medium">{selectedTask.case}</p>
                </div>
                <div>
                  <label className="text-white/60 text-sm">Created</label>
                  <p className="text-white font-medium">
                    {new Date(selectedTask.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {selectedTask.completedAt && (
                  <div>
                    <label className="text-white/60 text-sm">Completed</label>
                    <p className="text-white font-medium">
                      {new Date(selectedTask.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-end gap-4 pt-4">
                <Button
                  variant="secondary"
                  onClick={() => setSelectedTask(null)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => handleTaskToggle(selectedTask._id)}
                  variant={selectedTask.status === 'completed' ? 'secondary' : 'success'}
                >
                  {selectedTask.status === 'completed' ? 'Mark as Pending' : 'Mark as Completed'}
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </MainLayout>
  );
};

export default Tasks;
