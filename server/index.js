import http from 'http';
import { getJSON, setJSON } from './controllers/JsonController';

const requestListener = async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	let content;
	let body = '';
	switch (req.url) {
		case '/':
			switch (req.method) {
				case 'GET':
					content = await getJSON();
					res.writeHead(200);
					res.end(content);
					break;
				case 'POST':
					req.on('data', (data) => {
						body += data;
						// 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
						if (body.length > 1e6) {
							req.connection.destroy();
						}
					});
					req.on('end', async () => {
						content = await setJSON(body);
						res.writeHead(200);
						res.end(content);
					});
					break;
				default:
					res.writeHead(405);
					res.end('Method not allowed');
					break;
			}
			break;
		default:
			res.writeHead(404);
			res.end(`{"message": "Nothings here"}`);
	}
};
const server = http.createServer(requestListener).listen(3000);

export default server;
