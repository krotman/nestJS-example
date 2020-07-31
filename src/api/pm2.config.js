module.exports = {
    apps: [
        {
            name: 'api',
            script: './app/main.js',
            env: {
                SECRET: 'secret',
            },
        },
    ],
};
