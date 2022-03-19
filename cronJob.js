var CronMasterJob = require("cron-master").CronMasterJob;

module.exports = new CronMasterJob({
  // The usual params that you pass to the "cron" module go here
  cronParams: {
    cronTime: "* * * * * *",
    onTick: function (job, done) {
      console.log("running job");
      done(null, "result");
    },
  },
});
