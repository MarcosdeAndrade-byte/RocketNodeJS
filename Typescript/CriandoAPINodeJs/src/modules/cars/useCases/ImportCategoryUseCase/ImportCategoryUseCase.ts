import fs from 'fs';

import { parse } from 'csv-parse';

class ImportCategoryUseCase {
    execute(file: Express.Multer.File): void {
        // Criamos uma stream
        const stream = fs.createReadStream(file.path);

        // criamos um csv-parse que vai ler linha por linha do arquivo
        const parseFile = parse();

        // Passamos os dados da stream para variável parseFile
        stream.pipe(parseFile);

        // utilizamos criamos uma função para mostrar os dados da stream
        parseFile.on('data', async line => {
            console.log(line);
        });
    }
}

export { ImportCategoryUseCase };
