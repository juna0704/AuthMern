import Goal from "../modals/goalModal.js";
import asyncHandler from "express-async-handler";

// @desc Get all goals for logged in user
// @route GET /api/v1/
// @access Private
export const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// @desc Create a new goal
// @route POST /api/v1/
// @access Private
export const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    return res.status(400).json({ message: "Add text" });
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(201).json(goal);
});

// @desc Update a goal
// @route PUT /api/v1/:id
// @access Private
export const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    return res.status(400).json({ message: "Goal not found" });
  }

  // Optional: Check if goal belongs to logged-in user
  if (goal.user.toString() !== req.user.id) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const updatedGoal = await Goal.findByIdAndUpdate(
    req.params.id,
    { text: req.body.text },
    { new: true }
  );

  res.status(200).json(updatedGoal);
});

// @desc Delete a goal
// @route DELETE /api/v1/:id
// @access Private
export const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    return res.status(400).json({ message: "Goal not found" });
  }

  // Check if goal belongs to logged-in user
  if (goal.user.toString() !== req.user.id) {
    return res.status(401).json({ message: "Not authorized" });
  }

  await goal.remove(); // or Goal.findByIdAndDelete(req.params.id)

  res.status(200).json({ message: "Goal has been deleted" });
});
