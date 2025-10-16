import { DataTypes, Model, Optional } from "sequelize"
import sequelizeDB from "../db/sequelize"

export enum BookType{
    NOVEL = "novel",
    CHAT = "chat"
}

interface BookAttributes{
    id: number,
    book_id: string,
    type: string,
    img: string,
    title: string,
    intro: string,
    description: string,
    createdAt?: Date,
    updatedAt?: Date
}

type BookCratetionAttributes = Optional<
    BookAttributes,
    "id" | "createdAt" | "updatedAt"
>;

class Book extends Model<BookAttributes, BookCratetionAttributes>
implements BookAttributes
{
    declare id: number;
    declare book_id: string;
    declare type: string ;
    declare img: string ;
    declare title: string ;
    declare intro: string ;
    declare description : string ;
    declare createdAt?: Date ;
    declare updatedAt?: Date ;
}


Book.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        book_id: {
            type: DataTypes.STRING(255),
            allowNull:false
        },
        type: {
            type: DataTypes.ENUM(...Object.values(BookType)),
            allowNull: false,
            defaultValue: BookType.NOVEL
        },
        img: {
            type: DataTypes.STRING(255),
            allowNull:false
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull:false
        },
        intro: {
            type: DataTypes.STRING(255),
            allowNull:false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull:false
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },    
    {
        sequelize: sequelizeDB,
        tableName: "books",
        timestamps: true
    }
)

Book.sync({force:false})

export default Book