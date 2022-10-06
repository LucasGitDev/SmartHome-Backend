const StateSystem = require("../models/StateSystem");

const status = async (req, res) => {
  const state = await StateSystem.find();

  if (state.length === 0) {
    await StateSystem.create({ status: false });
    res.json({ value: false });
  }
  return res.json({ value: state[0].status ? 1 : 0 });
};

const setStatus = async (req, res) => {
  const { value } = req.body;

  const state = await StateSystem.find();

  if (state.length === 0) {
    await StateSystem.create({ status: value == 1 ? true : false });
    res.json({ err: "" });
    return;
  }

  await StateSystem.updateOne(
    { _id: state[0]._id },
    { status: value == 1 ? true : false }
  );
  res.json({ err: "" });
};

module.exports = {
  status,
  setStatus,
};
