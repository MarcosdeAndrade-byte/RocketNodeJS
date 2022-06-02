/* eslint-disable prettier/prettier */
import fs from 'fs';

import { parse } from 'csv-parse';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
    name: string;
    description: string;
}

class ImportCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        // Temos que colocar nosso código dentro de uma Promise para fazer com que o node espere o retorno da função
        return new Promise((resolve, reject) => {
            // Criamos uma stream
            const stream = fs.createReadStream(file.path);

            // Criamos a variável categories do tipo IImportCategory[] que recebe um array
            const categories: IImportCategory[] = [];

            // criamos um csv-parse que vai ler linha por linha do arquivo
            const parseFile = parse();

            // Passamos os dados da stream para variável parseFile
            stream.pipe(parseFile);

            // Método utilizado para inserir as categorias do arquivo CSV(O on é um método )
            parseFile.on('data', async line => {
                const [name, description] = line;
                categories.push({
                      name,
                      description,
                   });
            }).on('end', () => {
                resolve(categories);
            }).on('error', (err) => {
                reject(err);
            });
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        console.log(categories);
    }
}

export { ImportCategoryUseCase };
