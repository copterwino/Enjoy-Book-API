import { DataTypes, Model, Optional } from "sequelize"
import sequelizeDB from "../db/sequelize"

export interface SubCategoryAttributes {
    id: number;
    category_id: number;
    name: string;

}

export type SubCategoryCreationAttributes = Optional<SubCategoryAttributes, "id" >;

class SubCategory extends Model<SubCategoryAttributes, SubCategoryCreationAttributes> implements SubCategoryAttributes {
    declare id: number;
    declare category_id: number;
    declare name: string;
}

SubCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category_id: {
        type: DataTypes.TINYINT,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

  },
  {
    sequelize: sequelizeDB,
    tableName: "sub_category",
    timestamps: false,
  }
);

SubCategory.sync({
  force: false,
  alter:  true
});

export default SubCategory;
