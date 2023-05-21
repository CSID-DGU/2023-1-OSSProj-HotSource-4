

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

export const logout = () => {
    localStorage.removeItem("user");
}