const checked = (value, options) => {
  if (value !== true) {
    return options.message || 'phải được xác nhận';
  }

  return true;
};

export default {
  checked
};
