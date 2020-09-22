const express = require('express');

const db = require('../models');

// const dept = require('../models/department');

// // When I visit localhost:8080/routes in browser, it states that dept.findAll() is not a function. I'm thinking that maybe this is because we are unable to pass the parameters in index.js?
// router.get('/', (req, res) => db.department.findAll()
//   .then((routes) => {
//     console.log(routes);
//     res.sendStatus(200);
//   })
//   .catch((err) => console.log(err)));

// module.exports = router;

module.exports = function (app) {
  app.get('/', (req, res) => {
    db.feed.findAll({})
      .then((feedData) => {
        const postArray = [];
        feedData.forEach((post) => {
          postArray.push(post.dataValues);
        });
        const hbsObject = {
          feeds: postArray,
        };
        res.render('index', hbsObject);
      });
  });

  app.get('/request/:id', (req, res) => {
    // this breaks atm if the  employee has no requests :(
    db.request.findAll({
      where: { employeeId: req.params.id },
      include: [{ model: db.employee }],
    })
      .then((data) => {
        const fName = data[0].dataValues.employee.dataValues.employee_first;
        const upcomingRequests = [];
        data.forEach((request) => {
          const d = request.dataValues;
          const dateCreated = d.createdAt;
          const startDate = d.start;
          const endDate = d.end;
          let status = d.approved;
          if (status === null) {
            status = 'pending';
          }
          upcomingRequests.push({
            dateCreated, startDate, endDate, status,
          });
          console.log(status);
        });
        res.render('request', { name: fName, upcomingRequests });
      });
  });
};
