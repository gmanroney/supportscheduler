#!/bin/bash
# Set Verbose Logging
set -x

# Configuration Parameters
TIMESTAMP=`date +%Y%M%d%H%m`

# Log start of backup
echo "`date`:$0: Backup started" >> logs/backup.log

# Make Backup Directory
BACKUP_DIR="backup/${TIMESTAMP}"
mkdir -p ${BACKUP_DIR}

# Backup Application Directories
cp -rv README.md ${BACKUP_DIR}
cp -rv config ${BACKUP_DIR}
cp -rv dist ${BACKUP_DIR}
cp -rv functions ${BACKUP_DIR}
cp -rv models ${BACKUP_DIR}
cp -rv package.json ${BACKUP_DIR}
cp -rv public ${BACKUP_DIR}
cp -rv scripts ${BACKUP_DIR}
cp -rv src ${BACKUP_DIR}
cp -rv test ${BACKUP_DIR}

# Log end of backup
echo "`date`:$0: Backup finished" >> logs/backup.log

# Exit Script
exit 0
