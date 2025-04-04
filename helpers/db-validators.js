// ! Funciones que me serviran junto con el custom, para validaciones
const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Categoria = require("../models/categoria");
const { request } = require('express');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}
// Funcion da un error, si el correo ya esta registrado
const emailExiste = async (correo = '') => {
    // Verificar el correo existente en la base de datos
    if (await Usuario.findOne({ correo })) {
        throw new Error(`El correo ${correo}, ya está registrado. Por favor, digita otro correo electronico`);
    }

}
const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id ${id} no está registrado en la BD`);
    }


}
// Validadores de categoria: 
// Valida que la categoria exista y no este eliminada por id
const existeCategoriaId = async (id) => {
    const existeCategoria = await Categoria.findOne({ _id: id, estado: true });
    if (!existeCategoria) {
        throw new Error(`El id ${id} no se encuentra en la BD`);
    }

}
// Valida que la categoria exista y no este eliminada por Nombre

const existeCategoriaNombre = async (nombre) => {
    const nombreMayuscula = nombre.toUpperCase();
    const existeCategoria = await Categoria.findOne({ nombre: nombreMayuscula, estado: true });
    if (existeCategoria) {
        throw new Error(`El nombre ${nombre}, ya se encuentra en la BD`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaId,
    existeCategoriaNombre,
}