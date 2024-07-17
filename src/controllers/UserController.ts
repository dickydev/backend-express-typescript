import { Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserAttributes, UserCreationAttributes } from '../models/User';
import dotenv from 'dotenv'

dotenv.config();

class UserController {
    public async register(req: Request, res: Response): Promise<Response> {
        const { username, password, role } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 8);
        const newUser: UserCreationAttributes = { username, password: hashedPassword, role };
        const createdUser = await UserRepository.createUser(newUser);
        return res.status(201).json(createdUser);
    }

    public async login(req: Request, res: Response): Promise<Response> {
        const { username, password } = req.body;
        const user = await UserRepository.findByUsername(username);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });

        return res.json({ token });
    }

    public async getAllUsers(req: Request, res: Response): Promise<Response> {
        const users = await UserRepository.getAllUsers();
        return res.json(users);
    }

    public async getUserById(req: Request, res: Response): Promise<Response> {
        const user = await UserRepository.getUserById(parseInt(req.params.id));
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    }

    public async updateUser(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const existingUser = await UserRepository.getUserById(parseInt(id));
        
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { password, ...otherAttributes } = req.body;

        let updateData: Partial<UserAttributes> = { ...otherAttributes };
        if (password && !bcrypt.compareSync(password, existingUser.password)) {
            updateData.password = bcrypt.hashSync(password, 8);
        }

        const [updatedCount] = await UserRepository.updateUser(parseInt(id), updateData);
        if (updatedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json({ message: 'User updated successfully' });
    }


    public async deleteUser(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const deleted = await UserRepository.deleteUser(parseInt(id));
        if (!deleted) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json({ message: 'User deleted successfully' });
    }

    public async filterUsersByUserId(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        console.log('Received userId:', id);

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: 'Invalid userId parameter' });
        }

        const parsedUserId = parseInt(id);
        console.log('Parsed userId:', parsedUserId);
        
        try {
            const users = await UserRepository.filterUsersByUserId(parsedUserId);
            return res.json(users);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Error fetching users', error: error.message });
            }
            return res.status(500).json({ message: 'An unknown error occurred' });
        }

    }
}

export default new UserController();
