// cronjobs.js
const cron = require('node-cron');
const { checkBadgesForAllGroups } = require('./src/services/badgeService'); // badgeService 파일의 경로에 맞게 수정

// 10초마다 작업 실행
cron.schedule('*/10 * * * * *', async () => {
    console.log('badge check & grant Start');
    try {
        await checkBadgesForAllGroups();
        console.log('badge check & grant End');
        
    } catch (error) {
        console.error('Error occurred during badge processing:', error);
    }
});