import { User, userSchema, UserLogin, userLoginSchema } from './user.schema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../lib/prisma';

export class UserService {
  async createUser(userData: User) {
    const { email, password, firstName, lastName } = userData;
    
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName
      }
    });

    return { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName };
  }

  async loginUser(loginData: UserLogin) {
    const { email, password } = loginData;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    return { token, user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName } };
  }
}