import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const getJSON = async () => {
	const filePath = path.resolve(__dirname, '../assets/first.json');
	const file = await readFile(filePath);
	return `{"message": "Read file successfully", "data": ${file}}`;
};

const setJSON = async (data) => {
	const filePath = path.resolve(__dirname, '../assets/first.json');
	let file = await readFile(filePath);
	file = JSON.parse(file);
	file.employees.push(JSON.parse(data));
	file = JSON.stringify(file);
	file = await writeFile(filePath, file);
	return `{"message": "Read file successfully", "data": ${file}}`;
};

export { getJSON, setJSON };
