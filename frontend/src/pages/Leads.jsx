import React, { useState, useEffect } from 'react';
import { FiPlus, FiSearch, FiFilter } from 'react-icons/fi';
import MainLayout from "../components/layout/MainLayout";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Badge from "../components/ui/Badge";
import KanbanBoard from "../components/ui/KanbanBoard";
import LeadCard from "../components/ui/LeadCard";
import Modal from "../components/ui/Modal";
import { getLeads, updateLead, createLead } from '../api/leadApi';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  // Lead statuses for Kanban columns
  const leadStatuses = [
    { id: 'new', title: 'New', color: 'blue' },
    { id: 'contacted', title: 'Contacted', color: 'cyan' },
    { id: 'qualified', title: 'Qualified', color: 'green' },
    { id: 'lost', title: 'Lost', color: 'red' }
  ];

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await getLeads();
      setLeads(response.leads || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
      // Mock data for demonstration
      setLeads([
        {
          _id: '1',
          name: 'John Smith',
          email: 'john@example.com',
          phone: '+1234567890',
          status: 'new',
          company: 'Tech Corp',
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          name: 'Sarah Johnson',
          email: 'sarah@company.com',
          phone: '+1234567891',
          status: 'contacted',
          company: 'Design Studio',
          createdAt: new Date().toISOString()
        },
        {
          _id: '3',
          name: 'Mike Davis',
          email: 'mike@startup.io',
          status: 'qualified',
          company: 'Startup Inc',
          createdAt: new Date().toISOString()
        },
        {
          _id: '4',
          name: 'Lisa Wilson',
          email: 'lisa@enterprise.com',
          status: 'lost',
          company: 'Enterprise Ltd',
          createdAt: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Group leads by status for Kanban columns
  const columns = leadStatuses.map(status => ({
    ...status,
    cards: leads.filter(lead => lead.status === status.id)
  }));

  const handleCardMove = async (leadId, newStatus) => {
    try {
      const updatedLead = await updateLead(leadId, { status: newStatus });
      setLeads(prev => prev.map(lead => 
        lead._id === leadId ? { ...lead, status: newStatus } : lead
      ));
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  const handleCardClick = (lead) => {
    setSelectedLead(lead);
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredColumns = leadStatuses.map(status => ({
    ...status,
    cards: filteredLeads.filter(lead => lead.status === status.id)
  }));

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Leads Management</h1>
            <p className="text-white/60">Track and manage your sales leads through the pipeline.</p>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            icon={<FiPlus />}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Add Lead
          </Button>
        </div>

        {/* Search and Filters */}
        <GlassCard className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search leads..."
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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {leadStatuses.map((status) => {
            const count = leads.filter(lead => lead.status === status.id).length;
            return (
              <GlassCard key={status.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm">{status.title}</p>
                    <p className="text-white text-2xl font-bold">{count}</p>
                  </div>
                  <Badge variant={status.color === 'blue' ? 'primary' : 
                                status.color === 'cyan' ? 'info' :
                                status.color === 'green' ? 'success' : 'danger'}>
                    {count}
                  </Badge>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Kanban Board */}
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Lead Pipeline</h3>
          <KanbanBoard
            columns={filteredColumns}
            onCardMove={handleCardMove}
            onCardClick={handleCardClick}
            renderCard={(lead) => <LeadCard lead={lead} />}
            className="min-h-[600px]"
          />
        </GlassCard>

        {/* Create Lead Modal */}
        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="Add New Lead"
          size="lg"
        >
          <div className="space-y-4">
            <Input
              label="Name"
              placeholder="Enter lead name"
              required
            />
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
            <Input
              label="Company"
              placeholder="Enter company name"
            />
            <div className="flex items-center justify-end gap-4 pt-4">
              <Button
                variant="secondary"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </Button>
              <Button>
                Create Lead
              </Button>
            </div>
          </div>
        </Modal>

        {/* Lead Details Modal */}
        <Modal
          isOpen={!!selectedLead}
          onClose={() => setSelectedLead(null)}
          title="Lead Details"
          size="lg"
        >
          {selectedLead && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/60 text-sm">Name</label>
                  <p className="text-white font-medium">{selectedLead.name}</p>
                </div>
                <div>
                  <label className="text-white/60 text-sm">Email</label>
                  <p className="text-white font-medium">{selectedLead.email}</p>
                </div>
                <div>
                  <label className="text-white/60 text-sm">Phone</label>
                  <p className="text-white font-medium">{selectedLead.phone || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-white/60 text-sm">Company</label>
                  <p className="text-white font-medium">{selectedLead.company || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-white/60 text-sm">Status</label>
                  <Badge variant={selectedLead.status === 'new' ? 'primary' : 
                                selectedLead.status === 'contacted' ? 'info' :
                                selectedLead.status === 'qualified' ? 'success' : 'danger'}>
                    {selectedLead.status}
                  </Badge>
                </div>
                <div>
                  <label className="text-white/60 text-sm">Created</label>
                  <p className="text-white font-medium">
                    {new Date(selectedLead.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-4 pt-4">
                <Button
                  variant="secondary"
                  onClick={() => setSelectedLead(null)}
                >
                  Close
                </Button>
                <Button>
                  Edit Lead
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </MainLayout>
  );
};

export default Leads;
