const  getComments = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/comments/${id}`, {
            credentials: 'include',
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

const addComments = async (id, comment) => {
    try {
        const response = await fetch(`http://localhost:3000/api/comments/add`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ gameID: id, content: comment }),
        });
        return await response.json();
    } catch (error) {
        console.error(error);
        }
    }   

export  {getComments, addComments};