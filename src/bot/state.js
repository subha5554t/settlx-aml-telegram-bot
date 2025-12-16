const map = new Map();
module.exports = {
  get: (id) => map.get(id),
  set: (id, v) => map.set(id, v),
  clear: (id) => map.delete(id)
};
