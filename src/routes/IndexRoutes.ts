import express, {Request, Response} from "express";

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    code: 200,
    message: "success",
    data: {
      message: "System is healthy!"
    }
  });
});

export default router;
