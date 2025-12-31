import Lead from "../models/Lead.js";

/**
 * ✅ CREATE LEAD
 * POST /api/leads
 */
export const createLead = async (req, res) => {
  try {
    const { name, email, phone, status } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      status: status || "new",
      company: req.user.company,
      createdBy: req.user.id,
    });

    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ✅ GET ALL LEADS (Company-based + Pagination + Search)
 * GET /api/leads?page=1&limit=10&search=acme
 */
export const getLeads = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const searchQuery = req.query.search
      ? {
          name: { $regex: req.query.search, $options: "i" },
        }
      : {};

    const leads = await Lead.find({
      company: req.user.company,
      ...searchQuery,
    })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Lead.countDocuments({
      company: req.user.company,
      ...searchQuery,
    });

    if (total === 0) {
      console.log(`📊 No leads found for company ${req.user.company} - Page ${page}, Search: ${req.query.search || 'none'}`);
    }

    res.json({
      leads,
      page,
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    console.error('❌ Error fetching leads:', error.message);
    res.status(500).json({ message: error.message });
  }
};

/**
 * ✅ UPDATE LEAD STATUS
 * PUT /api/leads/:id
 */
export const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findOne({
      _id: req.params.id,
      company: req.user.company,
    });

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    lead.status = req.body.status || lead.status;
    await lead.save();

    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ✅ DELETE LEAD
 * DELETE /api/leads/:id
 */
export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findOneAndDelete({
      _id: req.params.id,
      company: req.user.company,
    });

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
