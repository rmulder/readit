import Validator from 'validatorjs';

export const validateInput = (data: {}, rules: {}) => {
  const validator = new Validator(data, rules);

  const isValid = validator.passes();
  let errorMessage = null;

  if (validator.errorCount > 0) {
    const firstErrorAttribute = Object.keys(validator.errors.errors)[0];

    errorMessage = validator.errors.first(firstErrorAttribute).toString();
  }

  return {
    isValid,
    errorMessage,
  };
};
