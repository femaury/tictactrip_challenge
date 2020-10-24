-- Verify tictactrip:tables/limits on pg

BEGIN;

SELECT id
    , user_id
    , date
    , words
FROM limits
WHERE false;

ROLLBACK;
