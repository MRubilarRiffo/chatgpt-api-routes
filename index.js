const server = require('./src/config/server');
const { logMessage } = require('./src/helpers/logMessage');

const PORT = 3001;

server.listen(PORT, () => logMessage(`Server listening on port ${PORT}`));