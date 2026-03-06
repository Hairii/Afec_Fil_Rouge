import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';


dotenv.config();

let db;

try{
    db =  await mysql2.createPool({
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_DATABASE,
        port:process.env.DB_PORT,
        waitForConnections:true,
        connectionLimit:10,
        queueLimit:0,
    });

    const connexion = await db.getConnection();
    console.log("Connexion à la base réussie");
    connexion.release();
}catch(error){
    console.error('Erreur connexion',error.message);
    process.exit(1);
}

export default db;
