const amqp = require('amqplib');

async function sendToQueue(message) {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    const queue = 'chat_requests';

    await channel.assertQueue(queue, { durable: true });

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true }, {
      noAck: true
    });
    console.log(" [x] Sent '%s'", message);
    // setTimeout(() => {
    //   connection.close();
    // }, 500);
  } catch (error) {
    console.error('Error sending to queue:', error);
  }
}

module.exports = { sendToQueue };
