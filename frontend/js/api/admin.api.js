export const deleteGame = async (id) => {
    try {
        const response = await fetch ('http://localhost:3000/api/admin/delete', {
            method: 'POST',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

export const updateGame = async (id, game, released) => {
    try {
        const response = await fetch ('http://localhost:3000/api/admin/update', {
            method: ' PACTH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, game, released }),
        });
        return await response.json();
    } catch (error) {
        console.error(error); 
    }
}

export const getReportedComments = async () => {
    try {
        const response = await fetch ('http://localhost:3000/api/admin/report', {
            credentials: 'include',
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

export const unreportComment = async (id) => {
    try {
        const response = await fetch ('http://localhost:3000/api/admin/unreport', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

export const deleteComment = async (id) => {
    try {
        const response = await fetch ('http://localhost:3000/api/admin/deleteComment', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await fetch ('http://localhost:3000/api/admin/deleteUser', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

export {deleteGame, updateGame, getReportedComments, unreportComment, deleteComment, deleteUser};