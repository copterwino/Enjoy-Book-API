import { DataTypes, Model, Optional } from "sequelize"
import sequelizeDB from "../db/sequelize.db"

export enum BookType{
    WRITE = 'write',
    TRAN = 'tran',
    SOUND = 'sound',
    FANFIC = 'fanfic',
    CHAT = 'chat',
    WEBTOON = 'webtoon',
    FLIM = 'flim'
}

export enum BookStatus{
    PUBLISH = "publish",
    PRIVATE = "private",
    DELETE = "delete",
    WAIT = "wait"
}

export enum BookEndState{
    NOT_END = "not_end",
    END = "end",
}

export enum BookNotiAdd{
    YES = "yes",
    NO = "no"
}


interface BookTranAttributes{
    book_id: number; //PK
    bookID: string; //FK
    type: BookType;
    img: string;
    name: string;
    title: string;
    tag: string;
    cat1: number;
    cat2: number;
    rate: number;
    des: string;
    user_id: number; //FK
    update_at?: Date | null;
    status: BookStatus;
    view?: number;
    date_at?: Date | null; //วันที่เผยแพร่
    heart?: number;
    flower?: number;
    end: BookEndState;
    bgimg?: string | null;
    noti_add: BookNotiAdd;
    accept_conditions?: string | null;
    user_freecoin: number;
    fast_status: number;
}

type BookTranCratetionAttributes = Optional<
    BookTranAttributes,
    "book_id" >;

class BookTran extends Model<BookTranAttributes, BookTranCratetionAttributes>
implements BookTranAttributes
{
    declare book_id: number; //PK
    declare bookID: string; //FK
    declare type: BookType;
    declare img: string;
    declare name: string;
    declare title: string;
    declare tag: string;
    declare cat1: number;
    declare cat2: number;
    declare rate: number;
    declare des: string;
    declare user_id: number; //FK
    declare update_at: Date | null;
    declare status: BookStatus;
    declare view: number;
    declare date_at: Date | null; //วันที่เผยแพร่
    declare heart: number;
    declare flower: number;
    declare end: BookEndState;
    declare bgimg?: string | null;
    declare noti_add: BookNotiAdd;
    declare accept_conditions?: string | null;
    declare user_freecoin: number;
    declare fast_status: number;
}


BookTran.init(
    {
        book_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        bookID: {
            type: DataTypes.STRING(100),
            allowNull:false
        },
        type: {
            type: DataTypes.ENUM(...Object.values(BookType)),
            allowNull: false,
            comment: Object.values(BookType).join(', ')
        },
        img: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        tag: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        cat1: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        cat2: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        rate: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        des: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status:{
            type: DataTypes.ENUM(...Object.values(BookStatus)),
            allowNull: false,
            defaultValue: BookStatus.PUBLISH,            
        },
        view: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        date_at: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            defaultValue: DataTypes.NOW
        },
        update_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
        heart: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        flower: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        end: {
            type: DataTypes.ENUM(...Object.values(BookEndState)),
            allowNull: false,
            defaultValue: BookEndState.NOT_END,
            comment: Object.values(BookEndState).join(', ')
        },
        bgimg: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null
        },
        noti_add: {
            type: DataTypes.ENUM(...Object.values(BookNotiAdd)),
            allowNull: false,
            defaultValue: BookNotiAdd.NO
        },
        accept_conditions: {
            type: DataTypes.STRING(20),
            allowNull: true,
            defaultValue: null
        },
        user_freecoin: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        fast_status: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0
        }
    },    
    {
        sequelize: sequelizeDB,
        tableName: "book_tran",
        //timestamps: true
    }
)

BookTran.sync({
    force: false,
    alter: true
})

export default BookTran