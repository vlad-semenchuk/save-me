#!/bin/bash
# Script to update CHANGELOG.md with commit information

# Get the commit message from argument or use a default
COMMIT_MSG="${1:-Work in progress}"
BRANCH=$(git branch --show-current)
COMMIT_DATE=$(date '+%Y-%m-%d %H:%M:%S')

# Generate a temporary hash for tracking
TEMP_HASH=$(echo "$COMMIT_DATE$COMMIT_MSG" | shasum | cut -c1-7)

# Path to CHANGELOG.md
CHANGELOG="CHANGELOG.md"

# Create a temporary file
TEMP_FILE=$(mktemp)

# Read the existing CHANGELOG content and insert new entry
if [ -f "$CHANGELOG" ]; then
    awk -v hash="$TEMP_HASH" -v msg="$COMMIT_MSG" -v date="$COMMIT_DATE" -v branch="$BRANCH" '
    /^## Commit History/ {
        print
        getline
        print
        getline
        print
        print "### " date " [" branch "] (" hash ")"
        print "- " msg
        print ""
        next
    }
    {print}
    ' "$CHANGELOG" > "$TEMP_FILE"
    
    # Replace the original file
    mv "$TEMP_FILE" "$CHANGELOG"
    
    echo "✅ CHANGELOG.md updated with: $COMMIT_MSG"
fi