import * as amqp from "amqplib";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function connect() {
  try {
    const connection = await amqp.connect("amqp://admin:admin@localhost:5672"); // tcp
    console.log("Conectado ao RabbitMQ com sucesso!");

    const channel = await connection.createChannel();
    console.log("Canal criado com sucesso!");

    await sleep(30000);

    // Fechar conexão após uso
    await channel.close();
    await connection.close();

    // se não fechar pode gerar memory leak
    console.log("Conexão fechada");
  } catch (error) {
    console.error("Erro na conexão com RabbitMQ:", error);
  }
}

connect();
