import mysql2 from 'mysql2/promise';
import dotenc from 'dotenv';

configDotenv.config();

let db;

try{
    db =  await mysql2.createConnection({
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_DATABASE,
        port:process.env.DB_PORT,
        waitForConnections:true,
        connectionLimit:10,
        queueLimit:0,
    });

    const connexion = await db.getconnection();
    console.log("Connexion à la base réussie");
    connexion.release();
}catch(e){
    console.error('Erreur connexion',error.mesage);
    process.exit(1);
}

export default db;
