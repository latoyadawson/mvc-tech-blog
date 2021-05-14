const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bycrpt = require('bcrypt');

//create User model 
class User extends Model {
    //set up method to run on instance data(per user) to check password
    checkPassword(loginPw) {
        return bycrpt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
       
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //this means passowrd must be atleast four charactesr long
                len: [4]
            }
        }
    },
    {
        hooks: {
            //set up beforeCreate lifecycle 'hook' functinailty
            async beforeCreate(newUserData) {
                newUserData.password = await bycrpt.hash(newUserData.password, 10);
                return newUserData;
            
            },
            // set up beforeUpdate lifecycle "hook" functionality
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bycrpt.hash(updatedUserData.password, 10);
                return updatedUserData;
            
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;