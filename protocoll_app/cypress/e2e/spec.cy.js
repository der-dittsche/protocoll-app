describe("Logging In", () => {
  const username = "//";
  const password = "//";

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
