export const getModels = (req, res) => {
  res.json("sd");
};
export const getModel = (req, res) => {
  res.json(req.params.id);
};
