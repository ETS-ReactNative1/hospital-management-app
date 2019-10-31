import validate from 'validate.js';

const validators = {
  checked: (value, options) => {
    if (value !== true) {
      return options.message || 'phải được xác nhận';
    }
    return true;
  }
};

validate.validators = {
  ...validate.validators,
  ...validators
};

validate.validators.email.message = 'không hợp lệ';

export default validate;
