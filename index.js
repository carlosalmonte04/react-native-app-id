#!/usr/bin/env node

const newID = process.argv[2];
const newName = process.argv[3];
const _ = require("lodash");
const fs = require("fs");

if (newID && newID.split(".").length < 2) {
    console.log("Please type a valid bundle id e.g. com.solidstategroup.myapp");
    return;
}

const errorHandler = e => console.log("ERROR: ", e);
const successHandler = platform => {
    _.each(platform, (data, location) => {
        console.log(`Writing ${location}`);
        fs.writeFileSync(location, data);
    });
};

const changeAndroid = require("./src/android")(newID, newName)
    .then(successHandler)
    .catch(errorHandler);

const changeIos = require("./src/ios")(newID, newName)
    .then(successHandler)
    .catch(errorHandler);

Promise.all([changeIos, changeAndroid])
    .then(() => {
        console.log("SUCCESS");
    })
    .catch(errorHandler);
