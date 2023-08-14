import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import connect from '@/utils/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      authorize: async (credentials: any) => {
        await connect();

        try {
          const user = await User.findOne({
            email: credentials.email,
          });

          if (user) {
            const isPassCorrect = await bcrypt.compare(credentials.password, user.password);
            
            if (isPassCorrect) {
              return user;
            } else {
              throw new Error('Wrong credentials');
            }
          } else {
            throw new Error('Wrong credntials');
          }
          
        } catch (error) {
          throw new Error('Wrong credntials');
        }
      },
      credentials: {
        email: {
          label: 'Email',
          type: 'text'
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
    }),
  ],
  pages: {
    error: '/dashboard/login'
  }
});

export {handler as GET, handler as POST};