const cron = require('node-cron');
const {newsData} = require('../controllers/newsController');

// Every 30 minutes
cron.schedule('* * * * *', async () => {
  console.log('Fetching latest news...');
  await newsData();
});
