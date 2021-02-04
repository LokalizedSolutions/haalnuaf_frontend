// Initialize crypto
const crypto = require('crypto');
// Generate date
var date = Date.now();
// Generate hash (export hash later on)
var hash = encodeURIComponent(crypto.createHash('sha256').update(date + "---" + process.env.SALT).digest('base64'));
// Export hash
export default hash; 