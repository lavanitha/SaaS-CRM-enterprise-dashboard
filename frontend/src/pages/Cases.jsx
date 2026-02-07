import React, { useState, useEffect } from 'react';
import { FiPlus, FiSearch, FiFilter, FiAlertCircle } from 'react-icons/fi';
import MainLayout from "../components/layout/MainLayout";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Badge from "../components/ui/Badge";
import KanbanBoard from "../components/ui/KanbanBoard";
import Modal from "../components/ui/Modal";
import StatCard from "../components/ui/StatCard";
import { FiBriefcase, FiClock, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';
import { getCases, updateCaseStatus } from '../api/caseApi';

const Cases = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);

  // Case statuses for Kanban columns
  const caseStatuses = [
    { id: 'open', title: 'Open', color: 'blue', icon: FiAlertCircle },
    { id: 'allocation', title: 'Allocation', color: 'yellow', icon: FiBriefcase },
    { id: 'identification', title: 'Identification', color: 'orange', icon: FiAlertCircle },
    { id: 'resolution', title: 'Resolution', color: 'green', icon: FiClock },
    { id: 'closed', title: 'Closed', color: 'gray', icon: FiCheckCircle }
  ];

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      setLoading(true);
      const response = await getCases();
      setCases(response);
    } catch (error) {
      console.error('❌ Error fetching cases:', error);
      setCases([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCardMove = async (caseId, newStatus) => {
    try {
      setCases(prev => prev.map(caseItem => 
        caseItem._id === caseId ? { ...caseItem, status: newStatus } : caseItem
      ));
    } catch (error) {
      console.error('❌ Error updating case:', error);
    }
  };

  const handleCardClick = (caseItem) => {
    setSelectedCase(caseItem);
  };

  const filteredCases = cases.filter(caseItem => 
    caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caseItem.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredColumns = caseStatuses.map(status => ({
    ...status,
    cards: filteredCases.filter(caseItem => caseItem.status === status.id),
    addButton: true
  }));

  // Calculate stats
  const stats = {
    totalCases: cases.length,
    activeCases: cases.filter(c => c.status !== 'closed').length,
    highPriority: cases.filter(c => c.priority === 'high').length,
    resolvedToday: cases.filter(c => 
      c.status === 'closed' && 
      new Date(c.updatedAt || c.createdAt).toDateString() === new Date().toDateString()
    ).length
  };

  const renderCaseCard = (caseItem) => (
    <GlassCard className="p-4 hover:scale-105 transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="text-white font-semibold text-sm group-hover:text-blue-300 transition-colors">
            {caseItem.title}
          </h4>
          <p className="text-white/60 text-xs mt-1 line-clamp-2">
            {caseItem.description}
          </p>
        </div>
        <Badge 
          variant={caseItem.priority === 'high' ? 'danger' : 
                   caseItem.priority === 'medium' ? 'warning' : 'secondary'} 
          size="sm"
        >
          {caseItem.priority}
        </Badge>
      </div>

      {/* Metadata */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/40">Assigned to</span>
          <span className="text-white/70">{caseItem.assignedTo || 'Unassigned'}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/40">Created</span>
          <span className="text-white/70">
            {new Date(caseItem.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </GlassCard>
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Cases Management</h1>
            <p className="text-white/60">Track and manage support cases through resolution.</p>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            icon={<FiPlus />}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Create Case
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Total Cases"
            value={stats.totalCases}
            icon={FiBriefcase}
          />
          <StatCard
            title="Active Cases"
            value={stats.activeCases}
            icon={FiClock}
          />
          <StatCard
            title="High Priority"
            value={stats.highPriority}
            icon={FiAlertTriangle}
          />
          <StatCard
            title="Resolved Today"
            value={stats.resolvedToday}
            icon={FiCheckCircle}
          />
        </div>

        {/* Search and Filters */}
        <GlassCard className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search cases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<FiSearch />}
              />
            </div>
            <Button variant="outline" icon={<FiFilter />}>
              Filters
            </Button>
          </div>
        </GlassCard>

        {/* Kanban Board */}
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Case Pipeline</h3>
          <KanbanBoard
            columns={filteredColumns}
            onCardMove={handleCardMove}
            onCardClick={handleCardClick}
            renderCard={renderCaseCard}
            className="min-h-[600px]"
          />
        </GlassCard>

        {/* Create Case Modal */}
        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="Create New Case"
          size="lg"
        >
          <div className="space-y-4">
            <Input
              label="Title"
              placeholder="Enter case title"
              required
            />
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Description
              </label>
              <textarea
                placeholder="Enter case description"
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 h-32 resize-none"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Priority
                </label>
                <select className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Assigned To
                </label>
                <select className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select User</option>
                  <option value="john">John Doe</option>
                  <option value="jane">Jane Smith</option>
                  <option value="mike">Mike Johnson</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-4 pt-4">
              <Button
                variant="secondary"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </Button>
              <Button>
                Create Case
              </Button>
            </div>
          </div>
        </Modal>

        {/* Case Details Modal */}
        <Modal
          isOpen={!!selectedCase}
          onClose={() => setSelectedCase(null)}
          title="Case Details"
          size="lg"
        >
          {selectedCase && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{selectedCase.title}</h3>
                <p className="text-white/70">{selectedCase.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/60 text-sm">Status</label>
                  <Badge variant={
                    selectedCase.status === 'allocation' ? 'primary' :
                    selectedCase.status === 'identification' ? 'warning' :
                    selectedCase.status === 'resolution' ? 'info' : 'success'
                  }>
                    {selectedCase.status}
                  </Badge>
                </div>
                <div>
                  <label className="text-white/60 text-sm">Priority</label>
                  <Badge variant={
                    selectedCase.priority === 'high' ? 'danger' :
                    selectedCase.priority === 'medium' ? 'warning' : 'secondary'
                  }>
                    {selectedCase.priority}
                  </Badge>
                </div>
                <div>
                  <label className="text-white/60 text-sm">Assigned To</label>
                  <p className="text-white font-medium">{selectedCase.assignedTo || 'Unassigned'}</p>
                </div>
                <div>
                  <label className="text-white/60 text-sm">Created By</label>
                  <p className="text-white font-medium">{selectedCase.createdBy}</p>
                </div>
                <div>
                  <label className="text-white/60 text-sm">Created</label>
                  <p className="text-white font-medium">
                    {new Date(selectedCase.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-white/60 text-sm">Last Updated</label>
                  <p className="text-white font-medium">
                    {new Date(selectedCase.updatedAt || selectedCase.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-end gap-4 pt-4">
                <Button
                  variant="secondary"
                  onClick={() => setSelectedCase(null)}
                >
                  Close
                </Button>
                <Button>
                  Edit Case
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </MainLayout>
  );
};

export default Cases;
