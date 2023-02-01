module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductosCategorias';

    let cols = {
        producto_categoria_id: {
            type: dataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        producto_fk: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        categoria_fk: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        }
    }

    let config= {
        tableName: 'ProductosCategorias',
        timestamps: false
    }

    const Producto_Categoria = sequelize.define(alias,cols,config);

    return Producto_Categoria;
}