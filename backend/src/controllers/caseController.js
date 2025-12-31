import Case from "../models/Case.js";

export const createCase = async (req, res) => {
  try {
    const { title, description, priority, assignedTo } = req.body;

    const newCase = await Case.create({
      title,
      description,
      priority,
      assignedTo,
      company: req.user.company,
      createdBy: req.user.id,
    });

    res.status(201).json(newCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCases = async (req, res) => {
  try {
    const cases = await Case.find({ company: req.user.company })
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    if (cases.length === 0) {
      console.log(`🔧 No cases found for company ${req.user.company}`);
    }

    res.json(cases);
  } catch (error) {
    console.error('❌ Error fetching cases:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateCaseStatus = async (req, res) => {
  try {
    const updatedCase = await Case.findOneAndUpdate(
      {
        _id: req.params.id,
        company: req.user.company,
      },
      { status: req.body.status },
      { new: true }
    );

    res.json(updatedCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
