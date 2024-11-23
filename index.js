mongoose = require('mongoose');
//app = express();
const MONGO_URI = 'mongodb://localhost:27017/Week8'; mongoose.connect(MONGO_URI, {useUnifiedTopology: true,useNewUrlParser: true}) ; const db = mongoose.connection;
db.on('error', function(err)
{console.log("Error occured during connection"+err) }
);
db.once('connected', function() { console.log(`Connected to ${MONGO_URI}`); });
// creating the scheme
const PersonScheme = new mongoose.Schema({ name: { type: String, required: true
},
age: Number, Gender:String, Salary:Number
});
// creating model named as modelname with collection named as personCo llection
const person_doc = mongoose.model('modelname', PersonScheme,'personCollectio n');
// creating a single document
const doc1 = new person_doc({ name: 'Jacky',age:362,Gender:"Male",Salary:3 456 }
);
// adding one document in the collection
doc1
    .save()
    .then((doc1) => {
console.log("New Article Has been Added Into Your DataBase.",doc1); })
    .catch((err) => {
        console.error(err);
});

//add multiple documents 
manypersons=[{ name: 'Simon',age:42,Gender:"Male",Salary:3456 } ,{ name: 'Neesha',age:23,Gender:"Female",Salary:1000 }
    ,{ name: 'Mary',age:27,Gender:"Female",Salary:5402 },
    { name: 'Mike',age:40,Gender:"Male",Salary:4519 }
    ]
    person_doc.insertMany(manypersons).then(function(){ console.log("Data inserted") // Success
    }).catch(function(error){ console.log(error) // Failure
    });

// i) Return all documents without filtering, limit to 5
Person.find({})
.limit(5) // Limit results to 5
.exec()
.then(docs => {
    console.log("All records (limited to 5):");
    docs.forEach(doc => {
        console.log(doc);
    });
})
.catch(err => {
    console.error("Error fetching all records:", err);
});

// ii) Return documents with filtering criteria
const givenAge = 30;
Person.find({ Gender: "Female", age: { $gte: givenAge } }) 
.sort({ Salary: 1 }) // Sort by salary in ascending order
.select('name age Salary') // Retrieve only 'name', 'age', and 'Salary' fields
.exec()
.then(docs => {
    console.log(`Records with age >= ${givenAge} and Gender = "Female":`);
    docs.forEach(doc => {
        console.log(`Name: ${doc.name}, Age: ${doc.age}, Salary: ${doc.Salary}`);
    });
})
.catch(err => {
    console.error("Error fetching filtered records:", err);
});

// counting all the documents
person_doc. countDocuments( ) . exec( ) .then(count=>{
console.log("Total documents Count :", count)
}) .catch(err => { 
console.error(err)
})


//Delete 
person_doc.deleteMany({ age: { $gte: 25 } }) .exec()
.then(docs=>{
console.log('deleted documents are:',docs);
}).catch(function(error){ 
console.log(error);
});

//update
person_doc.updateMany(
    { Gender: "Female" },       // Filter criteria
    { $set: { Salary: 5555 } } // Update operation
)
.exec()
.then(docs => {
    console.log("Update successful:");
    console.log(docs); // Logs the result of the update operation
})
.catch(error => {
    console.error("Error during update:", error); // Handles and logs errors
});
