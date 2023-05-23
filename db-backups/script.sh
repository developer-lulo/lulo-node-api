#!/bin/bash

# Set variables

## LOCAL
# DB_HOST="localhost"
# DB_PASSWORD="1qaz2wsx"

## PROD 
DB_HOST="34.133.222.229"
DB_PASSWORD="dmrHYt3f7^wg^CPYKs^zQdAi1u6Lq*#" 

DB_PORT="3306"
DB_USER="root"
DB_NAME="lulo"
BACKUP_DIR="./backups"
BUCKET_NAME="lulo-db-backups"
SERVICE_ACCOUNT_KEY="./lulo-380819-a3e0e142c1df.json"

# Authenticate with the service account key
gcloud auth activate-service-account --key-file="$SERVICE_ACCOUNT_KEY"

# Generate backup filename
CURRENT_DATE=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_FILE="$BACKUP_DIR/backup_$CURRENT_DATE.sql"

# Perform the backup using mysqldump // --skip-lock-tables to avoid 5.7 mysql errors 
mysqldump --host=$DB_HOST --port=$DB_PORT --user=$DB_USER --password=$DB_PASSWORD --skip-lock-tables $DB_NAME > $BACKUP_FILE

# Optional: Compress the backup file
# gzip $BACKUP_FILE

# Upload the backup file to Google Cloud Storage
# gsutil cp $BACKUP_FILE.gz gs://$BUCKET_NAME/