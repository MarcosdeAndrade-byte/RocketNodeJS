/*
name - String
Duration - number 
educator - String
*/

//Como a classe deve se parecer(Tudo que está dentro da interface deve ser implementado)
interface Course{
    name : string;
    duration?: number; //<-- Atributo Opcional
    educator: string;
}

class CreateCourseService{
    //Se passarmos um valor diretamente no argumento estamos definindo o valor default
    execute({duration = 8,educator,name}:Course){
        console.log(duration,educator,name);
    }
}

export default new CreateCourseService();