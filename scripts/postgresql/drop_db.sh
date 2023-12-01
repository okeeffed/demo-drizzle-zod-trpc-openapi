#!/bin/bash
# If you need to drop user:
# psql -c "DROP USER 'prisma'@'localhost';"
dropdb $1
dropdb $1_shadow
