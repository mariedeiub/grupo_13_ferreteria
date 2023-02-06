module.exports = (sequelize, dataTypes) => {
    let alias = 'Usuarios';


    let cols = {
        usuario_id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        categoria_id: {
            
            foreignKey: true,
            type: dataTypes.INTEGER      

        },
        nombre: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        apellido: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        direccion: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        localidad: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        pais: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        edad: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        nombre_Usuario: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
       contraseña:{
       type: dataTypes.STRING(30),
            allowNull: false
    },
    imagen:{
        type: dataTypes.STRING(100),
             allowNull: false
     },
     
    }
    let config= {
        tableName: 'Usuarios',
        timestamps: false
    }
   
    const Usuario= sequelize.define(alias,cols,config)

    return Usuario;
}