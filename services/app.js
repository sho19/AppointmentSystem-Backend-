const dbName = "appointmentSystem"


module.exports.signUp = async (options) => {
    return new Promise(async (resolve, reject) => {
        options.mDbClient.connect(async (err, client) => {
            console.log("Connected successfully to  mdb server");
            try {
                var db = client.db("appointmentSystem");
                var userObj = {
                    "name": "hari reddy",
                    "category": "buyer",
                    "userName": "hari0117",
                    "password": "haraharamahadev"
                };
                db.collection("buyer").insertOne(userObj, function (err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    resolve(result = {
                        response: "1 document inserted",
                        status: 200
                    })
                    client.close();
                });
            }
            catch{

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


