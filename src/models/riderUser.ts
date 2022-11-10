import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";

interface RiderAttributes {
  id?: string;
  name?: string;
  email?: string;
  password: string;
  phoneNumber?: string;
  city?: string;
  bikeDocument?: string;
  validId?: string;
  avatar?: string;
  isVerified?: boolean;
}

export class RiderInstance extends Model<RiderAttributes> {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public phoneNumber!: string;
  public city!: string;
  public bikeDocument!: string;
  public validId!: string;
  public avatar!: string;
  public isVerified!: boolean;
}

RiderInstance.init(
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
          msg: "Last name is required",
        },
        notEmpty: {
          msg: "Last name cannot be empty",
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
    phoneNumber: {
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
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "City is required",
        },
        notEmpty: {
          msg: "City cannot be empty",
        },
      },
    },
    bikeDocument: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Bike Document is required",
        },
        notEmpty: {
          msg: "Bike Document cannot be empty",
        },
      },
    },
    validId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "valid id is required",
        },
        notEmpty: {
          msg: "valid id cannot be empty",
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
    tableName: "riders",
    sequelize: db,
  }
);
