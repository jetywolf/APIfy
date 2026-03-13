CREATE TABLE IF NOT EXISTS apis (
  id          TEXT    PRIMARY KEY,
  name        TEXT    NOT NULL,
  description TEXT    NOT NULL,
  code        TEXT    NOT NULL,
  endpoints   TEXT    NOT NULL,
  calls_count INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);
