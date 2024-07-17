import User, {UserAttributes, UserCreationAttributes } from '../models/User';

class UserRepository {
    public async createUser(data: UserCreationAttributes): Promise<User> {
        return User.create(data);
    }

    public async getUserById(id: number): Promise<User | null> {
        return User.findByPk(id);
    }

    public async findByUsername(username: string): Promise<User | null> {
        return User.findOne({ where: { username } });
    }

    public async updateUser(id: number, user: Partial<UserAttributes>): Promise<[number, User[]]> {
        return User.update(user, { where: { id }, returning: true });
    }

    public async deleteUser(id: number): Promise<number> {
        return User.destroy({ where: { id } });
    }

    public async getAllUsers(): Promise<User[]> {
        return User.findAll();
    }

    public async filterUsersByUserId(userId: number): Promise<User[]> {
        if (isNaN(userId)) {
            throw new Error('Invalid userId');
        }
        return User.findAll({ where: { id: userId } });
    }
}

export default new UserRepository();
