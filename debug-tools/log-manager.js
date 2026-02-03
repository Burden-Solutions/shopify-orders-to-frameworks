const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '..', '..', 'logs');

async function manageLogs() {
  try {
    console.log('📊 Log Management Tool');
    console.log('=====================');

    if (!fs.existsSync(logsDir)) {
      console.log('❌ Logs directory not found');
      process.exit(1);
    }

    const logFiles = fs.readdirSync(logsDir);
    
    if (logFiles.length === 0) {
      console.log('📋 No log files found');
      process.exit(0);
    }

    console.log(`📁 Found ${logFiles.length} log files:\n`);

    let totalSize = 0;
    logFiles.forEach(file => {
      const filePath = path.join(logsDir, file);
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      const modified = stats.mtime.toLocaleString();
      
      console.log(`📄 ${file}`);
      console.log(`   Size: ${sizeKB} KB`);
      console.log(`   Modified: ${modified}`);
      console.log(`   Type: ${getFileType(file)}`);
      console.log('');
      
      totalSize += stats.size;
    });

    console.log(`💾 Total log size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
    
    // Show recent logs from main app log
    const appLogFile = logFiles.find(file => file.startsWith('app-') && !file.includes('.gz'));
    if (appLogFile) {
      console.log('\n📋 Recent log entries:');
      console.log('===================');
      
      const appLogPath = path.join(logsDir, appLogFile);
      const content = fs.readFileSync(appLogPath, 'utf8');
      const lines = content.split('\n').filter(line => line.trim());
      
      // Show last 10 lines
      const recentLines = lines.slice(-10);
      recentLines.forEach(line => {
        console.log(line);
      });
    }

  } catch (error) {
    console.error('❌ Error managing logs:', error.message);
    process.exit(1);
  }
}

function getFileType(filename) {
  if (filename.includes('error')) return 'Error Logs';
  if (filename.includes('debug')) return 'Debug Logs';
  if (filename.includes('exceptions')) return 'Exceptions';
  if (filename.includes('rejections')) return 'Rejections';
  return 'Application Logs';
}

// Command line options
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log('📊 Log Management Tool');
  console.log('Usage: node log-manager.js [options]');
  console.log('');
  console.log('Options:');
  console.log('  --help, -h     Show this help message');
  console.log('  --clean, -c    Clean old log files (older than 7 days)');
  console.log('');
  console.log('Examples:');
  console.log('  node log-manager.js           # Show log status');
  console.log('  node log-manager.js --clean    # Clean old logs');
  process.exit(0);
}

if (args.includes('--clean') || args.includes('-c')) {
  console.log('🧹 Cleaning old log files...');
  
  try {
    const logFiles = fs.readdirSync(logsDir);
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    let deletedCount = 0;
    let deletedSize = 0;

    logFiles.forEach(file => {
      const filePath = path.join(logsDir, file);
      const stats = fs.statSync(filePath);
      
      if (stats.mtime < sevenDaysAgo) {
        deletedSize += stats.size;
        fs.unlinkSync(filePath);
        deletedCount++;
        console.log(`🗑️ Deleted: ${file}`);
      }
    });

    console.log(`✅ Cleaned up ${deletedCount} files, freed ${(deletedSize / 1024 / 1024).toFixed(2)} MB`);
  } catch (error) {
    console.error('❌ Error cleaning logs:', error.message);
    process.exit(1);
  }
} else {
  manageLogs();
}
