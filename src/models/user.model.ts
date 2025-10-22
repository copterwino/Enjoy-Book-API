import { DataTypes, Model, Optional} from "sequelize";
import sequelizeDB from "../db/sequelize.db";

export enum UserGender{
    MALE = "m",
    FEMALE = "f",
    NO = "other"
}

export enum UserPublish{
    PUBLISH = 'publish',
    PRIVATE = 'private'
}

export enum YesNo{
    YES = 'yes',
    NO = 'no'
}

interface UserAttributes{
    user_id: number;
    userID: string;
    fullname: string;
    writer_name: string;
    phone: string;
    address_main: string;
    email: string;
    pwsd: string;
    banner: string;
    img: string;
    des: string;
    facebook: string;
    twitter: string;
    coin: number;
    freecoin: number;
    heart: number;
    flower: number;
    coupon: number;
    exp_point: number;
    stamp: number;
    wheel: number;
    fast_ticket: number;
    coin_income: number;
    gender: UserGender;
    birthday: Date;
    percent: number;
    percent_donate: number;
    publish: UserPublish;
    register_date: Date;
    cat1: number;
    cat2: number;
    mail_sub: YesNo;
    frame_id: number;
    aka_id: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, "user_id">{}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes{
    declare user_id: number;
    declare userID: string;
    declare fullname: string;
    declare writer_name: string;
    declare phone: string;
    declare address_main: string;
    declare email: string;
    declare pwsd: string;
    declare banner: string;
    declare img: string;
    declare des: string;
    declare facebook: string;
    declare twitter: string;
    declare coin: number;
    declare freecoin: number;
    declare heart: number;
    declare flower: number;
    declare coupon: number;
    declare exp_point: number;
    declare stamp: number;
    declare wheel: number;
    declare fast_ticket: number;
    declare coin_income: number;
    declare gender: UserGender;
    declare birthday: Date;
    declare percent: number;
    declare percent_donate: number;
    declare publish: UserPublish;
    declare register_date: Date;
    declare cat1: number;
    declare cat2: number;
    declare mail_sub: YesNo;
    declare frame_id: number;
    declare aka_id: number;
}

//กรุณาตรวจทาน
User.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true
        },
        userID: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        fullname: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        writer_name: {
            type: DataTypes.STRING(100),
            allowNull: false    
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        address_main: {
            type: DataTypes.STRING(255),
            allowNull: false
        }, 
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        pwsd: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
        ,
        banner: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        img: {
            type: DataTypes.STRING(255),
            allowNull: false
        }, 
        des: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        facebook: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        twitter: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        coin: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        freecoin: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
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
        coupon: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        exp_point: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        stamp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        wheel: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        fast_ticket: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        coin_income: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        gender: {
            type: DataTypes.ENUM(...Object.values(UserGender)),
            allowNull: false,
            defaultValue: UserGender.NO
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: false
        },
        percent: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        percent_donate: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        publish: {
            type: DataTypes.ENUM(...Object.values(UserPublish)),
            allowNull: false,
            defaultValue: UserPublish.PUBLISH
        },
        register_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        cat1: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        cat2: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        mail_sub: {
            type: DataTypes.ENUM(...Object.values(YesNo)),
            allowNull: false,
            defaultValue: YesNo.YES
        },
        frame_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        aka_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        sequelize: sequelizeDB,
        tableName: "users",
        timestamps: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
    }
)