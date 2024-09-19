module.exports = {
 name: "errorTest",
 aliases: ["et"],
 description: "Test Error",
 timeout: 5000,
 category: "errorTest",
 run: (client, message) => {
  throw new Error("Test Error");
 },
};
