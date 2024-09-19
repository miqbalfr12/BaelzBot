module.exports = {
 name: "errortest",
 aliases: ["et"],
 description: "Test Error",
 timeout: 5000,
 category: "errortest",
 run: (client, message) => {
  throw new Error("Test Error");
 },
};
