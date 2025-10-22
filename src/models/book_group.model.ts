import { DataTypes, Model, Optional } from "sequelize"
import sequelizeDB from "../db/sequelize.db"

export enum BookPublish{
    PUBLISH = 'publish',
    PRIVATE = 'private'
}

export interface BookGroupAttributes {
    group_id: number;
    book_id: number;
    groupID: string;
    name: string;
    coin: number;
    update_at?: Date | null;
    publish: BookPublish
}

type BookGroupCratetionAttributes = Optional<
    BookGroupAttributes,
    "group_id" >;

class BookGroup extends Model<BookGroupAttributes, BookGroupCratetionAttributes>
implements BookGroupAttributes{
    declare group_id: number;
    declare book_id: number;
    declare groupID: string;
    declare name: string;
    declare coin: number;
    declare update_at?: Date | null;
    declare publish: BookPublish
}

BookGroup.init(
    {
        group_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        groupID: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        coin: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        update_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
        publish: {
            type: DataTypes.ENUM(...Object.values(BookPublish)),
            allowNull: false,
            defaultValue: BookPublish.PUBLISH,
        }
    },
    {
        sequelize: sequelizeDB,
        tableName: "book_group",
        timestamps: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
    }
);

BookGroup.sync({
    force: false,
    alter: false
});

export default BookGroup;