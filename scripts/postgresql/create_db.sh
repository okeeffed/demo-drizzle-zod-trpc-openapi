#!/bin/bash
# Make sure you have created a local user `createuser prisma --superuser --createdb` on your machine.
createdb $1 -U prisma
createdb $1_shadow -U prisma
# Assuming `prisma` has been created
psql -d $1 -c "GRANT ALL PRIVILEGES ON DATABASE $1 TO prisma; GRANT ALL PRIVILEGES ON DATABASE $1_shadow TO prisma;"
