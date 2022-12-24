# Setup file template to upload data to MongoDB Atlas
mongoimport --uri "mongodb://xflix-backend:xflix-backend@ac-r2hdrom-shard-00-00.hgoasep.mongodb.net:27017,ac-r2hdrom-shard-00-01.hgoasep.mongodb.net:27017,ac-r2hdrom-shard-00-02.hgoasep.mongodb.net:27017/xflix?ssl=true&replicaSet=atlas-14pfhe-shard-0&authSource=admin&retryWrites=true&w=majority" --drop --collection videos --file data/xflix_data.json

