export default `
CREATE TABLE "Rents" (
  id SERIAL PRIMARY KEY,
  rentPeriod INT,
  vin INT,
  price INT,
  "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now()
);
`;
