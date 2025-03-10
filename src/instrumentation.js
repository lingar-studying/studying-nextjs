//like on init server

export async function register() {
    console.log("Starting Server")

    console.log('Lingar:', process.env.LINGAR); // Only available on the server

    console.log("db  = " + process.env.db);


}