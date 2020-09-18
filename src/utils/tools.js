module.exports = {
  compose: (...fns) => (arg) => fns.reduceRight((v, fn) => fn(v), arg),
  pipe: (...fns) => (arg) => fns.reduce((v, fn) => fn(v), arg),
  reduce: (cb, arg) => (array = []) => array.reduce(cb, arg),
  map: (cb) => (array = []) => array.map(cb),
  filter: (cb) => (array = []) => array.filter(cb),
  find: (cb) => (array = []) => array.find(cb),
};
