import { Request, Response } from "express";
import CreateCourseService from "./CreateCourseService";

export function createCourse(request : Request,response: Response){
    CreateCourseService.execute({
        name: "Node.js",
        educator: "Dani",
        duration: 10
    });
    CreateCourseService.execute({
        name: "Js",
        educator: "Marcos",
        //duration: 10 <-- Vamos ver que a duração vai ser sobrescrita pelo valor default
    });
    return response.send();
}