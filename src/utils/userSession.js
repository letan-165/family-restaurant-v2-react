const PROFILE_STORAGE_KEY = "profile";
const SESSION_EVENT_NAME = "user-session-changed";

function readStoredProfile() {
  const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);

  if (!storedProfile) {
    return null;
  }

  try {
    return JSON.parse(storedProfile);
  } catch {
    return null;
  }
}

export function normalizeProfile(rawProfile = {}) {
  const storedProfile = readStoredProfile() || {};

  return {
    userId:
      rawProfile.userId ||
      rawProfile.userID ||
      storedProfile.userId ||
      localStorage.getItem("userID") ||
      "",
    fullName:
      rawProfile.fullName ||
      rawProfile.fullname ||
      storedProfile.fullName ||
      localStorage.getItem("fullname") ||
      "",
    phone: rawProfile.phone || storedProfile.phone || "",
    avatar: rawProfile.avatar || storedProfile.avatar || "",
    address: rawProfile.address || storedProfile.address || "",
  };
}

export function saveUserSession(sessionData = {}) {
  const normalizedProfile = normalizeProfile(sessionData);

  if (sessionData.token) {
    localStorage.setItem("token", sessionData.token);
  }

  if (normalizedProfile.userId) {
    localStorage.setItem("userID", normalizedProfile.userId);
  }

  if (normalizedProfile.fullName) {
    localStorage.setItem("fullname", normalizedProfile.fullName);
  }

  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(normalizedProfile));
  window.dispatchEvent(new Event(SESSION_EVENT_NAME));
}

export function getUserSession() {
  const profile = normalizeProfile();
  const token = localStorage.getItem("token");

  return {
    ...profile,
    token: token || "",
    isLoggedIn: Boolean(token),
    name: profile.fullName || "Khach hang",
  };
}

export function clearUserSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("userID");
  localStorage.removeItem("fullname");
  localStorage.removeItem(PROFILE_STORAGE_KEY);
  window.dispatchEvent(new Event(SESSION_EVENT_NAME));
}

export function subscribeUserSession(listener) {
  window.addEventListener("storage", listener);
  window.addEventListener(SESSION_EVENT_NAME, listener);

  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(SESSION_EVENT_NAME, listener);
  };
}
