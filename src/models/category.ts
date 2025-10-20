import { DataTypes, Model, Optional } from "sequelize"
import sequelizeDB from "../db/sequelize"

export interface CategoryAttributes {
  id: number;
  name: string;

}

export type CategoryCreationAttributes = Optional<CategoryAttributes, "id" >;

class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
  declare id: number;
  declare name: string;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

  },
  {
    sequelize: sequelizeDB,
    tableName: "categories",
    timestamps: false,
  }
);

Category.sync({
  force: false,
  alter:  true
});

export default Category;
