function extractId(req) {
  if (!req.params.id) {
    throw new Error('No id provided in request parameters.');
  }
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    throw new Error('Provided id is not a valid number.');
  }
  return id;
}

module.exports = extractId;
