-- CREATE DATABASE IF NOT EXISTS ComposeTest --
SELECT 'CREATE DATABASE ComposeTest'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'ComposeTest')\gexec
