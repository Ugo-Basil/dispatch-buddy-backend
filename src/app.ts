import express, {Express, Request, Response, NextFunction} from 'express';
 
const app: Express = express();

const port = process.env.PORT || 4000;


app.get('/', (req: Request , res: Response) => {
    res.send('Hello Backend!');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});