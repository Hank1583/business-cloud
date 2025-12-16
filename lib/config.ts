export const API_DOMAIN = process.env.API_DOMAIN || "";

// 所有 API 統一集中在這裡
export const API = {
  LOGIN: `${API_DOMAIN}/api/login.php`,
  REGISTER: `${API_DOMAIN}/api/register.php`,
  CHANGEPASSWORD: `${API_DOMAIN}/api/change_password.php`,
  // 你未來還可以一直加
};
