module.exports = {
  
    development: {
        port: 8080,
        dbjson: "data/data.json"
    },
  
    production: {
        port: process.cwd.PORT || 80,
        dbjson: "data/data.json"
    }
    
};