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


// function initSignUp() {
//     return new Promise(async function (resolve, reject) {

//         try {
//             const collection = db.collection('documents');
//             // Insert some documents
//             collection.insertMany([
//                 { a: 1 }, { a: 2 }, { a: 3 }
//             ], function (err, result) {
//                 assert.equal(err, null);
//                 assert.equal(3, result.result.n);
//                 assert.equal(3, result.ops.length);
//                 console.log("Inserted 3 documents into the collection");
//                 callback(result);
//             });
//         }
//         catch{

//         }

        // try {
        //     // let collection




        //     let result = {
        //         response: mbClient,
        //         status: 200
        //     }
        //     resolve(result);
        // }
        // catch (e) {
        //     reject({
        //         response: e,
        //         status: 400
        //     })
//         // }
//     })
// }


