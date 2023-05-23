#!/bin/bash

# Set variables
# Get the parent folder path
parent_folder=$(dirname "$(dirname "$(readlink -f "$0")")")

# Load environment variables from .env file in the parent folder
env_file="$parent_folder/.env"
if [[ -f "$env_file" ]]; then
    source "$env_file"
else
    echo "Error: .env file not found in the parent folder"
    exit 1
fi


DB_HOST="$LULO_DB_HOST"
DB_PASSWORD="$LULO_DB_PASS" 

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

# Perform the backup using mysqldump // 
mysqldump --host=$DB_HOST --port=$DB_PORT --user=$DB_USER --password=$DB_PASSWORD $DB_NAME > $BACKUP_FILE

# Optional: Compress the backup file
gzip $BACKUP_FILE

# Upload the backup file to Google Cloud Storage
gsutil cp $BACKUP_FILE.gz gs://$BUCKET_NAME/