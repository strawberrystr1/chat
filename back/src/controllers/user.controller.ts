import { Request, Response } from "express";
import { getAllUsers, loginUser } from "../services/user.service";
import { HTTPCodes } from "../types/enums";

export const handleGetAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();

    res.json(users);
  } catch (e) {
    res.status(500).json({ msg: "Server can't handle request now" });
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    if (!name) {
      res.status(HTTPCodes.BAD_REQUEST).send({
        msg: "User name was not provided"
      });
    }

    const user = await loginUser(name);

    res.send(JSON.stringify(user));
  } catch (e) {
    res
      .status(HTTPCodes.INTERNAL_ERROR)
      .send(JSON.stringify({ msg: "Something went wrong while login" }));
  }
};
