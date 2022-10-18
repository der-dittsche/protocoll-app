describe("Logging In", () => {
  const username = "sascha@user.de";
  const password = "Lotta2013!";

  it("passes", () => {
    cy.visit("http://localhost:5173");
  });

  it("with authorization", () => {
    cy.request({
      url: "http://localhost:5173/#/auth",
      auth: {
        username,
        password,
      },
    })
      .its("status")
      .should("equal", 200);
  });

  it("loads the page using basic auth", () => {
    cy.visit("http://localhost:5173/#/auth", {
      auth: {
        username,
        password,
      },
    });
  });
});
