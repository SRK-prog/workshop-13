var CronMasterJob = require("cron-master").CronMasterJob;

module.exports = new CronMasterJob({
  cronParams: {
    cronTime: "* * * * *",
    onTick: function (job, done) {
      callTime();
      done(null, "result");
    },
  },
});

const callTime = () => {
  let time = new Date(Date.now()).toString();
  console.log("The is date " + time);
};
