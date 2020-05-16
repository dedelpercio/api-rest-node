'use strict'
const Project = require('../models/project')

function getProject(req,res) {
    let projectId = req.params.projectId;

    Project.findById(projectId, (err, project) => {
        if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
        if(!project) return res.status(404).send({message: `el proyecto no existe`})
        res.status(200).send({project})
    });
}

function getProjects(req,res) {
    Project.find({}, (err, projects) => {
        if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
        if(!projects) return res.status(404).send({message: `No existen proyectos.`})
        res.status(200).send({projects})
    })
}

function saveProject(req,res) {
    let project = new Project();
    project.name = req.body.name;
    project.picture = req.body.picture;
    project.category = req.body.category;
    project.description = req.body.description;

    project.save((err, projectStored) => {
        if (err) res.status(500).send({message: `Error al guardar en base de datos: ${err}`})
        res.status(200).send({project: projectStored})
    })
}

function updateProject(req,res) {
    let projectId = req.params.projectId;
    let update = req.body;

    Project.findByIdAndUpdate(projectId, update, (err, projectUpdated) => {
        if(err) return res.status(500).send({message: `Error al actualizar el proyecto: ${err}`})
        res.status(200).send({project: projectUpdated})
    })
}

function deleteProject(req,res) {
    let projectId = req.params.projectId;

    Project.findById(projectId, (err, project) => {
        if(err) return res.status(500).send({message: `Error al borrar el proyecto: ${err}`})
        if(project) { // if project is null
            project.remove(err => {
                if(err) return res.status(500).send({message: `Error al borrar el proyecto: ${err}`})
                res.status(200).send({message: `El proyecto ha sido eliminado`})
            })
        } else {
            return res.status(400).send({message: `Error al borrar el proyecto: ${err} - El proyecto ya no existe en la base de datos.`})
        }
    })
}

module.exports = {
    getProject,
    getProjects,
    saveProject,
    updateProject,
    deleteProject
}
