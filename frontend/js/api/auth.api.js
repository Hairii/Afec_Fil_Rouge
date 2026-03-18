const login = async (mail, password) => {
    try {
        const response = await fetch ('http://localhost:3000/api/auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mail, password }),
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

const register = async (username, mail, password) => {
    try{
        const response = await fetch ('http://localhost:3000/api/auth/register', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, mail, password }),
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

const logout = async () => {
    try{
        const response = await fetch ('http://localhost:3000/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

const getUser = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/user', {
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export { login, register, logout, getUser};