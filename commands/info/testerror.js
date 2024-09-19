module.exports = {
 name: "testerror",
 aliases: ["et"],
 description: "Test Error",
 timeout: 5000,
 category: "testerror",
 run: (client, message) => {
  console.log("Test Error");
  throw new Error("Test Error");
 },
};
