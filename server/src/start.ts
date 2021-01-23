import IntranetServer from './IntranetServer';

// Start the server or run tests
if (process.argv[2] !== 'test') {

    let server = new IntranetServer();
    server.start();

} else { }