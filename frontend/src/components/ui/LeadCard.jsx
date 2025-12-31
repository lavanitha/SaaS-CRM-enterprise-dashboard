import React from 'react';
import GlassCard from './GlassCard';
import Badge from './Badge';
import { FiMail, FiPhone, FiCalendar } from 'react-icons/fi';

const LeadCard = ({ lead }) => {
  const statusColors = {
    new: 'primary',
    contacted: 'info',
    qualified: 'success',
    lost: 'danger'
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <GlassCard className="p-4 hover:scale-105 transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="text-white font-semibold text-sm group-hover:text-blue-300 transition-colors">
            {lead.name}
          </h4>
          <p className="text-white/60 text-xs">{lead.company}</p>
        </div>
        <Badge variant={statusColors[lead.status] || 'secondary'} size="sm">
          {lead.status}
        </Badge>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-white/60">
          <FiMail className="w-3 h-3" />
          <span className="text-xs">{lead.email}</span>
        </div>
        {lead.phone && (
          <div className="flex items-center gap-2 text-white/60">
            <FiPhone className="w-3 h-3" />
            <span className="text-xs">{lead.phone}</span>
          </div>
        )}
      </div>

      {/* Metadata */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-white/40">Created {new Date(lead.createdAt).toLocaleDateString()}</span>
        <Badge variant={getPriorityColor(lead.priority)} size="sm">
          {lead.priority || 'medium'}
        </Badge>
      </div>
    </GlassCard>
  );
};

export default LeadCard;
