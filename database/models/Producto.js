module.exports = (sequelize, dataTypes) => {
    let alias = 'Peliculas';

    let cols = {
        producto_id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        nombre: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        marca: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        tamanio: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        color: {
            type: dataTypes.STRING(30)
        },
        precio: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        fabricante: {
            type: dataTypes.STRING(45)
        },
        modelo: {
            type: dataTypes.STRING(45)
        },
        stock: {
            type: dataTypes.INTEGER
        },
        descuento: {
            type: dataTypes.INTEGER
        },
        imagen: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        descripcion: {
            type: dataTypes.STRING(300),
            allowNull: false
        },
    }

    let config= {
        tableName: 'Productos',
        timeStamp: false
    }

    const Producto = sequelize.define(alias,cols,config)

    return Producto;
}