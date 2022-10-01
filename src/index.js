import { build } from './app.js';

async function start () {
  try {
    // if something goes wrong here, it will do the "catch part"
    const fastify = await build();

    const addr = await fastify.listen({
      port: '8080'
    });
    console.log(`Listening on ${addr}`);
  } catch (error) {
    // prints the error
    console.error(error);
    // exits the program with an error code
    process.exit(1);
  }
}

start();
