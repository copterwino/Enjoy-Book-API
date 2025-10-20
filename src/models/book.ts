import { DataTypes, Model, Optional } from "sequelize"
import sequelizeDB from "../db/sequelize"

export enum BookType{
    NOVEL = "novel",
    CHAT = "chat"
}

export enum BookStatus{
    PUBLISH = "publish",
    PRIVATE = "private",
    DELETE = "delete",
}

export enum BookEndState{
    NOT_END = "not_end",
    END = "end",
}

export enum BookRecommended{
    YES = "yes",
    NO = "no"
}

interface BookAttributes{
    id: number,
    book_id: string,
    type: BookType,
    category: number,
    sub_category: number,
    img: string,
    by: string,
    title: string,
    intro: string,
    description: string,
    tag?: string,
    recommended?: BookRecommended,
    status?: BookStatus,
    end_state?: BookEndState,
    view? : number
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
    declare type: BookType ;
    declare category: number;
    declare sub_category: number;
    declare img: string ;
    declare by: string;
    declare title: string ;
    declare intro: string ;
    declare description : string ;
    declare tag?: string;
    declare recommended?: BookRecommended;
    declare status?: BookStatus;
    declare end_state?: BookEndState;
    declare view?: number;
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
        category: {
            type: DataTypes.TINYINT(),
            allowNull: false
        },
        sub_category: {
            type: DataTypes.TINYINT(),
            allowNull: false
        },
        img: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        by: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        intro: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        tag: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        recommended: {
            type: DataTypes.ENUM(...Object.values(BookRecommended)),
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM(...Object.values(BookStatus)),
            allowNull: true,
            defaultValue: BookStatus.PUBLISH,
        },
        end_state:{
            type: DataTypes.ENUM(...Object.values(BookEndState)),
            allowNull: true,
            defaultValue: BookEndState.NOT_END,            
        },
        view: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
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

Book.sync({alter:true})

export default Book