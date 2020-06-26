const bodyParser = require("body-parser");

const dbName = "appointmentSystem"


module.exports.signUp = async (options) => {
    return new Promise(async (resolve, reject) => {
        options.mDbClient.connect(async (err, client) => {
            console.log("Connected successfully to  mdb server");
            var body = options.body
            console.log("body", body)
            try {
                var db = client.db("appointmentSystem");
                var userObj = {
                    "name": body.name,
                    "category": body.category,
                    "userName": body.userName,
                    "password": body.password
                };
                var query = { userName: body.userName };
                db.collection(body.category).find(query).toArray(function (err, result) {
                    if (err) throw err
                    if (result.length > 0) {
                        reject({
                            response: "choose another name",
                            status: 400
                        })
                    } else {
                        db.collection(body.category).insertOne(userObj, function (err, res) {
                            if (err) throw err;
                            console.log(body.category, "created succesfully");
                            resolve(result = {
                                response: body.category + "created succesfully",
                                status: 200
                            })
                            //   client.close();
                        });
                    }
                });
            }
            catch (e) {
                reject({
                    response: e,
                    status: 400
                })
            }
        });
    })
}


module.exports.login = async (options) => {
    return new Promise(async (resolve, reject) => {
        options.mDbClient.connect(async (err, client) => {
            console.log("Connected successfully to  mdb server");
            var body = options.body
            console.log("body", body)
            try {
                var db = client.db("appointmentSystem");
                var query = { userName: body.userName };
                db.collection(options.category).find(query).toArray(function (err, result) {
                    if (err) throw err
                    if (result[0].password == body.password) {
                        resolve({
                            response: result[0],
                            status: 400
                        })
                    } else {
                        reject({
                            response: "unauthorised",
                            status: 400
                        })
                    }
                });
            }
            catch (e) {
                reject({
                    response: e,
                    status: 400
                })
            }
        });
    })
}

