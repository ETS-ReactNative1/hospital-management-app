const checked = (value, options) => {
  if (value !== true) {
    return options.message || 'must be checked';
  }

  return true;
};

export default {
  checked
};
