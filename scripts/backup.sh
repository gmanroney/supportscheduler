#!/bin/bash
# Set Verbose logging
set -x

# Configuration Parameters
TIMESTAMP=`date +%Y%M%d%H%m`

# Make Backup Directory
BACKUP_DIR="../backup/${TIMESTAMP}"
mkdir ${BACKUP_DIR}

# Backup Application Directories
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
