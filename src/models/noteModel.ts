import { Model, DataType, Table, AutoIncrement, Column, PrimaryKey, Unique, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';
import sequelizer from '../database';
import bcryptjs from "bcryptjs"
import { seed } from "../config"

interface NoteAttibutes{
  id: number;
  text: string;
  hashed_id: string;
  hashed_password: string;
}
@Table({
  tableName: "note",
  timestamps: false
})
export class Note extends Model<NoteAttibutes>{
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  text!: string;

  @Unique
  @Column(DataType.STRING)
  hashed_id!: string;

  @Column(DataType.STRING)
  hashed_password!: string;

  static async getHash(value: string | number): Promise<string> {
    const salt = bcryptjs.genSaltSync(seed);
    return bcryptjs.hashSync(value.toString(), salt);
  };

  async verifyPassword(password: string): Promise<boolean> {
    return bcryptjs.compare(password, this.hashed_password);
  };

}