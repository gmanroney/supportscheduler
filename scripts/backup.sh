#!/bin/bash
TIMESTAMP=`date +%Y%M%d%H%m`
BACKUP_DIR="../backup/${TIMESTAMP}"
mkdir ${BACKUP_DIR}

cp -rv ../README.md ${BACKUP_DIR}
cp -rv ../config ${BACKUP_DIR}
cp -rv ../controller ${BACKUP_DIR}
cp -rv ../dist ${BACKUP_DIR}
cp -rv ../functions ${BACKUP_DIR}
cp -rv ../models ${BACKUP_DIR}
cp -rv ../package.json ${BACKUP_DIR}
cp -rv ../public ${BACKUP_DIR}
cp -rv ../scripts ${BACKUP_DIR}
cp -rv ../src ${BACKUP_DIR}
cp -rv ../test ${BACKUP_DIR}

# Exit Script
exit 0
