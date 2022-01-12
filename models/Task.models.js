const { v4: uuidv4 } = require('uuid');

class Task {
    id = '';
    desc = '';
    completeOn = false;
    createdOn = '';

    constructor(desc) {
        this.id = uuidv4();
        this.desc = desc;
        this.createdOn = new Date().toISOString();
    }
}

module.exports = Task;