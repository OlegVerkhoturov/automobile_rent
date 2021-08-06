export default `
CREATE TABLE "Rates" (
  id SERIAL PRIMARY KEY,
  price INT,
  distance INT,
  name VARCHAR(256),
  "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now()
);
`;
