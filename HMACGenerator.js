const crypto = require('crypto');

class HMACGenerator {
    constructor() {
        this.key = this.generateKey();
    }

    generateKey() {
        return crypto.randomBytes(32).toString("hex");
    }

    generateHMAC(data) {
        return crypto.createHmac('sha256', this.key).update(data).digest('hex');
    }
}

module.exports = HMACGenerator;