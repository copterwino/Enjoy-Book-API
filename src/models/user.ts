import { DataTypes, Model, Optional} from "sequelize";
import sequelizeDB from "../db/sequelize";
//import { userInfo } from "os";

export enum RoleStatus{
    USER = 'user',
    WRITER = 'writer',
    ADMIN = 'admin'
}

interface UserAttributes{
    id: number;
    email: string;
    user_pwd: string;
    fullname: string;
    role: RoleStatus;
    createdAt?: Date;
    updatedAt?: Date;
}

//ตอนสร้าง record ใหม่ไม่ต้องใส่ id เพราะระบบจะ auto-increment ให้เอง
interface UserCreationAttributes extends Optional<UserAttributes, "id">{}

//ใช้ UserAttributes เป็น type ของข้อมูลใน modelและ UserCreationAttributes เป็น type สำหรับตอนสร้างข้อมูลใหม่
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes{
    declare id: number;
    declare email: string;
    declare user_pwd: string
    declare fullname: string;
    declare role: RoleStatus;
    declare readonly createdAt?: Date;
    declare readonly updatedAt?: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER, 
            autoIncrement:true, 
            primaryKey: true
        },
        //email //user_id
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_pwd: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //username
        fullname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM(...Object.values(RoleStatus)),
            allowNull:false,
            defaultValue: RoleStatus.USER
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    },
    {
        sequelize: sequelizeDB,
        tableName: "users",
        timestamps: true
    }
);

User.sync({force:false});


export default User;