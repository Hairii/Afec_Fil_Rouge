let isRefreshing = false;

const tryRefresh = async () => {
  if (isRefreshing) return false;
  isRefreshing = true;
  try {
    const res = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    });
    return res.ok;
  } catch {
    return false;
  } finally {
    isRefreshing = false;
  }
};

export const fetchWithRefresh = async (url, options = {}) => {
  options.credentials = 'include';

  let response = await fetch(url, options);

  if (response.status === 401) {
    const refreshed = await tryRefresh();
    if (refreshed) {
      response = await fetch(url, options);
    }
  }

  return response;
};