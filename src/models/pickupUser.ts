import { DataTypes, Model } from "sequelize";
import db from '../config/database.config';

interface UserAttributes {
    id: string;
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    avatar?: string;
    isVerified?: boolean;
}

export class UserInstance extends Model<UserAttributes> {
    public id!: string;
    public name!: string;
    public email!: string;
    public password!: string;
    public phone!: string;
    public avatar!: string;
    public isVerified!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

UserInstance.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name is required",
        },
        notEmpty: {
          msg: "Name cannot be empty",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email is required",
        },
        notEmpty: {
          msg: "Email cannot be empty",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required",
        },
        notEmpty: {
          msg: "Password cannot be empty",
        },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Phone number is required",
        },
        notEmpty: {
          msg: "Phone number cannot be empty",
        },
      },
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
  },
  {
    tableName: "senders",
    sequelize: db,
  }
);