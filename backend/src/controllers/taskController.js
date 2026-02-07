import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title, assignedTo, order } = req.body;

    const task = await Task.create({
      title,
      assignedTo,
      order,
      case: req.params.caseId,
      company: req.user.company,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTasksByCase = async (req, res) => {
  try {
    const tasks = await Task.find({
      case: req.params.caseId,
      company: req.user.company,
    }).sort({ order: 1 });

    if (tasks.length === 0) {
      console.log(`✅ No tasks found for case ${req.params.caseId} in company ${req.user.company}`);
    }

    res.json(tasks);
  } catch (error) {
    console.error('❌ Error fetching tasks:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      { status: req.body.status },
      { new: true }
    );

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
