import { DataTypes, Model, Optional} from "sequelize";
import sequelize from "../db/sequelize";
import { userInfo } from "os";

export enum RoleStatus{
    USER = 'user',
    WRITER = 'writer',
    ADMIN = 'admin'
}

interface UserAttributes{
    id: number;
    user_id: string;
    user_pwd: string;
    username: string;
    role: RoleStatus;
    createdAt?: Date;
    updatedAt?: Date;
}

//ตอนสร้าง record ใหม่ไม่ต้องใส่ id เพราะระบบจะ auto-increment ให้เอง
interface UserCreationAttributes extends Optional<UserAttributes, "id">{}

//ใช้ UserAttributes เป็น type ของข้อมูลใน modelและ UserCreationAttributes เป็น type สำหรับตอนสร้างข้อมูลใหม่
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes{
    declare id: number;
    declare user_id: string;
    declare user_pwd: string
    declare username: string;
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
        user_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_pwd: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM(...Object.values(RoleStatus)),
            allowNull:false
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    },
    {
        sequelize,
        tableName: "user",
        timestamps: true,
    }
);



export default User;