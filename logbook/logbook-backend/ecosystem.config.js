require('dotenv').config();

module.exports = {
        apps:[{
                name:'logbook-backend',
                script: './src/index.js',
                env: {
                ...process.env,
                },
        }]
};
