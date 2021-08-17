exports.errorInSaving = (res, err) => {
  console.error("Error in saving Database: ", err);
  res.status(500).json({ message: "Error in saving Database" });
};
