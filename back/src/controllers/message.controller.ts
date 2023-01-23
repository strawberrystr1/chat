import { Request, Response } from "express";
import { getUserMessages } from "../services/message.service";
import { HTTPCodes } from "../types/enums";

export const getUserMessagesController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.query;

    if (!id) {
      res
        .status(HTTPCodes.BAD_REQUEST)
        .json({ msg: "User ID wasn't provided" });
      return;
    }

    const messages = await getUserMessages(id as string);

    res.json(messages);
  } catch (e) {
    console.log('e: ', e);
    res.status(HTTPCodes.INTERNAL_ERROR).json({
      msg: "Server can't load messages now"
    });
  }
};
