-- Revert tictactrip:tables/limits from pg

BEGIN;

DROP TABLE limits;

COMMIT;
