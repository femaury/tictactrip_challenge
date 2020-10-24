-- Verify tictactrip:tables/users on pg

BEGIN;

SELECT id
    , email
FROM users
WHERE false;

ROLLBACK;
