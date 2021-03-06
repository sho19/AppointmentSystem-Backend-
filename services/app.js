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
                    "password": body.password,
                };
                body.category ? userObj.description = body.description : ""
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
                    let responseObj={
                        result:"success",
                        status:200,
                        data:{}
                    }
                    if(result.length>0){
                    if (result[0].password == body.password) {
                        responseObj.data=result[0]
                        resolve({
                            response: responseObj,
                            status: 200
                        })
                    } else {
                        responseObj.result="invalid password";
                        responseObj.data={}
                        responseObj.status=400;
                        resolve({
                            response: responseObj,
                            status: 200
                        })
                    }
                }else{
                    responseObj.result="user does not exist";
                    responseObj.status=400;
                    resolve({
                        response: responseObj,
                        status: 200
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

module.exports.getAllServiceProvider = async (options) => {
    return new Promise(async (resolve, reject) => {
        options.mDbClient.connect(async (err, client) => {
            console.log("Connected successfully to  mdb server");
            try {
                var db = client.db("appointmentSystem");
                db.collection("service_provider").find({}, { projection: { password: 0, } }).toArray(function (err, result) {
                    if (err) throw err
                    if (result) {
                        resolve({
                            response: result,
                            status: 200
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


module.exports.setAvailableTime = async (options) => {
    return new Promise(async (resolve, reject) => {
        options.mDbClient.connect(async (err, client) => {
            console.log("Connected successfully to  mdb server");
            var body = options.body
            console.log("body", body, options.userName)
            try {
                var db = client.db("appointmentSystem");
                var userObj = {
                    "from": body.from,
                    "to": body.to,
                };
                var myquery = { userName: options.userName };
                var newvalues = { $set: { "timeSlot": userObj } };
                db.collection("service_provider").updateOne(myquery, newvalues, function (err, res) {
                    if (err) throw err;
                    if (res.result.n > 0) {
                        resolve({
                            response: "updated sucessfully",
                            status: 200
                        })
                    } else {
                        reject({
                            response: "Failed updation",
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



module.exports.bookAppointments = async (options) => {
    return new Promise(async (resolve, reject) => {
        options.mDbClient.connect(async (err, client) => {
            console.log("Connected successfully to  mdb server");
            var body = options.body
            console.log("body", body, options.userName, options.serProvider)
            try {
                var db = client.db("appointmentSystem");
                var bokingObj = {
                    email: body.email,
                    date: body.date,
                    time: body.time,
                    clientName: options.serProvider
                };
                console.log(bokingObj,"check here")
                let myquery = { userName: body.email };
                let newvalues = { $push: { myBookings: bokingObj } };
                db.collection("customer").updateOne(myquery, newvalues, function (err, res) {
                    
                    if (res.result.n > 0) {
                        bokingObj.customer = options.userName;
                        let myquery = { userName: options.serProvider };
                        let newvalues = { $push: { appointments: bokingObj } };
                        db.collection("service_provider").updateOne(myquery, newvalues, function (err, res) {
                            if (res.result.n > 0) {
                                resolve({
                                    response: "updated sucessfully",
                                    status: 200
                                })
                            } else {
                                reject({
                                    response: "Failed updation",
                                    status: 400
                                })
                            }
                        })
                    } else {
                        reject({
                            response: "Failed updation",
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

module.exports.rejectAppointment = async (options) => {
    return new Promise(async (resolve, reject) => {
        options.mDbClient.connect(async (err, client) => {
            try {
                var db = client.db("appointmentSystem");
                db.collection("service_provider").updateOne({ userName: options.userName }, { $pull: { appointments: { customer: options.customeruserName,time:options.selectedTime,date:options.date } } }, function (err, res) {
                    if (err) throw err
                    if (res.result.nModified > 0) {
                        resolve({
                            response: "deleted successfully",
                            status: 200
                        })
                    } else {
                        reject({
                            response: "connot be rejected",
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


module.exports.getAppointments = async (options) => {
    return new Promise(async (resolve, reject) => {
        options.mDbClient.connect(async (err, client) => {
            console.log("Connected successfully to  mdb server");
            try {
                var db = client.db("appointmentSystem");
                db.collection(options.category).find({ userName: options.userName }, { projection: { _id: 0, name: 0, password: 0, timeSlot: 0, category: 0 } }).toArray(function (err, result) {
                    if (err) throw err
                    if (result) {
                        resolve({
                            response: result,
                            status: 200
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


