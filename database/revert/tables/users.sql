-- Revert tictactrip:tables/users from pg

BEGIN;

DROP TABLE users;

COMMIT;
