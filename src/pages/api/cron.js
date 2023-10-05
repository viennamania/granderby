export default function handler(req, res) {
  // Run cron job here

  console.log('Cron job ran!');

  res.status(200).end('Hello Cron!');
}
