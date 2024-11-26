import bcrypt from 'bcrypt';
import prismaClient from '../src/Infrastructures/database/prisma/prismaClient';


const UsersTableTestHelper = {
  async addUser({
    username = 'adeiskandarzulkarnaen',
    password = 'secretpassword',
    fullname = 'Ade Iskandar Zulkarnaen'
  }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return prismaClient.user.create({
      data: { username, password: hashedPassword, fullname },
      select: { id: true, username: true, fullname: true }
    });
  },

  async findUsersById(id: string) {
    const result = await prismaClient.user.findUnique({
      where: { id },
      select: { id: true, username: true, fullname: true }
    });
    return result;
  },

  async cleanTable() {
    await prismaClient.user.deleteMany();
  },
};

export default UsersTableTestHelper;
