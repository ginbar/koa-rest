module.exports = {
  
    development: {
        port: 8080,
        dbjson: "data/data.json"
    },
  
    heroku: {
        port: process.cwd.PORT || 80,
        dbjson: "data/data.json"
    }
    
};