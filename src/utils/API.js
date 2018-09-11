// import React from "react";
import axios from "axios";

// var keys = require("../keys");

export default {
    //job, type, country, city category, type, location, keywords
    getJobsAuthenticJobs : () => {
        // if(!job && !country && !city && !type){
            return axios.get("https://cors-anywhere.herokuapp.com/https://authenticjobs.com/api/?api_key=" + "fd79f0c01d6945b2fde8f095428800e9" + "&method=aj.jobs.search&format=json")
            // }
        },
    getJobCategories: () => {
        return axios.get("https://cors-anywhere.herokuapp.com/https://authenticjobs.com/api/?api_key="+ "fd79f0c01d6945b2fde8f095428800e9" + "&method=aj.categories.getList&format=json")
    },

    getAdzunaJobs: () => {
        return axios.get("http://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=17711746&app_key=cd7075866de3337b020259dba06d0b68&results_per_page=20&what=javascript%20developer&content-type=application/json")
    },

    saveArticle: (data) => {
        return axios.post("/saved", data);
    }
}
