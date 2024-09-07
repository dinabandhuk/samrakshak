const logout = async () => {
  localStorage.removeItem("token");
};

export default logout;
