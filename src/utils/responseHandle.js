module.exports = {
  created: (res) => (params) => res.status(201).json(params),
  ok: (res) => (params) => res.status(200).json(params),
  badRequest: (res) => (params) => res.status(400).json(params),
  unauthorized: (res) => (params) => res.status(401).json(params),
  forbidden: (res) => (params) => res.status(403).json(params),
  notFound: (res) => (params) => res.status(404).json(params),
};
