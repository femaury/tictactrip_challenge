-- Deploy tictactrip:tables/users to pg

BEGIN;

CREATE TABLE users (
    id                  SERIAL      PRIMARY KEY,
    email               TEXT        UNIQUE NOT NULL
);

COMMIT;
