const db = require("../models");
const bcrypt = require("bcrypt-nodejs");
const checkAuth = require("../check-auth.js");
const helper = require("../helperObject");

module.exports = app => {
  app.get("/api/developers", (req, res) => {
    db.Developer.findAll({}).then(result => {
      res.json(result);
    });
  });

  app.get("/api/customers", (req, res) => {
    db.Customer.findAll({}).then(result => {
      res.json(result);
    });
  });

  //this route creates a developer user
  app.post("/api/developers", (req, res) => {
    //first check the developer database for the user name the user
    //is trying to claim
    db.Developer.findOne({
      where: {
        username: req.body.username
      }
    }).then(results => {
      //if the username exists (results is not null), then return a false
      console.log(results);
      if (results) {
        //returning false to the client to reflect that the user already exists
        res.send(false);
      } else {
        //if the username does not exist in the developer database, we have to check the customer database
        db.Customer.findOne({
          where: {
            username: req.body.username
          }
        }).then(result => {
          if (result) {
            //returning false to the client to reflect that the username is already taken
            res.send(false);
          } else {
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(req.body.password, salt, null, (err, hash) => {
                if (err) throw err;
                db.Developer.create({
                  name: req.body.name,
                  username: req.body.username,
                  password: hash,
                  location: req.body.location,
                  photo: req.body.photo,
                  portfolio: req.body.portfolio,
                  html: req.body.html,
                  css: req.body.css,
                  javascript: req.body.javascript,
                  java: req.body.java,
                  nodeJS: req.body.nodeJS,
                  angular: req.body.angular,
                  react: req.body.react,
                  python: req.body.python
                }).then(result => {
                  console.log("user created");
                  //return true if user was successfully created
                  return res.status(200).send(true);
                });
              });
            });
          }
        });
      }
    });
  });

  //this route creates a customer user
  app.post("/api/customers", (req, res) => {
    db.Customer.findOne({
      where: {
        username: req.body.username
      }
    }).then(results => {
      console.log(results);
      if (results) {
        //returning false to the client to reflect that the user already exists
        res.send(false);
      } else {
        db.Developer.findOne({
          where: {
            username: req.body.username
          }
        }).then(result => {
          if (result) {
            res.send(false);
          } else {
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(req.body.password, salt, null, (err, hash) => {
                if (err) throw err;
                db.Customer.create({
                  name: req.body.name,
                  username: req.body.username,
                  password: hash,
                  location: req.body.location,
                  photo: req.body.photo,
                  numberOfProjects: req.body.numberOfProjects
                }).then(result => {
                  console.log("user created");
                  //return true if user was successfully created
                  return res.status(200).send(true);
                });
              });
            });
          }
        });
      }
    });
  });

  //route to update the project to complete
  app.put("/api/project", checkAuth, (req, res) => {
    console.log("This is req.body: ", req.body);
    console.log("This is req.params: ", req.params);
    db.Project.update(
      {
        isComplete: true
      },
      {
        where: {
          id: req.body.id
        }
      }
    )
      .then(result => {
        res.status(200).send("project was completed!");
      })
      .catch(err => {
        console.log(err);
      });
  });

  //this route creates a new project
  app.post("/api/project", checkAuth, (req, res) => {
    console.log("This is req.body", req.body);

    db.Project.create({
      name: req.body.name,
      description: req.body.description,
      dueDate: req.body.dueDate,
      cost: req.body.cost,
      html: req.body.html,
      css: req.body.css,
      javascript: req.body.javascript,
      java: req.body.java,
      nodeJS: req.body.nodeJS,
      angular: req.body.angular,
      react: req.body.react,
      python: req.body.python,
      CustomerId: req.body.CustomerId
    })
      .then(result => {
        console.log("New Project Created");
        res.send(true);
      })
      .catch(err => {
        console.log(err);
      });
  });

  //route to hit when developer wants to update their profile
  app.put("/api/developer/:id", checkAuth, (req, res) => {
    db.Developer.update(
      {
        html: req.body.html,
        css: req.body.css,
        javascript: req.body.javascript,
        java: req.body.java,
        nodeJS: req.body.nodeJS,
        angular: req.body.angular,
        react: req.body.react,
        python: req.body.python
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(result => {
        res.status(200).send("user was updated");
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.get("/api/viewproject/:id", checkAuth, (req, res) => {
    db.Project.findOne({
      where: { id: req.params.id }
    })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
      });
  });

  //this route handles the matchingggggg
  //removed check auth for testing
  //REMOVED CHECKAUTH FROM THIS ROUTE BE SURE TO PUT IT BACK!!!!
  app.get("/api/projectmatch/:id", checkAuth, (req, res) => {
    //get projectId
    let projectId = req.params.id;
    try {
      helper.projectQuery(projectId, result => {
        console.log("This is the result of match call", result);
        res.status(200).json(result);
      });
    } catch (error) {
      console.log("Error in project match id: ", error);
    }
  });

  //routes hit when customer invites a developer
  //REMOVED CHECKAUTH MIDDLEWARE PUT IT BACK AFTER TEST
  app.post("/api/project/:pid/developer/:did", (req, res) => {
    
    db.ProjectDeveloper.findOne({
      where: {
        DeveloperId: req.params.did,
        ProjectId: req.params.pid
      }
    }).then((result, err) => {
      if(result){
        res.status(200).send("developer already invited")
      } else {
        return db.ProjectDeveloper.create({
          DeveloperId: req.params.did,
          ProjectId: req.params.pid
        });
      }
    })
      .then(result => {
        res.status(200).send("developer invite updated");
      })
      .catch(err => {
        console.log(err);
      });
    // console.log("CLIKY HERE", req.params.pid)
    // console.log(req.params.did)
  });

  //route hit when the developer accepts a project
  //pass me the developerId in the url as well so I can save the foreign key in the database
  //REMOVED CHECKAUTH FROM THIS ROUTE PUT IT BACK AFTER TESTING
  app.put("/api/project/developer/:did/:pid", checkAuth, (req, res) => {
    db.Project.findOne({
      where: { id: req.params.pid }
    })
      .then(result => {

        //if project is already assigned, return a notice to the front end notifying them that it has already been assigned
        if (result.isAssigned) {
          //can discuss what to send here so the front end knows wassup
          res.status(200).send("project already assigned");
        } else {
          return db.Project.update(

            {
              isAssigned: true,
              DeveloperId: req.params.did
            },
            {
              where: {
                //assuming PROJECT ID will be passed in the URL
                id: req.params.pid
              }
            }
          );
        }
      })
      .then(result => {
        return db.ProjectDeveloper.destroy({
          where: {
            ProjectId: req.params.pid
          }
        });
        
      }).then((result, err) => {
        res.status(200).send("project was accepted");
      })

  });

  //what the developer sees after logging in
  //going to need this route to get data to dev profile
  //REMOVED CHECKAUTH FROM ROUTE TO TEST PUT IT BACK BEFORE YOU LEAVE
  //=========================================================================
  app.get("/devProfile/:id", checkAuth, (req, res) => {
    let developerOb;
    let invitedProjectsOb;
    let acceptedProjectsOb;
    db.Developer.findOne({ where: { id: req.params.id } })
      .then((result, err) => {
        if (err) throw err;
        developerOb = result.get();
        console.log(developerOb);
        return db.Project.findAll({ where: { DeveloperId: req.params.id } });
      })
      .then((result, err) => {
        if (err) throw err;
        acceptedProjectsOb = result;
        console.log(acceptedProjectsOb);
        return db.ProjectDeveloper.findAll({
          where: { DeveloperId: req.params.id }
        });
      })
      .then((result, err) => {
        if (err) throw err;
        let projIdArr = [];
        invitedProjectsOb = result;
        console.log(invitedProjectsOb);
        for(var i = 0; i < invitedProjectsOb.length; i++){
          console.log(invitedProjectsOb[i].dataValues);
          projIdArr.push(invitedProjectsOb[i].dataValues.ProjectId);
        }
        /*
        invitedProjectsOb.forEach(element => {
          projIdArr.push(element.ProjectId) 
        });
        */
       console.log(projIdArr);

       return db.Project.findAll({
        where: {
          id: projIdArr
        }
       });
        
      })
      .then((result, err) => {
        if (err) throw err;
        
        res.status(200).json({
          developer: developerOb,
          acceptedProject: acceptedProjectsOb,
          invitedProjects: result
        });
      });

    //get projects user was invited to
  });

  //what the customer sees after logging in
  //need this route to send customer component his data
  //===================================================================================
  app.get("/customerProfile/:id", checkAuth, (req, res) => {
    console.log("made it to the cust profile page");
    console.log("Customer Control");
    let customerData;

    db.Customer.findOne({
      where: {
        id: req.params.id
      }
    })
      .then((result, err) => {
        if (err) throw err;
        customerData = result.dataValues;
        db.Project.findAll({
          where: {
            CustomerId: req.params.id
          }
        })
          .then(result => {
            let completeProjects = result.filter(x => x.isComplete == 1);
            let notCompleteProjects = result.filter(y => y.isComplete == 0);
            console.log("Thisis the not complete project", notCompleteProjects);
            res.status(200).json({
              name: customerData.name,
              photo: customerData.photo,
              completeProjects: completeProjects,
              notCompleteProjects: notCompleteProjects
            });
          })
          .catch(err => {
            if (err) throw err;
          });
      })
      .catch(err => {
        if (err) throw err;
      });
  });
};
