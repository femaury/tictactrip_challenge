-- Deploy tictactrip:tables/limits to pg
-- requires: tables/users

BEGIN;

CREATE TABLE limits (
    id                  SERIAL      PRIMARY KEY,
    user_id             INT         REFERENCES users (id) ON DELETE CASCADE,
    date                DATE        NOT NULL DEFAULT CURRENT_DATE,
    words               INT         NOT NULL DEFAULT 0
);

COMMIT;
