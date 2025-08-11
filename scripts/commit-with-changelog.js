#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get commit message from git (after staging)
const gitStatus = execSync('git status --porcelain', { encoding: 'utf-8' });
if (!gitStatus.trim()) {
  console.log('No changes to commit');
  process.exit(0);
}

// Function to update CHANGELOG.md
function updateChangelog(commitMessage) {
  const changelogPath = path.join(process.cwd(), 'CHANGELOG.md');
  
  if (!fs.existsSync(changelogPath)) {
    console.log('CHANGELOG.md not found');
    return;
  }
  
  const branch = execSync('git branch --show-current', { encoding: 'utf-8' }).trim();
  const date = new Date().toISOString().replace('T', ' ').substring(0, 19);
  
  // Generate a hash based on the message and date (approximation of git hash)
  const crypto = require('crypto');
  const tempHash = crypto.createHash('sha1')
    .update(`${date}${commitMessage}${branch}`)
    .digest('hex')
    .substring(0, 7);
  
  const changelogContent = fs.readFileSync(changelogPath, 'utf-8');
  const lines = changelogContent.split('\n');
  
  // Find the commit history section
  let insertIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('## Commit History')) {
      // Skip the header and the description line
      insertIndex = i + 3;
      break;
    }
  }
  
  if (insertIndex === -1) {
    console.log('Could not find Commit History section in CHANGELOG.md');
    return;
  }
  
  // Insert the new entry
  const newEntry = [
    `### ${date} [${branch}] (${tempHash})`,
    `- ${commitMessage}`,
    ''
  ];
  
  lines.splice(insertIndex, 0, ...newEntry);
  
  // Write back to file
  fs.writeFileSync(changelogPath, lines.join('\n'));
  
  // Stage the updated CHANGELOG
  execSync('git add CHANGELOG.md');
  
  console.log('✅ CHANGELOG.md updated');
}

// Get commit message from command line args or prompt for it
const args = process.argv.slice(2);
let commitMessage = args.join(' ');

if (!commitMessage) {
  console.log('Please provide a commit message');
  process.exit(1);
}

// Update changelog first
updateChangelog(commitMessage);

// Then make the commit
try {
  execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
  
  // Get the commit hash for display
  const commitHash = execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim();
  console.log(`✅ Commit ${commitHash} created with CHANGELOG entry`);
} catch (error) {
  console.error('Commit failed:', error.message);
  process.exit(1);
}