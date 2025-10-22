import { DataTypes, Model, Optional } from "sequelize"
import sequelizeDB from "../db/sequelize.db"

export enum BookTranEpContentType{
    NOVEL = 'novel',
    AUDIO = 'audio',
    VIDEO = 'video',
    WEBTOON = 'webtoon'
}

export enum BookTranEpPublish{
    PUBLISH = 'publish',
    PRIVATE = 'private'
}

export enum YesNo{
    YES = 'yes',
    NO = 'no'
}

interface BookTranEpAttributes{
    ep_id: number;
    epID: string;
    group_id: number;
    book_id: number;
    name: string;
    coin: number;
    freecoin: number;
    content_length?: string;
    content_type? : BookTranEpContentType;
    content: string;
    publish_datetime: Date;
    update_at?: Date;
    publish: BookTranEpPublish;
    view?: number;
    order_by: number;
    noti_add: number;
}

type BookTranEpCratetionAttributes = Optional<
    BookTranEpAttributes,
    "ep_id" >;

class BookTranEp extends Model<BookTranEpAttributes, BookTranEpCratetionAttributes>
implements BookTranEpAttributes
{
    declare ep_id: number;
    declare epID: string;
    declare group_id: number;
    declare book_id: number
    declare name: string;
    declare coin: number;
    declare freecoin: number;
    declare content_length?: string;
    declare content_type? : BookTranEpContentType;
    declare content: string;
    declare publish_datetime: Date;
    declare update_at?: Date;
    declare publish: BookTranEpPublish
    declare view?: number;
    declare order_by: number;
    declare noti_add: number;
}

BookTranEp.init(
    {
        ep_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,    
            primaryKey: true
        },
        epID: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        group_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        book_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }, 
        coin: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        freecoin: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        content_length: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        content_type: {
            type: DataTypes.ENUM(...Object.values(BookTranEpContentType)),
            allowNull: true, 
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        publish_datetime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        update_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        publish: {
            type: DataTypes.ENUM(...Object.values(BookTranEpPublish)),
            allowNull: false,
            defaultValue: BookTranEpPublish.PUBLISH,
        },
        view: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        order_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        noti_add: {
            type: DataTypes.ENUM(...Object.values(YesNo)),
            allowNull: false,
        },
    },    
    {
        sequelize: sequelizeDB,
        tableName: "book_tran_ep",
        timestamps: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
    }
);

export default BookTranEp;