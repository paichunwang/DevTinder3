var express = require("express");
var router = express.Router();
const db = require("../models");
/* GET users listing. */

router.get("/users", function(req, res, next) {
  db.Developer.findOne({}).then(result => {
    res.send(result);
  });
});

module.exports = router;

// const bcrypt = require("bcrypt-nodejs");
// const checkAuth = require("../check-auth.js");
// const helper = require("../helperObject");

// module.exports = app => {
//   app.get("/api/developers", (req, res, next) => {
//     console.log("Hitting API Developer");
//   });

// //this route creates a developer user
// app.post("/api/developers", (req, res) => {
//   //first check the developer database for the user name the user
//   //is trying to claim
//   db.Developer.findOne({
//     where: {
//       username: req.body.username
//     }
//   }).then(results => {
//     //if the username exists (results is not null), then return a false
//     console.log(results);
//     if (results) {
//       //returning false to the client to reflect that the user already exists
//       res.send(false);
//     } else {
//       //if the username does not exist in the developer database, we have to check the customer database
//       db.Customer.findOne({
//         where: {
//           username: req.body.username
//         }
//       }).then(result => {
//         if (result) {
//           //returning false to the client to reflect that the username is already taken
//           res.send(false);
//         } else {
//           bcrypt.genSalt(10, (err, salt) => {
//             bcrypt.hash(req.body.password, salt, null, (err, hash) => {
//               if (err) throw err;
//               db.Developer.create({
//                 name: req.body.name,
//                 username: req.body.username,
//                 password: hash,
//                 location: req.body.location,
//                 photo: req.body.photo,
//                 portfolio: req.body.portfolio,
//                 html: req.body.html,
//                 css: req.body.css,
//                 javascript: req.body.javascript,
//                 java: req.body.java,
//                 nodeJS: req.body.nodeJS,
//                 angular: req.body.angular,
//                 react: req.body.react,
//                 python: req.body.python
//               }).then(result => {
//                 console.log("user created");
//                 //return true if user was successfully created
//                 return res.status(200).send(true);
//               });
//             });
//           });
//         }
//       });
//     }
//   });
// });

// //this route creates a customer user
// app.post("/api/customers", (req, res) => {
//   db.Customer.findOne({
//     where: {
//       username: req.body.username
//     }
//   }).then(results => {
//     console.log(results);
//     if (results) {
//       //returning false to the client to reflect that the user already exists
//       res.send(false);
//     } else {
//       db.Developer.findOne({
//         where: {
//           username: req.body.username
//         }
//       }).then(result => {
//         if (result) {
//           res.send(false);
//         } else {
//           bcrypt.genSalt(10, (err, salt) => {
//             bcrypt.hash(req.body.password, salt, null, (err, hash) => {
//               if (err) throw err;
//               db.Customer.create({
//                 name: req.body.name,
//                 username: req.body.username,
//                 password: hash,
//                 location: req.body.location,
//                 photo: req.body.photo,
//                 numberOfProjects: req.body.numberOfProjects
//               }).then(result => {
//                 console.log("user created");
//                 //return true if user was successfully created
//                 return res.status(200).send(true);
//               });
//             });
//           });
//         }
//       });
//     }
//   });
// });

// //route to update the project to complete
// app.put("/api/project", checkAuth, (req, res) => {
//   console.log("This is req.body: ", req.body);
//   console.log("This is req.params: ", req.params);
//   db.Project.update(
//     {
//       isComplete: true
//     },
//     {
//       where: {
//         id: req.body.id
//       }
//     }
//   )
//     .then(result => {
//       res.status(200).send("project was completed!");
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// //this route creates a new project
// app.post("/api/project", checkAuth, (req, res) => {
//   console.log("This is req.body", req.body);

//   db.Project.create({
//     name: req.body.name,
//     description: req.body.description,
//     dueDate: req.body.dueDate,
//     cost: req.body.cost,
//     html: req.body.html,
//     css: req.body.css,
//     javascript: req.body.javascript,
//     java: req.body.java,
//     nodeJS: req.body.nodeJS,
//     angular: req.body.angular,
//     react: req.body.react,
//     python: req.body.python,
//     CustomerId: req.body.CustomerId
//   })
//     .then(result => {
//       console.log("New Project Created");
//       res.send(true);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// //route to hit when developer wants to update their profile
// app.put("/api/developer/:id", checkAuth, (req, res) => {
//   db.Developer.update(
//     {
//       html: req.body.html,
//       css: req.body.css,
//       javascript: req.body.javascript,
//       java: req.body.java,
//       nodeJS: req.body.nodeJS,
//       angular: req.body.angular,
//       react: req.body.react,
//       python: req.body.python
//     },
//     {
//       where: {
//         id: req.params.id
//       }
//     }
//   )
//     .then(result => {
//       res.status(200).send("user was updated");
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// app.get("/api/viewproject/:id", checkAuth, (req, res) => {
//   db.Project.findOne({
//     where: { id: req.params.id }
//   })
//     .then(result => {
//       res.status(200).json(result);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// //this route handles the matchingggggg
// //removed check auth for testing
// app.get("/api/projectmatch/:id", checkAuth, (req, res) => {
//   //get projectId
//   let projectId = req.params.id;
//   try {
//     helper.projectQuery(projectId, result => {
//       console.log("This is the result of match call", result);
//       res.status(200).json(result);
//     });
//   } catch (error) {
//     console.log("Error in project match id: ", error);
//   }
// });

// //routes hit when customer invites a developer
// app.post("/api/project/:pid/developer/:did", checkAuth, (req, res) => {
//   db.ProjectDeveloper.create({
//     DeveloperId: req.params.did,
//     ProjectId: req.params.pid
//   })
//     .then(result => {
//       res.status(200).send("developer invite updated");
//     })
//     .catch(err => {
//       console.log(err);
//     });
//   // console.log("CLIKY HERE", req.params.pid)
//   // console.log(req.params.did)
// });

// //route hit when the developer accepts a project
// //pass me the developerId in the url as well so I can save the foreign key in the database
// app.put("/api/project/developer/:did/:pid", checkAuth, (req, res) => {
//   db.Project.findOne({
//     where: { id: req.params.pid }
//   })
//     .then(result => {
//       //if project is already assigned, return a notice to the front end notifying them that it has already been assigned
//       if (result.isAssigned) {
//         //can discuss what to send here so the front end knows wassup
//         res.status(200).send("project already assigned");
//       } else {
//         db.Project.update(
//           {
//             isAssigned: true,
//             DeveloperId: req.params.did
//           },
//           {
//             where: {
//               //assuming PROJECT ID will be passed in the URL
//               id: req.params.pid
//             }
//           }
//         )
//           .then(result => {
//             res.status(200).send("project was accepted");
//           })
//           .catch(err => {
//             console.log(err);
//           });
//       }
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// //what the developer sees after logging in
// //going to need this route to get data to dev profile
// //=========================================================================
// app.get("/devProfile/:id", checkAuth, (req, res) => {
//   db.Developer.findOne({
//     where: {
//       id: req.params.id
//     }
//   })
//     .then((result, err) => {
//       if (err) throw err;
//       let userOb = result.dataValues;
//       db.Project.findAll({
//         where: {
//           DeveloperId: req.params.id
//         }
//       })
//         .then(result => {
//           let projectinvite = result.filter(
//             z => !z.isAssigned && !z.isComplete
//           );
//           let openproject = result.filter(b => b.isAssigned && !b.isComplete);
//           let completeprojects = result.filter(
//             x => x.isAssigned && x.isComplete
//           );
//           res.status(200).json({
//             developer: userOb,
//             projectinvite: projectinvite,
//             openproject: openproject,
//             completeprojects: completeprojects
//           });
//         })
//         .catch(err => {
//           if (err) throw err;
//         });
//     })
//     .catch(err => {
//       if (err) throw err;
//     });
// });

// //what the customer sees after logging in
// //need this route to send customer component his data
// //===================================================================================
// app.get("/customerProfile/:id", checkAuth, (req, res) => {
//   console.log("made it to the cust profile page");
//   console.log("Customer Control");
//   let customerData;

//   db.Customer.findOne({
//     where: {
//       id: req.params.id
//     }
//   })
//     .then((result, err) => {
//       if (err) throw err;
//       customerData = result.dataValues;
//       db.Project.findAll({
//         where: {
//           CustomerId: req.params.id
//         }
//       })
//         .then(result => {
//           let completeProjects = result.filter(x => x.isComplete == 1);
//           let notCompleteProjects = result.filter(y => y.isComplete == 0);
//           console.log("Thisis the not complete project", notCompleteProjects);
//           res.status(200).json({
//             name: customerData.name,
//             photo: customerData.photo,
//             completeProjects: completeProjects,
//             notCompleteProjects: notCompleteProjects
//           });
//         })
//         .catch(err => {
//           if (err) throw err;
//         });
//     })
//     .catch(err => {
//       if (err) throw err;
//     });
// });
// };
