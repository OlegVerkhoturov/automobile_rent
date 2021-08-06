export default `
CREATE TABLE "Discounts" (
  id SERIAL PRIMARY KEY,
  percent INT,
  minDays INT,
  maxDays INT,
  "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now()
);
`;
