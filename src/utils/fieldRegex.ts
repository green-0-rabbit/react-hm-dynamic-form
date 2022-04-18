const fieldRegex = {
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  password:
    /(?=.*[^a-zA-Z])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$-/:-?{-~!"^_`[\]])\S{10,}/
};

export default fieldRegex;
